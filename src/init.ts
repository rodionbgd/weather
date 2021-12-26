import "./css/cities.css";
import "./css/search.css";
import "./css/slider.css";
import "./css/style.css";

import { getCityByCoords } from "./city_name";
import { createMap, initMap } from "./map";
import { currentCityWeather } from "./current_city_weather";

window.TOUCH = window.matchMedia("(any-hover:none)").matches;

function getCityList() {
  if (localStorage.length > 5) localStorage.clear();
  Object.entries(localStorage).forEach(([key, value]) => {
    const cityListCoords = {
      latitude: JSON.parse(value).lat,
      longitude: JSON.parse(value).lon,
    } as GeolocationCoordinates;
    createMap(cityListCoords, key, false /* , false */);
  });
}

function loadNow(opacity: number) {
  const loading = <HTMLDivElement>document.getElementById("loading");
  if (opacity <= 0) {
    loading.style.display = "none";
  } else {
    loading.style.opacity = `${opacity}`;
    setTimeout(() => {
      loadNow(opacity - 0.1);
    }, 200);
  }
}

export default function init() {
  if (!window.TOUCH) {
    const weatherItems = <HTMLElement>document.getElementById("weather-items");
    weatherItems.firstElementChild!.remove();
    currentCityWeather.insertAdjacentElement("afterend", weatherItems);
  }
  loadNow(1);
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://maps.googleapis.com/maps/api/js" +
    "?key=AIzaSyCFgn8EeO8dUIZuqg7AD-lnG_Yc5jCT4Ek&libraries=places" +
    "&callback=googleAutoComplete";
  document.head.append(script);

  let coords = {
    latitude: 55.7558,
    longitude: 37.6173,
  } as GeolocationCoordinates;

  function success(position: GeolocationPosition) {
    if (!window.TOUCH) {
      initMap(position.coords);
    }
    coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } as GeolocationCoordinates;
    getCityByCoords(position.coords);
    getCityList();
  }

  function error() {
    let city;
    if (localStorage.length) {
      const cityData = JSON.parse(
        <string>(
          localStorage.getItem(
            <string>localStorage.key(localStorage.length - 1)
          )
        )
      );
      coords = {
        latitude: cityData.lat,
        longitude: cityData.lon,
      } as GeolocationCoordinates;
      city = cityData.name;
    }
    if (!window.TOUCH) {
      initMap(coords);
    }
    if (!city) city = "Москва";
    createMap(coords, city, true /* , false */);
    getCityList();
  }

  if (!navigator.geolocation) {
    error();
  } else if (!navigator.geolocation) {
    error();
  } else {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 5000,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}
