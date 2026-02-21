const wrapper = document.querySelector(".wrapper-slider");
const viewport = wrapper.querySelector(".slider__viewport");
const track = wrapper.querySelector(".slider__track");
const arrows = document.querySelector(".wrapper-slider-arrows");

let index = 0;
let step = 0;
let maxIndex = 0;

const SLIDE_MS = 350;

function getStep() {
  const slides = track.children;
  const styles = getComputedStyle(track);
  const rows =
    styles.display === "grid" ? styles.gridTemplateRows.split(" ").length : 1;

  if (slides.length <= rows) return slides[0].offsetWidth;

  return slides[rows].offsetLeft - slides[0].offsetLeft;
}

function recalc() {
  const slide = track.querySelector(".slider__slide");
  if (!slide) return;

  step = getStep() || slide.offsetWidth;

  const styles = getComputedStyle(track);
  const rows =
    styles.display === "grid" ? styles.gridTemplateRows.split(" ").length : 1;

  const totalColumns = Math.ceil(track.children.length / rows);
  const visibleColumns = Math.max(1, Math.round(viewport.offsetWidth / step));

  maxIndex = Math.max(0, totalColumns - visibleColumns);

  if (index > maxIndex) index = maxIndex;

  track.style.transition = "none";
  track.style.transform = `translateX(${-index * step}px)`;
}

function move(dir) {
  const next = index + dir;
  const base = index * step;

  track.style.transition = `transform ${SLIDE_MS}ms ease`;
  track.style.transform = `translateX(${-next * step}px)`;

  if (next < 0 || next > maxIndex) {
    setTimeout(() => {
      track.style.transition = "transform 250ms ease";
      track.style.transform = `translateX(${-base}px)`;
    }, 250);
    return;
  }

  index = next;
}
arrows.addEventListener("click", (e) => {
  if (e.target.closest(".left")) move(-1);
  if (e.target.closest(".right")) move(1);
});

window.addEventListener("resize", recalc);

recalc();
