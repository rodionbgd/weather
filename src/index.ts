import { configureStore } from "@reduxjs/toolkit";
import init from "./init";
import { searchForm } from "./city_name";
import { addCity, citySlice } from "./reducers/cities";
import { City, CityWeather } from "./types";
import { getCityWeather } from "./current_city_weather";

export const app = <HTMLDivElement>document.getElementById("app");
export const bgContainer = <HTMLDivElement>(
  document.getElementById("bg-container")
);
export const menuEl = <HTMLDivElement>document.getElementById("menu");
export const menuCityList = <HTMLUListElement>(
  document.getElementById("menu-city-list")
);
export const cityListEl = <HTMLDivElement>document.getElementById("city-list");
export const showCity = <HTMLDivElement>(
  document.getElementById("show-last-city")
);
// eslint-disable-next-line
export const store = configureStore({
  reducer: {
    cities: citySlice.reducer,
  },
});

if (menuCityList) {
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
    // chart = renderDailyWeather(currentCity);
  });
}

document.addEventListener("DOMContentLoaded", init);

if (window.TOUCH) {
  showCity.addEventListener("click", () => {
    menuEl.style.display = "none";
    app.style.display = "block";
    bgContainer.style.display = "initial";
  });
}

document.body.addEventListener("selectstart", (e) => e.preventDefault());
if (searchForm) {
  searchForm.addEventListener("submit", (e) => e.preventDefault());
}
