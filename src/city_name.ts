import { Coords } from "./types";
import { getCurrentCity } from "./get_city";
import { store } from "./index";
import { addNewCity } from "./add_remove_city";

const input = <HTMLInputElement>document.getElementById("search");
const searchBtn = <HTMLButtonElement>document.getElementById("search-button");
export const searchForm = <HTMLFormElement>(
  document.getElementById("search-form")
);

searchForm.addEventListener("submit", (e) => e.preventDefault());

export async function getCityByCoords(coords: Coords) {
  const latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

  const data = await new google.maps.Geocoder().geocode({ location: latLng });
  const { results } = data;
  let city = "";
  if (!results[1]) {
    return city;
  }
  let cityAlt = "";
  results.forEach((result: google.maps.GeocoderResult) => {
    const { address_components, types } = result;
    if (
      !city &&
      (types[0] === "street_address" ||
        types[0] === "premise" ||
        types[0] === "establishment")
    ) {
      address_components.forEach((address_component) => {
        if (
          !city &&
          address_component.types[0] === "administrative_area_level_3"
        ) {
          city = address_component.long_name;
        }
      });
    } else if (!cityAlt && types[0] === "political") {
      address_components.forEach((address_component) => {
        if (!cityAlt && address_component.types[0] === "locality") {
          cityAlt = address_component.long_name;
        }
      });
    }
  });

  return city || cityAlt;
}

async function addCityFromInput(inputCity: string) {
  if (!inputCity) {
    return;
  }
  const geocoder = new window.google.maps.Geocoder();

  const { results } = await geocoder.geocode({
    address: inputCity,
  });
  if (!results.length) {
    return;
  }
  const cityName = results[0].address_components[0].long_name;
  const coords = {
    latitude: results[0].geometry.location.lat(),
    longitude: results[0].geometry.location.lng(),
  };
  if (input) {
    input.value = "";
  }
  const city = await getCurrentCity(cityName, coords, store.getState().cities);
  if (city) {
    addNewCity(city);
  }
}

window.googleAutoComplete = function googleAutoComplete() {
  input.value = "";
  let isCalled = false;
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["(cities)"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  searchForm.addEventListener("keydown", async (e) => {
    // e.preventDefault();
    if (!input.value) return;
    if (e.key === "Enter") {
      await addCityFromInput(input.value);
      isCalled = true;
    }
  });
  searchBtn.addEventListener("click", async () => {
    if (!input.value) return;
    isCalled = true;
    const autocompleteEl = document.querySelector(".pac-container");
    if (autocompleteEl) {
      autocompleteEl.remove();
    }
    await addCityFromInput(input.value);
  });
  autocomplete.addListener("place_changed", async () => {
    if (!input.value) return;
    if (isCalled) {
      isCalled = !isCalled;
      return;
    }
    await addCityFromInput(input.value);
  });
};
