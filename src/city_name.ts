import { createMap } from "./map";

const input = <HTMLInputElement>document.getElementById("search");
const searchBtn = <HTMLButtonElement>document.getElementById("search-button");
export const searchForm = <HTMLFormElement>(
  document.getElementById("search-form")
);

export function getCityByCoords(coords: GeolocationCoordinates) {
  const latLng = new window.google.maps.LatLng(
    coords.latitude,
    coords.longitude
  );
  return new window.google.maps.Geocoder().geocode(
    { latLng },
    (results: any[], status: any) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let country = null;
          let city = null;
          let cityAlt = null;
          let c;
          let lc;
          let component;
          for (let r = 0, rl = results.length; r < rl; r += 1) {
            const result = results[r];

            if (!city && result.types[0] === "locality") {
              for (
                c = 0, lc = result.address_components.length;
                c < lc;
                c += 1
              ) {
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
              for (
                c = 0, lc = result.address_components.length;
                c < lc;
                c += 1
              ) {
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
          if (city) {
            createMap(coords, city, true /* , true */);
          }
        }
      }
    }
  );
}

function getCityByName(value: string) {
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode(
    {
      address: value,
    },
    (results: any, status: any) => {
      if (!value) return;
      if (status === window.google.maps.GeocoderStatus.OK) {
        const coords = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        } as GeolocationCoordinates;
        const city = results[0].address_components[0].long_name;
        createMap(coords, city, true /* ,false */);
      } else {
        alert("Неправильный город"); // eslint-disable-line no-alert
      }
      if (input) {
        input.value = "";
        input.blur();
        input.focus();
        searchBtn.style.display = "none";
      }
    }
  );
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
  searchForm.addEventListener("keydown", (e) => {
    if (!input.value) return;
    if (e.key === "Enter") {
      getCityByName(input.value);
      isCalled = true;
    }
  });
  searchBtn.addEventListener("click", () => {
    if (!input.value) return;
    getCityByName(input.value);
    isCalled = true;
  });
  autocomplete.addListener("place_changed", () => {
    if (!input.value) return;
    if (isCalled) {
      isCalled = !isCalled;
      return;
    }
    getCityByName(input.value);
  });
};
