import { City } from "./types";
import { cityListEl, store } from "./index";
import { addCity, removeCity } from "./reducers/cities";

export function addNewCity(city: City) {
  store.dispatch(addCity(city));
  let hasCity = false;
  if (Object.keys(localStorage).length) {
    Object.values(localStorage).forEach((item: string) => {
      if (JSON.parse(item).id === city.id) {
        hasCity = true;
      }
    });
  }
  if (!hasCity) {
    let lastId = 0;
    if (Object.keys(localStorage).length) {
      lastId = Math.max(
        ...Object.values(localStorage).map((item: string) =>
          Number(JSON.parse(item).id)
        )
      );
    }
    localStorage.setItem(`${lastId + 1}`, JSON.stringify(city));
  }
}

export function removeOldCity(cityName: string) {
  let removedIndex;
  Object.entries(localStorage).forEach(([key, value]) => {
    const city = JSON.parse(value) as City;
    const { name } = city;
    if (name === cityName) {
      removedIndex = key;
    }
  });
  if (removedIndex === undefined) {
    return;
  }
  const removedCity = cityListEl.querySelector(`[data-name="${cityName}"]`);
  if (!removedCity) {
    return;
  }
  removedCity.remove();
  localStorage.removeItem(removedIndex);
  store.dispatch(removeCity(Number(removedIndex)));
}
