import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { City, TemperatureObj, Weather } from "../types";
import { createConfig } from "./config";

const WEEK_DAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export function renderDailyLabels(dailyWeather: Weather[]) {
  let innerHTML = "";
  const currentDay = new Date().getDay();
  for (let i = 1; i <= WEEK_DAYS.length; i++) {
    const currentDate = new Date(dailyWeather[i].dt * 1000);
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    innerHTML += `
        <div class=" width-day wrap">
            <p>${
              i === 1
                ? "Завтра"
                : WEEK_DAYS[(currentDay + i) % WEEK_DAYS.length]
            }</p>
            <p>${date}/${month}</p>
            <img  class="wrap-day-img" src="./images/weather/${
              dailyWeather[i].weather[0].icon
            }_icon.png" alt="">
            <p>${dailyWeather[i].weather[0].description}</p>
        </div>
        `;
  }
  return innerHTML;
}

export default function renderDailyChart(
  dailyWeatherCtx: HTMLCanvasElement,
  city: City
) {
  Chart.register(...registerables, ChartDataLabels);
  const { daily } = city.weather;
  const dailyWeatherTemp = daily
    .map((day) => {
      return {
        day: (day.temp as TemperatureObj).day,
        night: (day.temp as TemperatureObj).night,
        max: (day.temp as TemperatureObj).max,
        min: (day.temp as TemperatureObj).min,
      };
    })
    .slice(1);

  const config = createConfig(dailyWeatherTemp);
  return new Chart(dailyWeatherCtx, config);
}
