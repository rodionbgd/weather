import { CityWeather } from "./types";
import { initialTimeZone } from "./current_city_weather";

export default class Slider {
  weather: CityWeather;

  constructor(weather: CityWeather) {
    this.weather = weather;
  }

  createSlider() {
    let sliderInnerHTML = "";
    const { hourly } = this.weather;
    for (let i = 1; i < 25; i += 1) {
      sliderInnerHTML += `<div class="swiper-slide width-hour wrap ">
                                    <p>${new Date(
                                      (hourly[i].dt +
                                        this.weather.timezone_offset +
                                        initialTimeZone) *
                                        1000
                                    ).getHours()}:00</p>`;
      if (hourly[i].pop > 0.45) {
        sliderInnerHTML += `<p>${Math.round(hourly[i].pop * 100)}%</p>`;
      } else {
        sliderInnerHTML += `<p>&nbsp;</p>`;
      }
      sliderInnerHTML += `<img class="wrap-hour-img" src="./images/weather/${
        hourly[i].weather[0].icon
      }_icon.png" alt="">
                       <p>${Math.round(
                         (hourly[i].temp as number) - 273.15
                       )}°</p>
                                </div>`;
    }
    return sliderInnerHTML;
  }
}
