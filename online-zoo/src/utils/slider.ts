let track: HTMLElement;
let arrows: HTMLElement;

let isAnimating = false;
const slideMs = 350;

export function initSlider(root: HTMLElement | null): void {
  if (!root) return;

  const trackElement = root.querySelector<HTMLElement>(".slider__track");
  const arrowsElement = root.querySelector<HTMLElement>(
    ".wrapper-slider-arrows",
  );

  if (!trackElement || !arrowsElement) return;

  track = trackElement;
  arrows = arrowsElement;

  arrows.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".left")) handleSlide("left");
    if (target.closest(".right")) handleSlide("right");
  });
}

function setTrackPosition(position: number, durationMs: number): void {
  track.style.transition = durationMs
    ? `transform ${durationMs}ms ease`
    : "none";
  track.style.transform = `translateX(${position}px)`;
}

function animateSlides(direction: "left" | "right"): void {
  const step = getStep();
  if (!step) return;

  if (direction === "left") {
    setTrackPosition(-step, 0);
    void track.offsetHeight;
    setTrackPosition(0, slideMs);
  }

  if (direction === "right") {
    setTrackPosition(-step, slideMs);
  }

  window.setTimeout(() => {
    if (direction === "right") setTrackPosition(0, 0);
    isAnimating = false;
  }, slideMs);
}

function getRowsCount(): number {
  const styles = getComputedStyle(track);
  const rows = styles.gridTemplateRows;

  if (!rows || rows === "none") return 1;

  return rows.split(" ").length;
}

function moveSlides(direction: "left" | "right"): void {
  const rowsCount = getRowsCount();

  for (let index = 0; index < rowsCount; index += 1) {
    if (direction === "right") {
      const firstSlide = track.firstElementChild;
      if (firstSlide) track.append(firstSlide);
    } else {
      const lastSlide = track.lastElementChild;
      if (lastSlide) track.prepend(lastSlide);
    }
  }
}

function handleSlide(direction: "left" | "right"): void {
  if (isAnimating) return;

  isAnimating = true;

  if (direction === "left") {
    moveSlides("left");
    animateSlides("left");
  }

  if (direction === "right") {
    animateSlides("right");
    window.setTimeout(() => moveSlides("right"), slideMs);
  }
}

function getGapSize(): number {
  const styles = getComputedStyle(track);
  const gap = styles.columnGap || styles.gap;
  return gap && gap !== "normal" ? parseFloat(gap) : 0;
}

function getStep(): number {
  const firstSlide = track.firstElementChild as HTMLElement | null;
  if (!firstSlide) return 0;

  return firstSlide.getBoundingClientRect().width + getGapSize();
}
