import "swiper/css";
import "swiper/css/history";
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
import "./css/install_icon.css";

import {
  app,
  bgContainer,
  cityListEl,
  initializeElements,
  menuCityList,
  menuEl,
  store,
} from "./index";
import { setCityList } from "./reducers/cities";
import { preload } from "./utils";
import { LOCATION } from "./types";

import { setCurrentCityWeather } from "./current_city_weather";
import { getCityList, getLocation } from "./get_city";
import { renderMenu } from "./menu/render";

export function createSubscriber() {
  const { cities } = store.getState();
  let currentCityEl;
  let currentCity;
  renderMenu();
  if (!cityListEl.children.length) {
    preload(1);
    if (window.TOUCH) {
      cities.forEach((city) => {
        setCurrentCityWeather(city, cityListEl);
      });
    }
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
  if (window.TOUCH) {
    const menuBtnList = cityListEl.querySelectorAll(".menu-mobile");
    menuBtnList.forEach((btn) => {
      btn.addEventListener("pointerdown", () => {
        app.style.display = "none";
        menuEl.style.display = "flex";
        bgContainer.style.display = "none";
      });
    });
  }
}

export default async function init() {
  initializeElements();
  store.subscribe(createSubscriber);
  if (!window.TOUCH) {
    const menuHeaderTitle = document.querySelector(".menu-header__title");
    if (menuHeaderTitle) {
      menuHeaderTitle.remove();
    }
    app.insertAdjacentElement("beforeend", menuEl);
    menuEl.style.display = "block";
  }
  const cityList = await getCityList();
  store.dispatch(setCityList(cityList));
  getLocation(false);
}
