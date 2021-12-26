import { setCurrentCityWeather, currentCityImg } from "./current_city_weather";
import addCityToList from "./add_city";
import Slider from "./slider";

const mapElem = document.getElementById("map");
let lastCity = "";
let marker;
let map;

const WEATHER_API_KEY = "5df917b322441cc9e193178bf51efa31";

export function createMarker(coords, city) {
  if (marker) {
    marker.setLatLng([coords.latitude, coords.longitude]);
    marker
      .bindPopup(`<h4 class="marker">${city}</h4>`, {
        closeButton: false,
      })
      .openPopup();
    return;
  }
  mapElem.style.overflow = "visible";
  marker = window.WE.marker([coords.latitude, coords.longitude]).addTo(map);
  marker
    .bindPopup(`<h4 class="marker">${city}</h4>`, {
      closeButton: false,
    })
    .openPopup();
}

function flyToCity(coords) {
  if (!map) return;
  map.fitBounds([
    [coords.latitude - 90, coords.longitude - 90],
    [coords.latitude + 90, coords.longitude + 90],
  ]);
  map.panInsideBounds(
    [
      [coords.latitude - 89, coords.longitude - 89],
      [coords.latitude + 89, coords.longitude + 89],
    ],
    { heading: 1, tilt: 0, duration: 1.5 }
  );
}

export function initMap(coords) {
  const ZOOM = 1;
  const baselayer = window.WE.tileLayer(
    "https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg",
    {
      tileSize: 1024,
      bounds: [
        [-90, -180],
        [90, 180],
      ],
      minZoom: 0,
      maxZoom: 1,
      tms: true,
    }
  );
  if (!map) {
    map = window.WE.map("map", {
      center: [coords.latitude, coords.longitude],
      zoom: ZOOM,
      tilting: true,
      scrollWheelZoom: false,
    });
  }
  baselayer.addTo(map);
  map.setView([coords.latitude, coords.longitude], ZOOM);
}

export function createMap(coords, city, renderCity /* location */) {
  currentCityImg.src = "icons/load.gif";
  if (!city) return;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall` +
      `?lat=${coords.latitude}&lon=${coords.longitude}` +
      `&exclude=minutely,daily,alerts&lang=ru&appid=${WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const optionsHour = data;
      optionsHour.name = city;
      if (renderCity) {
        setCurrentCityWeather(optionsHour);
      }
      addCityToList(optionsHour);
      if (window.TOUCH && renderCity) {
        const slider = new Slider(null, optionsHour.hourly);
        slider.createSlider();
      }
      if (!window.TOUCH && optionsHour.name !== lastCity && renderCity) {
        flyToCity(coords);
        createMarker(coords, optionsHour.name);
        lastCity = optionsHour.name;
      }
    });
}
