import { ChartConfiguration } from "chart.js";
import { TemperatureObj } from "../types";
import { KELVIN_TO_CELSIUS } from "../current_city_weather";
import { Context } from "chartjs-plugin-datalabels";

export function createConfig(
  dailyWeatherTemp: TemperatureObj[]
): ChartConfiguration {
  const pointObj = {
    pointBackgroundColor: "#ffffff",
    pointHoverBackgroundColor: "#609aff",
    hoverRadius: 3,
    pointRadius: 3,
  };
  let aspectRatio = 15 / 3;
  let left = 45;
  let right = 45;
  let top = 35;
  let bottom = 35;
  if (!window.TOUCH) {
    aspectRatio = 21 / 3;
    left = 30;
    right = 30;
    top = 30;
    bottom = 30;
  }
  const labels = dailyWeatherTemp.map(
    (tempObj) =>
      `День: ${((tempObj.day as number) - KELVIN_TO_CELSIUS).toFixed(
        0
      )}°\nНочь: ${((tempObj.night as number) - KELVIN_TO_CELSIUS).toFixed(0)}°`
  );
  return {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: dailyWeatherTemp.map(
            (tempObj) => tempObj.max! - KELVIN_TO_CELSIUS
          ),
          datalabels: {
            align: "end",
            anchor: "end",
          },
          borderWidth: 2,
          ...pointObj,
        },
        {
          data: dailyWeatherTemp.map(
            (tempObj) => tempObj.min! - KELVIN_TO_CELSIUS
          ),
          datalabels: {
            align: "start",
            anchor: "start",
          },
          borderWidth: 2,
          ...pointObj,
        },
      ],
    },
    options: {
      responsive: true,

      plugins: {
        datalabels: {
          borderRadius: 1,
          color: "white",
          font: {
            weight: "bold",
          },
          formatter: function (value: any, context: Context) {
            return `${Number(
              context.dataset.data[context.dataIndex] as any
            ).toFixed(0)}°`;
          },
          padding: 8,
        },
        legend: {
          display: false,
        },
      },

      aspectRatio,
      layout: {
        padding: {
          top,
          bottom,
          left,
          right,
        },
      },
      elements: {
        line: {
          fill: false,
          tension: 0.4,
          borderColor: "#e6e6e6",
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
    },
  };
}
