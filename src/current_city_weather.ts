import { City, Coords } from "./types";

const WEATHER_API_KEY = "5df917b322441cc9e193178bf51efa31";

export const currentCityEl = <HTMLHeadingElement>(
  document.getElementById("current-city")
);
export const currentCityImg = <HTMLImageElement>(
  document.getElementById("current-city-img")
);
const currentCityWind = <HTMLDivElement>(
  document.getElementById("current-city-wind")
);
export const currentCityWeather = <HTMLDivElement>(
  document.getElementById("current-city-weather")
);
const currentCityCelsius = <HTMLSpanElement>(
  document.getElementById("current-city-celsius")
);
const currentCityMax = <HTMLSpanElement>(
  document.getElementById("current-temp-max")
);
const currentCityMin = <HTMLSpanElement>(
  document.getElementById("current-temp-min")
);
const currentCityPressure = <HTMLSpanElement>(
  document.getElementById("current-city-pressure")
);
const currentCityHumidity = <HTMLSpanElement>(
  document.getElementById("current-city-humidity")
);
const currentCitySunset = <HTMLSpanElement>(
  document.getElementById("current-city-sunset")
);
const currentCitySunrise = <HTMLSpanElement>(
  document.getElementById("current-city-sunrise")
);
const day = <HTMLSpanElement>document.getElementById("day");

const initialTimeZone = new Date().getTimezoneOffset() * 60;

export function getWindDirection(deg: number) {
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

export async function getCityWeather(coords: Coords) {
  currentCityImg.src = "icons/load.gif";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall` +
      `?lat=${coords.latitude}&lon=${coords.longitude}` +
      `&exclude=minutely,daily,alerts&lang=ru&appid=${WEATHER_API_KEY}`
  );
  return response.json();
}

export function setCurrentCityWeather(options: City) {
  if (!options) return;
  const { weather } = options;
  currentCityEl.textContent = options.name;
  const imageSrc = weather.current.weather[0].icon;
  currentCityImg.src = `./icons/${imageSrc}_icon.png`;
  const windDirection = getWindDirection(weather.current.wind_deg);
  (
    currentCityWind.children[0] as HTMLImageElement
  ).src = `./icons/wind/icons8-${windDirection}-80.png`;
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
  currentCityWind.children[1].innerHTML = `${weather.current.wind_speed.toFixed(
    1
  )} м/с ${windDirectionRu}`;
  day.textContent = new Date().toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  currentCityWeather.textContent =
    weather.current.weather[0].description[0].toUpperCase() +
    weather.current.weather[0].description.substr(1);
  currentCityCelsius.textContent = `${(weather.current.temp - 273.15).toFixed(
    0
  )}°`;
  const maxTemp = Math.max(
    ...weather.hourly.slice(0, 25).map((val) => val.temp)
  );
  const minTemp = Math.min(
    ...weather.hourly.slice(0, 25).map((val) => val.temp)
  );
  currentCityMax.innerHTML = `${Math.round(maxTemp - 273.15).toFixed(0)}° `;
  currentCityMin.innerHTML = `/ ${Math.round(minTemp - 273.15).toFixed(0)}°`;
  currentCityPressure.textContent = `${(
    weather.current.pressure / 1.36
  ).toFixed(0)} мм рт. ст.`;
  currentCityHumidity.textContent = `${weather.current.humidity} %`;
  const sunrise = {
    hour: new Date(
      (weather.current.sunrise + weather.timezone_offset + initialTimeZone) *
        1000
    ).getHours(),
    minute: new Date(
      (weather.current.sunrise + weather.timezone_offset + initialTimeZone) *
        1000
    ).getMinutes(),
  };

  const sunset = {
    hour: new Date(
      (weather.current.sunset + weather.timezone_offset + initialTimeZone) *
        1000
    ).getHours(),
    minute: new Date(
      (weather.current.sunset + weather.timezone_offset + initialTimeZone) *
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
