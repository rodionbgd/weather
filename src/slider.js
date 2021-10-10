let shiftX = 0;

export default function Slider(options) {
  const { elem } = options;

  function remove() {
    const sliderElem = document.getElementById("slider");
    if (!sliderElem) {
      return;
    }
    sliderElem.parentNode.removeChild(sliderElem);
  }

  function create() {
    let sliderInnerHTML = "";
    for (let i = 1; i < 25; i += 1) {
      sliderInnerHTML += `<div class="wrap">
                                    <p>${new Date(
                                      options.data[i].dt * 1000
                                    ).getHours()}:00</p>`;
      if (options.data[i].pop > 0.45) {
        sliderInnerHTML += `<p>${(options.data[i].pop * 100).toFixed()}%</p>`;
      } else {
        sliderInnerHTML += `<p>&nbsp;</p>`;
      }

      sliderInnerHTML += `<img src="./icons/${
        options.data[i].weather[0].icon
      }_icon.png" alt="">
                       <p>${(options.data[i].temp - 272).toFixed(0)}°</p>
                                </div>`;
    }
    const section = document.createElement("section");
    section.dataset.city = elem.dataset.city;
    section.classList.add("slider");
    section.id = "slider";
    section.insertAdjacentHTML("afterbegin", sliderInnerHTML);
    document.body.insertAdjacentElement("afterbegin", section);
    const coords = elem.getBoundingClientRect();
    let left = coords.left + (coords.width - section.offsetWidth) / 2;
    let top = coords.top + window.pageYOffset - section.offsetHeight - 5;
    if (left + section.offsetWidth > window.innerWidth)
      left = window.innerWidth - section.offsetWidth - 5;
    if (top < 5) top = 5;
    section.style.left = `${left}px`;
    section.style.top = `${top}px`;
  }

  create();

  const slider = document.getElementById("slider");
  if (!slider) return;
  const coords = slider.getBoundingClientRect();
  const sliderLeftBound = slider.offsetLeft;
  const sliderRightBound = coords.right;

  slider.addEventListener("selectstart", (e) => e.preventDefault());
  slider.addEventListener("dragstart", (e) => e.preventDefault());
  slider.addEventListener("pointerdown", (e) => {
    const hourElem = e.target;
    if (!hourElem.closest("div")) {
      return;
    }
    const allHourElements = slider.querySelectorAll("div");
    const startX = e.pageX;
    let dX = 0;
    let dXPrev = 0;
    shiftX =
      e.clientX -
      allHourElements[0].getBoundingClientRect().left +
      sliderLeftBound +
      slider.clientLeft;

    function moveAt(pageX) {
      if (
        (dX < dXPrev &&
          allHourElements[allHourElements.length - 1].getBoundingClientRect()
            .right < sliderRightBound) ||
        (dX > dXPrev &&
          allHourElements[0].getBoundingClientRect().left > sliderLeftBound)
      ) {
        return;
      }
      dXPrev = dX;
      allHourElements.forEach((item) => {
        item.style.left = `${pageX - shiftX}px`;
      });
    }

    function onPointerMove(event) {
      dX = event.pageX - startX;
      moveAt(event.pageX);
    }

    function endMove() {
      document.removeEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", endMove);
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", endMove);

    moveAt(e.pageX);
  });
  this.remove = remove;
  this.sliderElem = slider;
}
