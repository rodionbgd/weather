import { configureStore } from "@reduxjs/toolkit";
import Slider from "./slider";
import init from "./init";
import { searchForm } from "./city_name";
import {
  currentCityEl,
  getCityWeather,
  setCurrentCityWeather,
} from "./current_city_weather";
import { addCity, citySlice } from "./reducers/cities";
import { City, CityWeather } from "./types";

const headerTitle = <HTMLDivElement>document.querySelector(".header__title");
let sliderDesktop: Slider | null;

// eslint-disable-next-line
export const store = configureStore({
  reducer: {
    cities: citySlice.reducer,
  },
});
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("pointerdown", (e) => {
  const city = <HTMLElement>(
    (e.target as HTMLElement).closest(".city_list__profile")
  );
  if (city) {
    if (window.TOUCH && currentCityEl.textContent !== city.dataset.name) {
      const sliderM = new Slider(
        city as HTMLElement,
        JSON.parse(localStorage[city.dataset.name as string]).hourly
      );
      sliderM.createSlider();
    }
    setCurrentCityWeather(
      JSON.parse(localStorage[city.dataset.name as string])
    );
    if (window.TOUCH) return;
    let sliderRemoved = false;
    // if (window.TOUCH)
    //     slider = document.getElementById("slider");
    if (sliderDesktop) {
      sliderDesktop.removeSlider();
      if (
        sliderDesktop.sliderElem &&
        sliderDesktop.sliderElem.dataset.name === city.dataset.name
      ) {
        sliderRemoved = true;
        sliderDesktop = null;
      }
    }
    document.addEventListener("dragstart", (event) => event.preventDefault());
    if (localStorage.length > 1) {
      const initCoords = city.getBoundingClientRect();
      const shiftX = e.clientX;
      const startX = e.pageX;
      city.setAttribute("style", "");
      city.style.position = "relative";
      city.style.zIndex = `${1000}`;
      const onPointerMove = function onPointerMove(event: PointerEvent) {
        city.style.left = `${event.pageX - shiftX}px`;
        city.style.opacity = `${
          1 -
          2 *
            Math.abs(
              (initCoords.left - city.getBoundingClientRect().left) /
                (initCoords.left - initCoords.width / 2)
            )
        }`;
      };

      const endMove = function endMove(event: PointerEvent) {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", endMove);
        if (Math.abs(startX - event.clientX) > initCoords.width / 2) {
          if (
            Object.prototype.hasOwnProperty.call(
              localStorage,
              city.dataset.name as string
            )
          ) {
            delete localStorage[city.dataset.name as string];
          }
          if (!Object.keys(localStorage).length) {
            const elem = <HTMLElement>document.querySelector(".city_list");
            elem.style.display = "none";
          }
          if (sliderDesktop && !window.TOUCH) {
            sliderDesktop.removeSlider();
            sliderDesktop = null;
          }
          if (window.TOUCH) {
            city.classList.toggle("city_list__profile_no-scroll");
          }
          city.remove();
          return;
        }
        city.style.transition = "left 0.5s, opacity 0.5s";
        city.style.left = `${0}px`;
        city.style.opacity = `${1}`;
        city.setAttribute("style", "");
      };
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", endMove);
      city.addEventListener("contextmenu", (event) => event.preventDefault());
    }
    if (!sliderRemoved && !window.TOUCH) {
      sliderDesktop = new Slider(
        city,
        JSON.parse(localStorage[city.dataset.name as string]).hourly
      );
      sliderDesktop.createSlider.call(sliderDesktop);
      sliderDesktop.renderSlider.call(sliderDesktop);
    }
  } else if (
    !window.TOUCH &&
    !city &&
    sliderDesktop &&
    (e.target as HTMLElement).closest(".slider") !== sliderDesktop.sliderElem
  ) {
    sliderDesktop.removeSlider();
    sliderDesktop = null;
  }
});

document.body.addEventListener("selectstart", (e) => e.preventDefault());
searchForm.addEventListener("submit", (e) => e.preventDefault());
headerTitle.addEventListener("pointerenter", () => {
  headerTitle.querySelector("img")!.src = "icons/header_over_icon.png";
});
headerTitle.addEventListener("pointerleave", () => {
  headerTitle.querySelector("img")!.src = "icons/header_out_icon.png";
});
headerTitle.addEventListener("click", async () => {
  if (!currentCityEl.innerHTML) return;
  let city = store
    .getState()
    .cities.filter((item) => item.name === currentCityEl.innerHTML)[0] as City;
  city = {
    ...city,
    updateTime: new Date().toString(),
    weather: (await getCityWeather(city.coords)) as CityWeather,
  };
  store.dispatch(addCity(city));
  setCurrentCityWeather(city);
  // await createMap(
  //     {
  //         latitude: JSON.parse(localStorage[currentCity.innerHTML]).lat,
  //         longitude: JSON.parse(localStorage[currentCity.innerHTML]).lon,
  //     } as GeolocationCoordinates,
  //     JSON.parse(localStorage[currentCity.innerHTML]).name,
  //     true
  //     /* / false */
  // );
});
