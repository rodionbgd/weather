import Slider from "./slider";

import "./css/cities.css";
import "./css/search.css";
import "./css/slider.css";
import "./css/style.css";
import { createMap, init, optionsHour, searchForm } from "./render";

const headerTitle = document.querySelector(".header__title");
let slider;

const script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://maps.googleapis.com/maps/api/js" +
  "?key=AIzaSyCFgn8EeO8dUIZuqg7AD-lnG_Yc5jCT4Ek&libraries=places" +
  "&callback=googleAutoComplete";
document.body.append(script);

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("pointerdown", (e) => {
  const city = e.target.closest(".city_list__profile");
  if (city) {
    let sliderRemoved = false;
    if (slider) {
      slider.remove();
      if (slider.sliderElem.dataset.city === city.dataset.city) {
        sliderRemoved = true;
        slider = null;
      }
    }
    const initCoords = city.getBoundingClientRect();
    const shiftX = e.clientX;
    const startX = e.pageX;
    city.style = "";
    city.style.position = "relative";
    city.style.zIndex = 1000;
    // document.body.append(city);
    // onPointerMove(e);

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
          Object.prototype.hasOwnProperty.call(localStorage, city.dataset.city)
        ) {
          delete localStorage[city.dataset.city];
        }
        if (!Object.keys(localStorage).length) {
          const elem = document.querySelector(".city_list");
          elem.style.display = "none";
        }
        if (slider) slider.remove();
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
    city.addEventListener("dragstart", (event) => event.preventDefault());
    city.addEventListener("contextmenu", (event) => event.preventDefault());
    if (!sliderRemoved)
      slider = new Slider({
        elem: city,
        data: JSON.parse(localStorage[city.dataset.city]).hourly,
      });
  } else if (
    !city &&
    slider &&
    e.target.closest(".slider") !== slider.sliderElem
  ) {
    if (slider) slider.remove();
    slider = null;
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
  if (!optionsHour) return;
  createMap(
    { latitude: optionsHour.lat, longitude: optionsHour.lon },
    optionsHour.name
  );
});
