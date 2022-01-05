import "./css/cities.css";
import "./css/search.css";
import "./css/slider.css";
import "./css/style.css";

import { getCityByCoords } from "./city_name";
import { createMarker, flyToCity, initMap } from "./map";
import {
  currentCityEl,
  currentCityWeather,
  setCurrentCityWeather,
} from "./current_city_weather";
import { store } from "./index";
import { setCityList } from "./reducers/cities";
import addGoogleScript from "./utils";
import addNewCity from "./add_city";

import { City } from "./types";
import { getCityList, getCurrentCity } from "./get_city";

window.TOUCH = window.matchMedia("(any-hover:none)").matches;

export function createSubscriber() {
  const { cities } = store.getState();
  const currentCity = cities.filter((city) => city.isCurrentCity)[0];
  if (!currentCity) {
    return;
  }
  if (
    !window.TOUCH &&
    currentCity.name !== currentCityEl.innerHTML /* && renderCity */
  ) {
    flyToCity(currentCity.coords);
    createMarker(currentCity.coords, currentCity.name);
  }
  setCurrentCityWeather(currentCity);
}

function loadNow(opacity: number) {
  const loading = <HTMLDivElement>document.getElementById("loading");
  if (opacity <= 0) {
    loading.style.display = "none";
  } else {
    loading.style.opacity = `${opacity}`;
    setTimeout(() => {
      loadNow(opacity - 0.1);
    }, 100);
  }
}

function getLocation() {
  // Moscow
  let coords = {
    latitude: 55.7558,
    longitude: 37.6173,
  };
  let cityName = "Москва";

  const { cities } = store.getState();
  store.subscribe(createSubscriber);

  async function success(position: GeolocationPosition) {
    if (!window.TOUCH) {
      initMap(position.coords);
    }
    const { latitude, longitude } = position.coords;
    coords = { latitude, longitude };
    const name = await getCityByCoords(coords);
    const newCity = await getCurrentCity(name, coords, cities);
    if (newCity) {
      addNewCity(newCity);
    }
  }

  async function error() {
    if (cities.length) {
      const cityData = cities.at(-1) as City;
      coords = cityData.coords;
      cityName = cityData.name;
    }
    if (!window.TOUCH) {
      initMap(coords);
    }
    cityName = await getCityByCoords(coords);
    const newCity = await getCurrentCity(cityName, coords, cities);
    if (newCity) {
      addNewCity(newCity);
    }
  }

  if (!navigator.geolocation) {
    error();
  } else {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 10000,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}

export default async function init() {
  if (!window.TOUCH) {
    const weatherItems = <HTMLElement>document.getElementById("weather-items");
    weatherItems.firstElementChild!.remove();
    currentCityWeather.insertAdjacentElement("afterend", weatherItems);
  }
  loadNow(1);
  addGoogleScript();
  const cityList = await getCityList();
  store.dispatch(setCityList(cityList));
  getLocation();
}
