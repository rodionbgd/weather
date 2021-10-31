import Slider from "./slider";

import { createMap } from "./map";
import { init, searchForm } from "./render";
import { currentCity, setCurrentCityWeather } from "./city_weather";

const headerTitle = document.querySelector(".header__title");
let sliderDesktop = null;

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("pointerdown", (e) => {
  const city = e.target.closest(".city_list__profile");
  if (city) {
    if (window.TOUCH && currentCity.textContent !== city.dataset.name) {
      const sliderM = new Slider(
        city,
        JSON.parse(localStorage[city.dataset.name]).hourly
      );
      sliderM.createSlider();
    }
    setCurrentCityWeather(JSON.parse(localStorage[city.dataset.name]));
    if (window.TOUCH) return;
    let sliderRemoved = false;
    // if (window.TOUCH)
    //     slider = document.getElementById("slider");
    if (sliderDesktop) {
      sliderDesktop.removeSlider();
      if (sliderDesktop.sliderElem.dataset.name === city.dataset.name) {
        sliderRemoved = true;
        sliderDesktop = null;
      }
    }
    document.addEventListener("dragstart", (event) => event.preventDefault());
    if (localStorage.length > 1) {
      const initCoords = city.getBoundingClientRect();
      const shiftX = e.clientX;
      const startX = e.pageX;
      city.style = "";
      city.style.position = "relative";
      city.style.zIndex = 1000;
      const onPointerMove = function onPointerMove(event) {
        city.style.left = `${event.pageX - shiftX}px`;
        city.style.opacity =
          1 -
          2 *
            Math.abs(
              (initCoords.left - city.getBoundingClientRect().left) /
                (initCoords.left - initCoords.width / 2)
            );
      };

      const endMove = function endMove(event) {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", endMove);
        if (Math.abs(startX - event.clientX) > initCoords.width / 2) {
          if (
            Object.prototype.hasOwnProperty.call(
              localStorage,
              city.dataset.name
            )
          ) {
            delete localStorage[city.dataset.name];
          }
          if (!Object.keys(localStorage).length) {
            const elem = document.querySelector(".city_list");
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
        city.style.opacity = 1;
        city.style = "";
      };
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", endMove);
      city.addEventListener("contextmenu", (event) => event.preventDefault());
    }
    if (!sliderRemoved && !window.TOUCH) {
      sliderDesktop = new Slider(
        city,
        JSON.parse(localStorage[city.dataset.name]).hourly
      );
      sliderDesktop.createSlider.call(sliderDesktop);
      sliderDesktop.renderSlider.call(sliderDesktop);
    }
  } else if (
    !window.TOUCH &&
    !city &&
    sliderDesktop &&
    e.target.closest(".slider") !== sliderDesktop.sliderElem
  ) {
    sliderDesktop.removeSlider();
    sliderDesktop = null;
  }
});

document.body.addEventListener("selectstart", (e) => e.preventDefault());
searchForm.addEventListener("submit", (e) => e.preventDefault());
headerTitle.addEventListener("pointerenter", () => {
  headerTitle.querySelector("img").src = "icons/header_over_icon.png";
});
headerTitle.addEventListener("pointerleave", () => {
  headerTitle.querySelector("img").src = "icons/header_out_icon.png";
});
headerTitle.addEventListener("click", () => {
  if (!localStorage[currentCity.textContent]) return;
  createMap(
    {
      latitude: JSON.parse(localStorage[currentCity.textContent]).lat,
      longitude: JSON.parse(localStorage[currentCity.textContent]).lon,
    },
    JSON.parse(localStorage[currentCity.textContent]).name,
    true,
    false
  );
});
