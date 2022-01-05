import { City, CityWeather, Coords } from "./types";
import { getCityWeather } from "./current_city_weather";

export async function getCityList() {
  const data = await Object.values(localStorage).map(async (value) => {
    let city = JSON.parse(value) as City;
    city.updateTime = new Date().toString();
    const weather = await getCityWeather(city.coords);
    city = {
      ...city,
      weather,
    };
    // localStorage.setItem(`${city.name}`, JSON.stringify(city));
    return city;
  });

  return Promise.all(data);
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
  if (!(city as City)) {
    city = {
      name: cityName,
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
