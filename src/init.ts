import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/swiper.css";

import "./css/cities.css";
import "./css/search.css";
import "./css/slider.css";
import "./css/style.css";
import "./css/sun_phase.css";
import "./css/utils.css";
import "./css/weather-icons.css";
import "./css/bg_weather.css";
import "./css/menu.css";
import "./css/autocomplete.css";

import Swiper, { Pagination } from "swiper";

import {
  app,
  bgContainer,
  cityListEl,
  menuCityList,
  menuEl,
  store,
} from "./index";
import { setCityList } from "./reducers/cities";
import addGoogleScript from "./utils";
import { LOCATION } from "./types";

import { getCityByCoords } from "./city_name";
import { setCurrentCityWeather } from "./current_city_weather";

import { addNewCity } from "./add_remove_city";
import { getCityList, getCurrentCity } from "./get_city";
import { renderMenu } from "./menu/render";
import { initMap } from "./map";

Swiper.use([Pagination]);

window.TOUCH = window.matchMedia("(any-hover:none)").matches;
export const headerD = <HTMLDivElement>(
  document.getElementById("header-desktop")
);

const updateLocation = <HTMLElement>document.getElementById("update-location");
// eslint-disable-next-line import/no-mutable-exports
export let mainSwiper: Swiper;

export function createSubscriber() {
  const { cities } = store.getState();
  let currentCityEl;
  let currentCity;
  renderMenu();
  if (!cityListEl.children.length) {
    cities.forEach((city) => {
      setCurrentCityWeather(city, cityListEl);
    });
    [currentCity] = cities.filter(
      (city) => city.location !== LOCATION.LOCATION_NO
    );
  } else {
    [currentCity] = cities.filter((city) => city.isCurrentCity);
    if (!currentCity) {
      return;
    }
    currentCityEl = <HTMLDivElement>(
      cityListEl.querySelector(`[data-name="${currentCity.name}"]`)
    );
    if (!currentCityEl) {
      currentCityEl = <HTMLDivElement>(
        menuCityList.querySelector(`[data-menu-name="${currentCity.name}"]`)
      );
      if (!currentCityEl) {
        return;
      }
    }
  }
  setCurrentCityWeather(currentCity, cityListEl);
  const menuBtnList = cityListEl.querySelectorAll(".menu-mobile");
  menuBtnList.forEach((btn) => {
    btn.addEventListener("pointerdown", () => {
      app.style.display = "none";
      menuEl.style.display = "flex";
      bgContainer.style.display = "none";
    });
  });
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
      newCity.location = LOCATION.LOCATION_OK;
      addNewCity(newCity);
    }
  }

  async function error() {
    let cityData;
    if (cities.length) {
      [cityData] = cities.filter(
        (city) => city.location !== LOCATION.LOCATION_NO
      );
      if (!cityData) {
        [cityData] = cities;
      }
      coords = cityData.coords;
      cityName = cityData.name;
    }
    if (!window.TOUCH) {
      initMap(coords);
    }
    if (!cityName) {
      cityName = await getCityByCoords(coords);
    }

    const newCity = await getCurrentCity(cityName, coords, cities);
    if (newCity) {
      if (
        !cityData ||
        (cityData && cityData.location !== LOCATION.LOCATION_NO)
      ) {
        newCity.location = LOCATION.LOCATION_ERROR;
      }
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

updateLocation.addEventListener("click", () => {
  getLocation();
  menuEl.style.display = "none";
  app.style.display = "block";
  bgContainer.style.display = "initial";
});

function preload(opacity: number) {
  const loading = <HTMLDivElement>document.getElementById("loading");
  if (opacity <= 0) {
    loading.style.display = "none";
  } else {
    loading.style.opacity = `${opacity}`;
    setTimeout(() => {
      preload(opacity - 0.1);
    }, 50);
  }
}

export default async function init() {
  Array.from(bgContainer.children).forEach((img) => {
    (img as HTMLElement).style.position = "fixed";
    (img as HTMLElement).style.opacity = "1";
    (img as HTMLElement).style.transition = "opacity 1s linear";
    (img as HTMLElement).style.width = "100%";
    (img as HTMLElement).style.height = "100%";
    (img as HTMLElement).style.backgroundSize = "cover";
  });
  if (!window.TOUCH) {
    const weatherItems = <HTMLElement>document.getElementById("weather-items");
    weatherItems.firstElementChild!.remove();
  }
  preload(1);
  addGoogleScript();
  const cityList = await getCityList();
  mainSwiper = new Swiper(".swiper", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
  });
  mainSwiper.on("slideChange", () => {
    const { cities } = store.getState();
    const paginationList = <HTMLElement>app.querySelector(".swiper-pagination");
    const activeSlider = <HTMLElement>(
      paginationList.querySelector(".swiper-pagination-bullet-active")
    );
    const activeSliderIndex = Array.from(paginationList.children).indexOf(
      activeSlider
    );
    if (activeSliderIndex === -1) {
      return;
    }
    const currentSlide = <HTMLElement>cityListEl.children[activeSliderIndex];
    const currentCity = cities.filter(
      (city) => city.name === currentSlide.dataset.name
    )[0];
    const imgList = Array.from(bgContainer.children);
    const isSameWeather = imgList.filter(
      (el) =>
        el.className === `bg-${currentCity.weather.current.weather[0].icon}`
    ).length;
    if (isSameWeather) {
      return;
    }
    Array.from(bgContainer.children).forEach((img) => {
      img.classList.toggle("hidden");
      img.classList.remove("default-bg");
      if (img.classList.contains("hidden")) {
        (img as HTMLElement).style.opacity = "0";
      } else {
        (img as HTMLElement).style.opacity = "1";
        (
          img as HTMLImageElement
        ).className = `bg-${currentCity.weather.current.weather[0].icon}`;
      }
    });
  });
  store.dispatch(setCityList(cityList));
  getLocation();
}
