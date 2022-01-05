import { City } from "./types";
import { store } from "./index";
import { addCity } from "./reducers/cities";

// const cityListElem = <HTMLElement>document.getElementById("city-list");

export default function addNewCity(city: City) {
  // const hasCity = false;
  // const {weather} = city;
  store.dispatch(addCity(city));
  localStorage.setItem(city.name, JSON.stringify(city));
  //   const city = <HTMLElement>(
  //     cityListElem.querySelector(`.city_list__profile[data-name=${options.name}]`)
  //   );
  //   if (
  //     Object.prototype.hasOwnProperty.call(localStorage, options.name) &&
  //     city
  //   ) {
  //     hasCity = true;
  //   }
  //   localStorage.setItem(options.name, JSON.stringify(options));
  //   const maxTemp = Math.max(
  //     ...weather.hourly.slice(0, 25).map((val) => val.temp)
  //   );
  //   const minTemp = Math.min(
  //     ...weather.hourly.slice(0, 25).map((val) => val.temp)
  //   );
  //   const img = `./icons/${weather.current.weather[0].icon}_icon.png`;
  //   const newCity = `
  //                     <section class="city_list__profile" data-name="${
  //                       options.name
  //                     }">
  //                         <h4 class="city_list__name">${options.name}</h4>
  //                         <img src="${img}" alt="" class="city_list__picture">
  //                         <span class="city_list__value">${+(
  //                           maxTemp - 273.15
  //                         ).toFixed()}&deg
  //                         / ${+(minTemp - 273.15).toFixed()}&deg</span>
  //                     </section>
  // `;
  //   if (Object.keys(localStorage).length) {
  //     cityListElem.style.display = "flex";
  //   }
  //   if (Object.keys(localStorage).length > 5) {
  //     localStorage.removeItem(
  //       (cityListElem.firstElementChild as HTMLElement)!.dataset.name as string
  //     );
  //     cityListElem.firstElementChild!.remove();
  //   }
  //   if (!hasCity) {
  //     cityListElem.insertAdjacentHTML("beforeend", newCity);
  //     return true;
  //   }
  //   city.insertAdjacentHTML("afterend", newCity);
  //   city.remove();
  return false;
}
