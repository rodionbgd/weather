let shiftX = 0;

export default class Slider {
  constructor(elem, options) {
    this.options = options;
    this.elem = elem;
    this.sliderElem = {};
  }

  removeSlider() {
    if (window.TOUCH || !this.sliderElem) {
      return;
    }
    this.sliderElem.parentNode.removeChild(this.sliderElem);
  }

  createSlider() {
    let sliderInnerHTML = "";
    for (let i = 1; i < 25; i += 1) {
      sliderInnerHTML += `<div class="wrap">
                                    <p>${new Date(
                                      this.options[i].dt * 1000
                                    ).getHours()}:00</p>`;
      if (this.options[i].pop > 0.45) {
        sliderInnerHTML += `<p>${Math.round(this.options[i].pop * 100)}%</p>`;
      } else {
        sliderInnerHTML += `<p>&nbsp;</p>`;
      }
      sliderInnerHTML += `<img src="./icons/${
        this.options[i].weather[0].icon
      }_icon.png" alt="">
                       <p>${Math.round(this.options[i].temp - 273.15)}°</p>
                                </div>`;
    }
    if (window.TOUCH) {
      const section = document.getElementById("slider");
      section.innerHTML = "";
      section.dataset.name = this.options.name;
      section.insertAdjacentHTML("afterbegin", sliderInnerHTML);
      return;
    }
    const section = document.createElement("section");
    section.dataset.name = this.elem.dataset.name;
    section.classList.add("slider");
    section.id = "slider_d";
    section.insertAdjacentHTML("afterbegin", sliderInnerHTML);
    document.body.insertAdjacentElement("afterbegin", section);
    const coords = this.elem.getBoundingClientRect();
    let left = coords.left + (coords.width - section.offsetWidth) / 2;
    let top = coords.top + window.pageYOffset - section.offsetHeight - 5;
    if (left + section.offsetWidth > window.innerWidth)
      left = window.innerWidth - section.offsetWidth - 5;
    if (top < 5) top = 5;
    section.style.left = `${left}px`;
    section.style.top = `${top}px`;
  }

  renderSlider() {
    const slider = document.getElementById("slider_d");
    if (!slider) return;
    const coords = slider.getBoundingClientRect();
    const sliderLeftBound = slider.offsetLeft;
    const sliderRightBound = coords.right;

    function preventDefault() {
      return false;
    }

    slider.addEventListener("selectstart", preventDefault);
    slider.addEventListener("dragstart", preventDefault);
    slider.addEventListener("pointerdown", (e) => {
      if (window.TOUCH) return;
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
          item.style.left = `${pageX - shiftX}px`; // eslint-disable-line  no-param-reassign
        });
      }

      function onPointerMove(event) {
        dX = event.pageX - startX;
        moveAt(event.pageX);
      }

      function endMove() {
        document.removeEventListener("pointermove", onPointerMove);
        slider.removeEventListener("scroll", preventDefault);
        document.addEventListener("pointerup", endMove);
      }

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", endMove);

      moveAt(e.pageX);
    });
    this.sliderElem = slider;
  }
}
