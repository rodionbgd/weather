import Swiper from "swiper";
import { City, LOCATION } from "./types";
import Slider from "./slider";
import renderDailyChart, {
  renderDailyLabels,
} from "./daily_weather/daily_weather";
import { isInViewport } from "./utils";
import { bgContainer, cityListEl, mainSwiper } from "./index";

export const KELVIN_TO_CELSIUS = 273.15;

export const initialTimeZone = new Date().getTimezoneOffset() * 60;

export function getWindDirection(deg: number) {
  const DIRECTION = [
    "north",
    "north-north-east",
    "north-east",
    "east-north-east",
    "east",
    "east-south-east",
    "south-east",
    "south-south-east",
    "south",
    "south-south-west",
    "south-west",
    "west-south-west",
    "west",
    "west-north-west",
    "north-west",
    "north-north-west",
  ];
  return DIRECTION[
    Math.floor((deg + 11) / (360 / DIRECTION.length)) % DIRECTION.length
  ];
}

export function getPhaseDegree(
  sunrise: number,
  sunset: number,
  timezone_offset: number
) {
  const currentTime =
    Number(new Date()) + (timezone_offset + initialTimeZone) * 1000;
  const phase = ((currentTime - sunrise) * 180) / (sunset - sunrise);
  if (phase < 0) return 0;
  if (phase > 180) return 180;
  return phase;
}

export function getMoonPhaseDescr(moon_phase: number) {
  const step = 1 / 8;
  const moonPhase = Math.round(moon_phase / step) * step;
  let imgSrc = "";
  let phaseDescr = "";
  switch (moonPhase) {
    case 0: {
      imgSrc = "wi-moon-new";
      phaseDescr = "Новолуние";
      break;
    }
    case step: {
      imgSrc = "wi-moon-alt-waxing-crescent-4";
      phaseDescr = "Растущая луна";
      break;
    }
    case 2 * step: {
      imgSrc = "wi-moon-alt-first-quarter";
      phaseDescr = "Первая четверть";
      break;
    }
    case 3 * step: {
      imgSrc = "wi-moon-alt-waxing-gibbous-3";
      phaseDescr = "Растущая луна";
      break;
    }
    case 4 * step: {
      imgSrc = "wi-moon-full";
      phaseDescr = "Полнолуние";
      break;
    }
    case 5 * step: {
      imgSrc = "wi-moon-waning-gibbous-3";
      phaseDescr = "Убывающая луна";
      break;
    }
    case 6 * step: {
      imgSrc = "wi-moon-third-quarter";
      phaseDescr = "Последняя четверть";
      break;
    }
    case 7 * step: {
      imgSrc = "wi-moon-waning-crescent-3";
      phaseDescr = "Убывающая луна";
      break;
    }
    case 8 * step: {
      imgSrc = "wi-moon-new";
      phaseDescr = "Новолуние";
      break;
    }
    default:
      break;
  }
  return { imgSrc, phaseDescr };
}

function getDateFromWeather(date: number, timezone_offset: number) {
  return new Date((date + timezone_offset + initialTimeZone) * 1000);
}

function renderDayTemperature(options: City) {
  const { weather } = options;
  const { current, hourly } = weather;
  const maxTemp = Math.max(
    ...hourly.slice(0, 25).map((val) => val.temp as number)
  );
  const minTemp = Math.min(
    ...hourly.slice(0, 25).map((val) => val.temp as number)
  );
  const updateTimeVal = new Date(options.updateTime);
  return `
                        <div>
                            <div class="current-temp">
                                <aside>
                                    <span class="heading">
                                    ${(
                                      (current.temp as number) -
                                      KELVIN_TO_CELSIUS
                                    ).toFixed(
                                      0
                                    )}<span class="celcius-font">°</span>
                                    </span>
                                </aside>
                                <aside class="current-temp-max-min">
                                    <span class="current-temp-max">
                                        ${Math.round(
                                          maxTemp - KELVIN_TO_CELSIUS
                                        ).toFixed(0)}°
                                    </span>
                                    <span class="current-temp-min">
                                        &nbsp/&nbsp${Math.round(
                                          minTemp - KELVIN_TO_CELSIUS
                                        ).toFixed(0)}°
                                    </span>
                                </aside>
                            </div>
                            <div class="current-city-weather">
                                ${
                                  current.weather[0].description[0].toUpperCase() +
                                  current.weather[0].description.slice(1)
                                }
                            </div>
                            <p class="update-time opacity-7">
                                Обновлено: ${`0${updateTimeVal.getHours()}`.slice(
                                  -2
                                )}:${`0${updateTimeVal.getMinutes()}`.slice(-2)}
                            </p>
                        </div>
        `;
}

export function renderHeader(options: City) {
  let innerHTML;
  innerHTML = `
        <header class="header">
            <p class="current-city-title">
            ${options.name}
            `;
  if (options.location !== LOCATION.LOCATION_NO) {
    innerHTML += `
            <img ${
              !window.TOUCH ? 'class="icon"' : ""
            } src="./images/location_${options.location}.png" alt="">
            `;
  }
  innerHTML += `
            </p>
         ${window.TOUCH ? '<p class="menu-mobile">&#11820</p>' : ""} 
         ${!window.TOUCH ? renderDayTemperature(options) : ""}
        </header>
        `;
  return innerHTML;
}

function renderRiseSet(options: City) {
  const { weather } = options;
  const { current } = weather;

  const { timezone_offset } = weather;
  const sunrise = getDateFromWeather(current.sunrise, timezone_offset);
  const sunset = getDateFromWeather(current.sunset, timezone_offset);
  const sunPhase = getPhaseDegree(
    sunrise as unknown as number,
    sunset as unknown as number,
    timezone_offset
  );

  let filterSun = "";
  if (sunPhase <= 0 || sunPhase >= 180) {
    filterSun = "filter:brightness(0.6);";
  }

  const styleSun = `--sun-phase-deg: ${sunPhase}deg;`;

  const { daily } = weather;
  const moonrise = getDateFromWeather(daily[0].moonrise, timezone_offset);
  const moontSetTime =
    daily[0].moonrise < daily[0].moonset ? daily[0].moonset : daily[1].moonset;
  const moonset = getDateFromWeather(moontSetTime, timezone_offset);
  const moonPhase = getPhaseDegree(
    moonrise as unknown as number,
    moonset as unknown as number,
    timezone_offset
  );
  let filterMoon = "";
  if (moonPhase <= 0 || moonPhase >= 180) {
    filterMoon = "filter: brightness(0.6);";
  }

  const styleMoon = `--moon-phase-deg: ${moonPhase}deg;`;

  const { imgSrc, phaseDescr } = getMoonPhaseDescr(daily[0].moon_phase);

  const currentCitySunrise = `${`0${sunrise.getHours()}`.slice(
    -2
  )}:${`0${sunrise.getMinutes()}`.slice(-2)}`;
  const currentCitySunset = `${`0${sunset.getHours()}`.slice(
    -2
  )}:${`0${sunset.getMinutes()}`.slice(-2)}`;

  const currentCityMoonrise = `${`0${moonrise.getHours()}`.slice(
    -2
  )}:${`0${moonrise.getMinutes()}`.slice(-2)}`;
  const currentCityMoonset = `${`0${moonset.getHours()}`.slice(
    -2
  )}:${`0${moonset.getMinutes()}`.slice(-2)}`;

  return `
    <p class="verbose-info__title">Восход и закат</p>
    <div class="verbose-info_border ${
      !window.TOUCH ? "verbose-info-sun-moon" : ""
    }">
        <div class="sun-phase" tabindex="0">
            <span  style="${filterSun} ${styleSun}">
                <img class="sun-size" src="./images/sun_phase.png" alt="">
            </span>
        </div>
        <div class="moon-phase" tabindex="0">
            <span class="moon-rotate"  style="${filterMoon} ${styleMoon}">
                <img class="icon moon-phase-img" src="./images/moon_phase.png" alt="">
            </span>
        </div>
        <div class="border width-100 margin-top--11em opacity-5"></div>
        <section class="sun-moon-phase-descr">
            <div>
                <div>Восход солнца</div>
                <div>${currentCitySunrise}</div>
                <div>Восход луны</div>
                <div>${currentCityMoonrise}</div>
            </div>
            <div class="text-center">
                <i class="wi ${imgSrc}"></i>
                <div>${phaseDescr}</div>
            </div>
            <div class="text-right">
                <div>Закат солнца</div>
                <div>${currentCitySunset}</div>
                <div>Заход луны</div>
                <div>${currentCityMoonset}</div>
        </section>
    </div>
    `;
}

export function renderVerboseInfo(options: City) {
  const { weather } = options;
  const { current } = weather;

  const pressure = `${(current.pressure / 1.36).toFixed(0)} мм рт. ст.`;
  const uvi = `${current.uvi.toFixed(0)}`;
  const windSpeed = `${current.wind_speed.toFixed(0)} м/с`;
  const windDir = getWindDirection(current.wind_deg)
    .split("-")
    .map((val) => {
      switch (val[0]) {
        case "n":
          return "С";
        case "s":
          return "Ю";
        case "w":
          return "З";
        case "e":
          return "В";
        default:
          return "";
      }
    })
    .join("");
  const feelsLike = `${(current.feels_like - KELVIN_TO_CELSIUS).toFixed(0)}°`;
  const humidity = `${current.humidity} %`;
  const helpfulInfoParams = [
    { title: "Влажность", value: humidity, img: "humidity.png" },
    { title: "Ощущение", value: feelsLike, img: "feels_like.png" },
    { title: "Скорость ветра", value: windSpeed, img: "wind_speed.png" },
    { title: "Направление ветра", value: windDir, img: "wind_dir.png" },
    { title: "Индекс УФ", value: uvi, img: "uvi.png" },
    { title: "Давление", value: pressure, img: "pressure.png" },
  ];

  let helpfulInfoParamsHTML = "";
  helpfulInfoParams.forEach((param) => {
    helpfulInfoParamsHTML += `
            <li>
                <img class="verbose-info__icon" src="./images/verbose/${param.img}" alt="">
                <div class="item-description-wrapper">
                    <p class="item-description opacity-7 ">${param.title}</p>
                    <p class="item-description font-weight-500">${param.value}</p>
                </div>
            </li> 
            `;
  });
  return `
        <p class="verbose-info__title">Полезная информация</p>
        <ul class="verbose-info__items verbose-info_border">
            ${helpfulInfoParamsHTML}
        </ul>
        `;
}

export function setCurrentCityWeather(options: City, el: HTMLDivElement) {
  if (!options) return;
  const { weather } = options;
  const { daily } = weather;
  let cityEl = <HTMLElement>el.querySelector(`[data-name="${options.name}"]`);
  const isOldCity = !!cityEl;
  if (!cityEl || !window.TOUCH) {
    cityEl = document.createElement("div");
  }
  cityEl.innerHTML = "";
  cityEl.dataset.name = `${options.name}`;
  cityEl.dataset.history = `${options.id}`;
  cityEl.classList.forEach((className) => cityEl.classList.remove(className));
  cityEl.classList.add("swiper-slide");
  const slider = new Slider(weather);
  const hourSliderInnerHTML = slider.createSlider();
  const slidersInnerHTML = `
                        <section class="swiper slider border">
                            <div class="swiper-wrapper">
                                ${hourSliderInnerHTML}
                            </div>
                        </section>
                        <section class="hour-daily-weather border">
                            <section class="swiper no-margin">
                                <div class="swiper-wrapper">
                                    <div class="slider swiper-slide" role="group" aria-label="1/1">
                                        ${renderDailyLabels(daily)}
                                    </div>
                                </div>
                            </section>
                            <fieldset class="slider no-min-width no-border ${
                              !window.TOUCH ? "no-padding" : ""
                            }">
                                <div class="daily-chart">
                                    <canvas aria-label="daily-weather" role="img"></canvas>
                                </div>
                            </fieldset>
                        </section>    
    `;
  const verboseInfo = `
                        <div class="verbose-info-wrapper opacity-8">
                        <section class="verbose-info">
                            ${renderVerboseInfo(options)}
                        </section> 
                        <section class="verbose-info">
                            ${renderRiseSet(options)}
                        </section>           
                    </div>
    `;
  cityEl.innerHTML = `
       ${window.TOUCH ? renderHeader(options) : ""}
       <div class="scroll ${window.standalone ? "scroll_standalone" : ""}">
                <main class="section">
                    <article class="section-content">
                        <section class="current-container">
                        ${
                          !window.TOUCH
                            ? renderHeader(options)
                            : renderDayTemperature(options)
                        }
                        ${!window.TOUCH ? verboseInfo : slidersInnerHTML}
                        </section>
                    </article>
                    <div class="sliders-wrapper">
                        ${!window.TOUCH ? slidersInnerHTML : ""}
                    </div>
                    ${window.TOUCH ? verboseInfo : ""}
                </main>
            </div>
    `;
  if (!window.TOUCH && el.firstElementChild) {
    el.insertAdjacentElement("beforeend", cityEl);
    el.firstElementChild.remove();
  }
  if (!isOldCity) {
    el.appendChild(cityEl);
    if (mainSwiper) {
      mainSwiper.update();
    }
  }
  const dailyWeatherCtx = <HTMLCanvasElement>(
    cityEl.querySelector(".hour-daily-weather canvas")
  );
  renderDailyChart(dailyWeatherCtx, options);
  /* eslint-disable-next-line no-new */
  new Swiper(".border.swiper", {
    slidesPerView: 6,
    spaceBetween: 0,
  });

  const verboseInfoSunMoon = <HTMLElement>(
    document.querySelector(".verbose-info-sun-moon")
  );
  const currentCitySunPhase = <HTMLSpanElement>(
    cityEl.querySelector(".sun-phase span")
  );
  const currentCityMoonPhase = <HTMLSpanElement>(
    cityEl.querySelector(".moon-phase span")
  );

  if (window.TOUCH) {
    document.body.addEventListener("touchmove", () => {
      if (isInViewport(currentCitySunPhase)) {
        currentCitySunPhase.classList.add("sun-phase-animate");
        currentCityMoonPhase.classList.add("moon-phase-animate");
      } else {
        currentCitySunPhase.classList.remove("sun-phase-animate");
        currentCityMoonPhase.classList.remove("moon-phase-animate");
      }
    });
  } else {
    verboseInfoSunMoon.addEventListener("mouseenter", () => {
      currentCitySunPhase.classList.add("sun-phase-animate");
    });

    verboseInfoSunMoon.addEventListener("mouseleave", () => {
      currentCitySunPhase.classList.remove("sun-phase-animate");
    });
  }

  if (window.TOUCH && mainSwiper) {
    const cityList = Array.from(cityListEl.children);
    const idx = cityList.indexOf(cityEl);
    if (idx === -1) {
      return;
    }
    const bgImageList = Array.from(bgContainer.children);
    const isRendered = bgImageList.filter((img) => /bg-/g.test(img.className));
    if (!isRendered.length) {
      const imgBgEl = bgImageList.filter(
        (img) => !img.classList.contains("hidden")
      )[0];
      imgBgEl.className = `bg-${weather.current.weather[0].icon}`;
    }
    mainSwiper.slideTo(idx);
  }
}
