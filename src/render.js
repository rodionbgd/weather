const currentCity = document.getElementById("current-city");
const currentCityImg = document.getElementById("current-city-img");
const currentCityWind = document.getElementById("current-city-wind");
const currentCityWeather = document.getElementById("current-city-weather");
const currentCityCelsius = document.getElementById("current-city-celsius");
const currentCityPressure = document.getElementById("current-city-pressure");
const currentCityHumidity = document.getElementById("current-city-humidity");
const currentCitySunset = document.getElementById("current-city-sunset");
const currentCitySunrise = document.getElementById("current-city-sunrise");
const day = document.getElementById("day");
const loading = document.getElementById("loading");
const input = document.getElementById("search");
const searchBtn = document.getElementById("search-button");
const cityListElem = document.getElementById("city-list");
const mapElem = document.getElementById("map");
export const searchForm = document.getElementById("search-form");

let lastCity = "";
let marker;
let map;
export let optionsHour; // eslint-disable-line import/no-mutable-exports

const WEATHER_API_KEY = "5df917b322441cc9e193178bf51efa31";

const initialTimeZone = new Date().getTimezoneOffset() * 60;

function loadNow(opacity) {
  if (opacity <= 0) {
    loading.style.display = "none";
  } else {
    loading.style.opacity = opacity;
    setTimeout(() => {
      loadNow(opacity - 0.1);
    }, 200);
  }
}

function getWindDirection(deg) {
  const DIRECTION = [
    "north",
    "north-north-east",
    "north-east",
    "east-north-east",
    "east",
    "east-south-east",
    "south-east",
    "south-south-east",
    "south",
    "south-south-west",
    "south-west",
    "west-south-west",
    "west",
    "west-north-west",
    "north-west",
    "north-north-west",
  ];
  return DIRECTION[
    Math.floor((deg + 11) / (360 / DIRECTION.length)) % DIRECTION.length
  ];
}

function setCurrentCityWeather(options) {
  if (!options) return;
  currentCity.textContent = options.name;
  const imageSrc = options.current.weather[0].icon;
  currentCityImg.src = `./icons/${imageSrc}_icon.png`;
  const windDirection = getWindDirection(options.current.wind_deg);
  currentCityWind.children[0].src = `./icons/wind/icons8-${windDirection}-80.png`;
  const windDirectionRu = windDirection
    .split("-")
    .map((val) => {
      switch (val[0]) {
        case "n":
          return "С";
        case "s":
          return "Ю";
        case "w":
          return "З";
        case "e":
          return "В";
        default:
          return "";
      }
    })
    .join("");
  currentCityWind.children[1].innerHTML = `${options.current.wind_speed.toFixed(
    1
  )} м/с ${windDirectionRu}`;
  day.textContent = new Date().toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  currentCityWeather.textContent =
    options.current.weather[0].description[0].toUpperCase() +
    options.current.weather[0].description.substr(1);
  currentCityCelsius.textContent = `${(options.current.temp - 272).toFixed(
    1
  )}°C`;
  currentCityPressure.textContent = `${(
    options.current.pressure / 1.36
  ).toFixed(1)} мм рт. ст.`;
  currentCityHumidity.textContent = `${options.current.humidity} %`;
  const sunrise = {
    hour: new Date(
      (options.current.sunrise + options.timezone_offset + initialTimeZone) *
        1000
    ).getHours(),
    minute: new Date(
      (options.current.sunrise + options.timezone_offset + initialTimeZone) *
        1000
    ).getMinutes(),
  };

  const sunset = {
    hour: new Date(
      (options.current.sunset + options.timezone_offset + initialTimeZone) *
        1000
    ).getHours(),
    minute: new Date(
      (options.current.sunset + options.timezone_offset + initialTimeZone) *
        1000
    ).getMinutes(),
  };
  currentCitySunrise.textContent = `${`0${sunrise.hour}`.slice(
    -2
  )}:${`0${sunrise.minute}`.slice(-2)}`;
  currentCitySunset.textContent = `${`0${sunset.hour}`.slice(
    -2
  )}:${`0${sunset.minute}`.slice(-2)}`;
}

function addCityToList() {
  let hasCity = false;
  let city;

  function isCity(elem) {
    if (
      Object.prototype.hasOwnProperty.call(localStorage, elem.innerHTML) &&
      elem.innerHTML === currentCity.textContent
    ) {
      hasCity = true;
      city = elem;
    }
  }

  Array.from(document.querySelectorAll(".city_list__name")).filter(isCity);
  localStorage[currentCity.textContent] = JSON.stringify(optionsHour);
  const newCity = `<article class="city_list__profile" data-city="${
    optionsHour.name
  }">
                        <h4 class="city_list__name">${optionsHour.name}</h4>
                        <img src="${
                          currentCityImg.src
                        }" alt="" class="city_list__picture">
                        <span class="city_list__value">${(
                          optionsHour.hourly[0].temp - 272
                        ).toFixed()}&deg/${(
    optionsHour.hourly[12].temp - 272
  ).toFixed()}&deg</span>
                    </article>`;
  if (Object.keys(localStorage).length) {
    const elem = document.querySelector(".city_list");
    elem.style.display = "flex";
  }
  if (Object.keys(localStorage).length > 5) {
    cityListElem.firstElementChild.remove();
    delete localStorage[Object.keys(localStorage)[0]];
  }
  if (!hasCity || !city) {
    cityListElem.insertAdjacentHTML("beforeend", newCity);
    return true;
  }
  city.parentNode.insertAdjacentHTML("afterend", newCity);
  city.parentNode.remove();
  return false;
}

function createMarker(coords, city) {
  if (marker) {
    marker.setLatLng([coords.latitude, coords.longitude]);
    marker
      .bindPopup(`<h4 class="marker">${city}</h4>`, {
        closeButton: false,
      })
      .openPopup();
    return;
    // marker.off();
    // marker.closePopup();
    // map.removeMarker(marker);
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

export async function createMap(coords, city, renderCity = 1) {
  currentCityImg.src = "icons/load.gif";
  const hourData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall` +
      `?lat=${coords.latitude}&lon=${coords.longitude}` +
      `&exclude=minutely,daily,alerts&lang=ru&appid=${WEATHER_API_KEY}`
  );
  optionsHour = await hourData.json();
  optionsHour.name = city;
  setCurrentCityWeather(optionsHour);
  addCityToList();
  if (optionsHour.name !== lastCity && renderCity) {
    flyToCity(coords);
    createMarker(coords, optionsHour.name);
  }
  lastCity = optionsHour.name;
}

function getCityByCoords(coords) {
  const latlng = new window.google.maps.LatLng(
    coords.latitude,
    coords.longitude
  );

  return new window.google.maps.Geocoder().geocode(
    { latLng: latlng },
    (results, status) => {
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
            createMap(coords, city);
          }
        }
      }
    }
  );
}

export function init() {
  loadNow(1);
  if (localStorage.length > 5) localStorage.clear();

  let coords = {
    latitude: 55.7558,
    longitude: 37.6173,
  };
  const city = "Москва";
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

  Object.keys(localStorage).forEach((key, index) => {
    coords = {
      latitude: JSON.parse(localStorage[key]).lat,
      longitude: JSON.parse(localStorage[key]).lon,
    };
    if (index > localStorage.length - 2) {
      map = window.WE.map("map", {
        center: [coords.latitude, coords.longitude],
        zoom: ZOOM,
        tilting: true,
        scrollWheelZoom: true,
      });
      baselayer.addTo(map);
      map.setView([coords.latitude, coords.longitude], ZOOM);
    }
    createMap(coords, key, index > localStorage.length - 2);
  });
  if (localStorage.length) return;

  function success(position) {
    map = window.WE.map("map", {
      center: [position.coords.latitude, position.coords.longitude],
      zoom: ZOOM,
      tilting: true,
      // unconstrainedRotation: true,
      scrollWheelZoom: true,
    });
    baselayer.addTo(map);
    map.setView([position.coords.latitude, position.coords.longitude], ZOOM);
    getCityByCoords(position.coords);
  }

  function error() {
    map = window.WE.map("map", {
      center: [coords.latitude, coords.longitude],
      zoom: ZOOM,
      dragging: true,
      scrollWheelZoom: true,
    });
    baselayer.addTo(map);
    map.setView([coords.latitude, coords.longitude], ZOOM);
    createMap(coords, city);
  }
  if (!navigator.geolocation) {
    map = window.WE.map("map", {
      center: [coords.latitude, coords.longitude],
      zoom: ZOOM,
      dragging: true,
      scrollWheelZoom: true,
    });
    baselayer.addTo(map);
    map.setView([coords.latitude, coords.longitude], ZOOM);
    createMap(coords, city);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function getCityByName(value) {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode(
    {
      address: value,
    },
    (results, status) => {
      if (!value) return;
      if (status === window.google.maps.GeocoderStatus.OK) {
        const coords = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        const city = results[0].address_components[0].long_name;
        createMap(coords, city);
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

  // function getCity() {
  //     const place = autocomplete.getPlace();
  //     if (!place.geometry) {
  //         getCityByName(input.value);
  //         return;
  //     }
  //     const coords = {
  //         latitude: place.geometry.location.lat(),
  //         longitude: place.geometry.location.lng(),
  //     };
  //     createMap(coords, place.name);
  // }
};
