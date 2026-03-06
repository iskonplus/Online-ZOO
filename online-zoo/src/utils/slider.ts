export function initSlider(root: HTMLElement | null): void {
  if (!root) return;

  const trackElement = root.querySelector<HTMLElement>(".slider__track");
  const viewportElement = root.querySelector<HTMLElement>(".slider__viewport");
  const arrowsElement = root.querySelector<HTMLElement>(".wrapper-slider-arrows");

  if (!trackElement || !viewportElement || !arrowsElement) return;

  const track = trackElement;
  const viewport = viewportElement;
  const arrows = arrowsElement;

  const slideMs = 350;

  let step = 0;
  let position = 0;
  let maxTranslate = 0;

  function parsePx(value: string | null): number {
    if (!value || value === "normal") return 0;
    return parseFloat(value);
  }

  function getGapSize(): number {
    const computedStyles = getComputedStyle(track);
    return (
      parsePx(computedStyles.columnGap) ||
      parsePx(computedStyles.gap) ||
      0
    );
  }

  function calculateStep(): number {
    const firstSlide = track.children[0] as HTMLElement | undefined;
    if (!firstSlide) return 0;

    const slideWidth = firstSlide.getBoundingClientRect().width;

    return Math.round(slideWidth + getGapSize());
  }

  function applyTransform(translateValue: number, durationMs: number): void {
    track.style.transition = durationMs
      ? `transform ${durationMs}ms ease`
      : "none";

    track.style.transform = `translateX(${-translateValue}px)`;
  }

  function render(nextPosition: number, durationMs = slideMs): void {
    position = nextPosition;
    applyTransform(position, durationMs);
  }

  function recalc(): void {
    step = calculateStep();
    if (!step) return;

    maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);

    position = Math.min(position, maxTranslate);
    applyTransform(position, 0);
  }

  function move(direction: number): void {
    if (!step) return;

    let nextPosition = position + direction * step;

    if (nextPosition > maxTranslate) nextPosition = 0;
    if (nextPosition < 0) nextPosition = maxTranslate;

    render(nextPosition);
  }

  arrows.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(".left")) move(-1);
    if (target.closest(".right")) move(1);
  });

  window.addEventListener("resize", recalc);

  recalc();
}