export default function addGoogleScript() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://maps.googleapis.com/maps/api/js" +
    "?key=AIzaSyAn2Y3016zA45aXTVje33h3ztuXUPREkyg&libraries=places" +
    "&callback=googleAutoComplete";
  document.head.append(script);
}

export function preload(opacity: number) {
  const loading = <HTMLDivElement>document.getElementById("loading");
  let timerStepMs = 50;
  if (!window.TOUCH) {
    timerStepMs = 50;
  }
  if (opacity <= 0) {
    loading.style.display = "none";
  } else {
    loading.style.opacity = `${opacity}`;
    setTimeout(() => {
      preload(opacity - 0.1);
    }, timerStepMs);
  }
}

export function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
