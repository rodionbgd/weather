import { City, CityWeather, Coords, LOCATION } from "./types";
import { store } from "./index";
import { getCityByCoords } from "./city_name";
import { addNewCity } from "./add_remove_city";

// const WEATHER_API_KEY = "5df917b322441cc9e193178bf51efa31";
const WEATHER_API_KEY = "a7c22af58d3c31ff67298a325b74ea0e";

export async function getCityWeather(coords: Coords) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall` +
      `?lat=${coords.latitude}&lon=${coords.longitude}` +
      `&exclude=minutely,alerts&lang=ru&appid=${WEATHER_API_KEY}`
  );
  return response.json();
}

export async function getCityList() {
  if (!Object.keys(localStorage).length) {
    return [];
  }
  let cityLocationCounter = 0;
  const data = Object.entries(localStorage).map(async ([key, value]) => {
    let city = JSON.parse(value) as City;
    city.updateTime = new Date().toString();
    const weather = await getCityWeather(city.coords);
    if (city.location !== LOCATION.LOCATION_NO) {
      cityLocationCounter += 1;
    }
    if (cityLocationCounter > 1) {
      localStorage.removeItem(key);
      return null;
    }

    city = {
      ...city,
      weather,
    };
    return city;
  });
  let cityList = await Promise.all(data);
  cityList = [...cityList.filter((city) => city)];
  cityList.sort((a, b) => a!.id - b!.id);
  return cityList;
}

export async function getCurrentCity(
  cityName: string,
  coords: Coords,
  cities: City[]
) {
  if (!cityName || !Object.keys(coords).length) {
    return null;
  }
  let city = {} as City;
  if (cities.length) {
    [city] = cities.filter((item) => item.name === cityName);
  }
  if (city === undefined || !Object.keys(city).length) {
    let lastId = 0;
    if (cities.length) {
      lastId = Math.max(...cities.map((item) => item.id));
    }
    city = {
      id: lastId + 1,
      name: cityName,
      location: LOCATION.LOCATION_NO,
      coords,
      weather: (await getCityWeather(coords)) as CityWeather,
      updateTime: new Date().toString(),
    };
  }
  city = {
    ...city,
    isCurrentCity: true,
  };
  return city;
}

export function getLocation(force: boolean) {
  // Moscow
  let coords = {
    latitude: 55.7558,
    longitude: 37.6173,
  };
  let cityName = "Москва";
  let cityData: City;
  let watchId: number;

  const { cities } = store.getState();
  async function success(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    coords = { latitude, longitude };
    const name = await getCityByCoords(coords);
    const newCity = await getCurrentCity(name, coords, cities);
    if (newCity) {
      newCity.location = LOCATION.LOCATION_OK;
      setTimeout(() => {
        addNewCity(newCity);
      }, 0);
    }
  }

  async function error() {
    if (cities.length && !force) {
      [cityData] = cities.filter(
        (city) => city.location !== LOCATION.LOCATION_NO
      );
      if (!cityData) {
        [cityData] = cities;
      }
      coords = cityData.coords;
      cityName = cityData.name;
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
      maximumAge: 0,
      timeout: 10000,
    };
    watchId = navigator.geolocation.watchPosition(success, error, options);
    setTimeout(() => {
      navigator.geolocation.clearWatch(watchId);
    }, 10 * 1000);
  }
}
