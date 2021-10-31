export const currentCity = document.getElementById("current-city");
export const currentCityImg = document.getElementById("current-city-img");
const currentCityWind = document.getElementById("current-city-wind");
export const currentCityWeather = document.getElementById(
  "current-city-weather"
);
const currentCityCelsius = document.getElementById("current-city-celsius");
const currentCityMax = document.getElementById("current-temp-max");
const currentCityMin = document.getElementById("current-temp-min");
const currentCityPressure = document.getElementById("current-city-pressure");
const currentCityHumidity = document.getElementById("current-city-humidity");
const currentCitySunset = document.getElementById("current-city-sunset");
const currentCitySunrise = document.getElementById("current-city-sunrise");
const day = document.getElementById("day");

const initialTimeZone = new Date().getTimezoneOffset() * 60;

export function getWindDirection(deg) {
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

export function setCurrentCityWeather(options) {
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
  currentCityCelsius.textContent = `${(options.current.temp - 273.15).toFixed(
    0
  )}°`;
  const maxTemp = Math.max(
    ...options.hourly.slice(0, 25).map((val) => val.temp)
  );
  const minTemp = Math.min(
    ...options.hourly.slice(0, 25).map((val) => val.temp)
  );
  currentCityMax.innerHTML = `${Math.round(maxTemp - 273.15).toFixed(0)}° `;
  currentCityMin.innerHTML = `/ ${Math.round(minTemp - 273.15).toFixed(0)}°`;
  currentCityPressure.textContent = `${(
    options.current.pressure / 1.36
  ).toFixed(0)} мм рт. ст.`;
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
