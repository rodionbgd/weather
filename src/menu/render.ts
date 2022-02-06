import { menuCityList, store } from "../index";
import { KELVIN_TO_CELSIUS } from "../current_city_weather";
import { LOCATION } from "../types";
import { removeOldCity } from "../add_remove_city";
import "slipjs";

export function renderMenu() {
  new window.Slip(menuCityList);
  menuCityList.addEventListener("slip:swipe", function (e: Event) {
    if (menuCityList.children.length <= 1) {
      return;
    }
    const city = <HTMLLIElement>(e.target as HTMLElement).closest("li");
    removeOldCity(city.dataset.menuName as string);
    city.remove();
  });
  let innerHTML = "";
  const { cities } = store.getState();
  cities.forEach((city) => {
    const { weather } = city;
    const { current } = weather;
    const bgClassName = `bg-${current.weather[0].icon}`;
    let locationImg = "";
    if (city.location !== LOCATION.LOCATION_NO) {
      locationImg = `
            <img src="./images/location_${city.location}.png" alt="">
            `;
    }
    const description =
      current.weather[0].description[0].toUpperCase() +
      current.weather[0].description.slice(1);
    innerHTML += `
    <li class="city_list__profile ${bgClassName}" data-menu-name="${city.name}">
        <p class="city_list__name">${city.name} ${locationImg}
        </p>
        <div class="profile-wrap">
        <p class="profile-wrap__temp">
            ${+(
              (weather.current.temp as number) - KELVIN_TO_CELSIUS
            ).toFixed()}<span class="temp-celcius-font">°</span>
        </p>
         <p class="profile-wrap__descr">
            ${description}
        </p>
        </div>
    </li>
        `;
  });
  menuCityList.innerHTML = innerHTML;
}
