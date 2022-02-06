import { configureStore } from "@reduxjs/toolkit";
import Swiper, { History, Pagination } from "swiper";
import { citySlice } from "./reducers/cities";
import addGoogleScript from "./utils";
import listeners from "./listeners";
import { BeforeInstallPromptEvent } from "./types";

Swiper.use([Pagination, History]);

// window.TOUCH = true;
window.TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
window.standalone = window.matchMedia("(display-mode: standalone)").matches;

export const store = configureStore({
  reducer: {
    cities: citySlice.reducer,
  },
});

export let mainSwiper: Swiper;

export let app: HTMLDivElement;
export let bgContainer: HTMLDivElement;
export let menuEl: HTMLDivElement;
export let menuCityList: HTMLUListElement;
export let cityListEl: HTMLDivElement;
export let showCity: HTMLDivElement;
export let updateLocation: HTMLElement;

function installApp() {
  const installAppEl = <HTMLButtonElement>(
    document.getElementById("install-app")
  );
  if (window.standalone && window.TOUCH) {
    menuCityList.classList.add("menu__city-list_standalone");
  }
  window.addEventListener("beforeinstallprompt", (event) => {
    if (window.standalone) {
      event.preventDefault();
    }
    window.deferredPrompt = <BeforeInstallPromptEvent>event;
    installAppEl.style.display = "block";
  });
  installAppEl.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      installAppEl.style.display = "none";
      return;
    }
    if (
      Object.hasOwnProperty.call(promptEvent, "prompt") &&
      Object.hasOwnProperty.call(promptEvent, "userChoice")
    ) {
      await promptEvent.prompt();
      await promptEvent.userChoice;
    }
    window.deferredPrompt = <BeforeInstallPromptEvent>(<unknown>null);
    installAppEl.style.display = "none";
  });

  window.addEventListener("appinstalled", () => {
    window.deferredPrompt = <BeforeInstallPromptEvent>(<unknown>null);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(
        "https://rodionbgd.github.io/weather_test/sw.js"
      );
    });
  }
}
export function createSwiper() {
  // const originLocation = window.location.origin;

  mainSwiper = new Swiper(".swiper", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    watchOverflow: true,
    // history: {
    //     key: "city",
    //     root: originLocation,
    // },
  });
  mainSwiper.on("slideChange", () => {
    const { cities } = store.getState();
    const currentSlide = <HTMLElement>cityListEl.children[mainSwiper.realIndex];
    const currentCity = cities.filter(
      (city) => city.name === currentSlide.dataset.name
    )[0];
    const imgList = Array.from(bgContainer.children);
    const isSameWeather = imgList.filter(
      (el) =>
        el.className === `bg-${currentCity.weather.current.weather[0].icon}`
    ).length;
    if (isSameWeather) {
      return;
    }
    Array.from(bgContainer.children as unknown as HTMLDivElement[]).forEach(
      (img) => {
        img.classList.toggle("hidden");
        img.classList.remove("default-bg");
        if (img.classList.contains("hidden")) {
          img.style.setProperty("opacity", "0");
        } else {
          img.style.setProperty("opacity", "1");
          img.setAttribute(
            "class",
            `bg-${currentCity.weather.current.weather[0].icon}`
          );
        }
      }
    );
  });
}

export function initializeElements() {
  app = <HTMLDivElement>document.getElementById("app");
  bgContainer = <HTMLDivElement>document.getElementById("bg-container");
  menuEl = <HTMLDivElement>document.getElementById("menu");
  menuCityList = <HTMLUListElement>document.getElementById("menu-city-list");
  cityListEl = <HTMLDivElement>document.getElementById("city-list");
  showCity = <HTMLDivElement>document.getElementById("show-last-city");
  updateLocation = <HTMLElement>document.getElementById("update-location");
  installApp();
  addGoogleScript();
  listeners();
  if (window.TOUCH) {
    createSwiper();
  }
}
