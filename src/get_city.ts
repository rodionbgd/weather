import { City, CityWeather, Coords, LOCATION } from "./types";
import { getCityWeather } from "./current_city_weather";

export async function getCityList() {
  if (!Object.keys(localStorage).length) {
    return [];
  }
  const data = Object.values(localStorage).map(async (value) => {
    let city = JSON.parse(value) as City;
    city.updateTime = new Date().toString();
    const weather = await getCityWeather(city.coords);
    city = {
      ...city,
      weather,
    };
    return city;
  });
  const cityList = await Promise.all(data);
  cityList.sort((a, b) => a.id - b.id);
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
