import { City, CityWeather, LOCATION } from "./types";
import { setCurrentCityWeather } from "./current_city_weather";
import { addCity } from "./reducers/cities";
import init from "./init";
import {
  app,
  bgContainer,
  cityListEl,
  menuCityList,
  menuEl,
  showCity,
  store,
  updateLocation,
} from "./index";
import { getCityWeather, getLocation } from "./get_city";

document.addEventListener("DOMContentLoaded", init);

export default function listeners() {
  updateLocation.addEventListener("click", () => {
    getLocation(true);
    if (window.TOUCH) {
      menuEl.style.display = "none";
      app.style.display = "block";
      bgContainer.style.display = "initial";
    }
  });

  window.addEventListener("popstate", () => {
    const cityId = document.location.pathname.split("/").at(-1);
    const { cities } = store.getState();
    let currentCity = cities.filter((city) => city.id === Number(cityId))[0];
    if (!currentCity) {
      [currentCity] = cities.filter(
        (city) => city.location !== LOCATION.LOCATION_NO
      );
    }
    setCurrentCityWeather(currentCity, cityListEl);
  });

  menuCityList.addEventListener("click", async (e: Event) => {
    const cityEl = <HTMLElement>(
      (e.target as HTMLElement).closest(".city_list__profile")
    );
    if (!cityEl) {
      return;
    }
    const { cities } = store.getState();

    let city = cities.filter(
      (item) => item.name === cityEl.dataset.menuName
    )[0] as City;
    city = {
      ...city,
      updateTime: new Date().toString(),
      weather: (await getCityWeather(city.coords)) as CityWeather,
      isCurrentCity: true,
    };
    store.dispatch(addCity(city));
    if (window.TOUCH) {
      menuEl.style.display = "none";
      app.style.display = "block";
      bgContainer.style.display = "initial";
    }
  });

  if (window.TOUCH) {
    showCity.addEventListener("click", () => {
      menuEl.style.display = "none";
      app.style.display = "block";
      bgContainer.style.display = "initial";
    });
  }

  document.body.addEventListener("selectstart", (e) => e.preventDefault());
}
