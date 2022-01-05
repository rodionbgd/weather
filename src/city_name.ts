import { Coords } from "./types";
import { getCurrentCity } from "./get_city";
import { store } from "./index";
import addNewCity from "./add_city";

const input = <HTMLInputElement>document.getElementById("search");
const searchBtn = <HTMLButtonElement>document.getElementById("search-button");
export const searchForm = <HTMLFormElement>(
  document.getElementById("search-form")
);

export async function getCityByCoords(coords: Coords) {
  const latLng = new window.google.maps.LatLng(
    coords.latitude,
    coords.longitude
  );
  const data = await new window.google.maps.Geocoder().geocode({ latLng });
  const { results } = data;
  let city = "";
  if (results[1]) {
    let country = null;
    let cityAlt = null;
    let c;
    let lc;
    let component;
    for (let r = 0, rl = results.length; r < rl; r += 1) {
      const result = results[r];

      if (!city && result.types[0] === "locality") {
        for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
          component = result.address_components[c];

          if (component.types[0] === "locality") {
            city = component.long_name;
            break;
          }
        }
      } else if (
        !city &&
        !cityAlt &&
        result.types[0] === "administrative_area_level_1"
      ) {
        for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
          component = result.address_components[c];

          if (component.types[0] === "administrative_area_level_1") {
            cityAlt = component.long_name;
            break;
          }
        }
      } else if (!country && result.types[0] === "country") {
        country = result.address_components[0].long_name;
      }
      if (city && country) {
        break;
      }
    }
  }
  return city;
}

async function addCityFromInput(inputCity: string) {
  if (!inputCity) return;
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
    input.blur();
    input.focus();
    searchBtn.style.display = "none";
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
  const autocomplete = new window.google.maps.places.Autocomplete(
    input,
    options
  );
  input.addEventListener("input", () => {
    if (input.value) {
      searchBtn.style.display = "flex";
    } else {
      searchBtn.style.display = "none";
    }
  });
  searchForm.addEventListener("keydown", async (e) => {
    if (!input.value) return;
    if (e.key === "Enter") {
      await addCityFromInput(input.value);
      isCalled = true;
    }
  });
  searchBtn.addEventListener("click", async () => {
    if (!input.value) return;
    await addCityFromInput(input.value);
    isCalled = true;
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
