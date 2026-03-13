export function initSideBarSlider(root: HTMLElement | null): void {
  if (!root) return;

  const viewport = root.querySelector<HTMLElement>(".side-bar-viewport");
  const track = root.querySelector<HTMLElement>(".track-side-bar");
  const nextBtn = root.querySelector<HTMLButtonElement>(
    ".footer-side-bar .site-bar-btn",
  );
  const openMenuBtn = root.querySelector<HTMLButtonElement>(
    ".header-side-bar .site-bar-btn",
  );

  if (!viewport || !track || !nextBtn || !openMenuBtn) return;

  const safeViewport = viewport;
  const safeTrack = track;
  const safeNextBtn = nextBtn;

  let isAnimating = false;
  const slideDuration = 300;
  const visibleSlidesCount = 4;

  function getSlides(): HTMLElement[] {
    return Array.from(
      safeTrack.querySelectorAll<HTMLElement>(".side-bar-slide"),
    );
  }

  function getSlideHeight(): number {
    const slide = safeTrack.querySelector<HTMLElement>(".side-bar-slide");
    return slide ? slide.offsetHeight : 0;
  }

  function updateViewportHeight(): void {
    const slideHeight = getSlideHeight();
    if (!slideHeight) return;

    safeViewport.style.height = `${slideHeight * visibleSlidesCount - 1}px`;
  }

  function moveNext(): void {
    if (isAnimating) return;

    const slides = getSlides();
    const slideHeight = getSlideHeight();

    if (!slides.length || !slideHeight) return;

    isAnimating = true;

    safeTrack.style.transition = `transform ${slideDuration}ms ease`;
    safeTrack.style.transform = `translateY(-${slideHeight}px)`;

    window.setTimeout(() => {
      const firstSlide = slides[0];
      safeTrack.append(firstSlide!);

      safeTrack.style.transition = "none";
      safeTrack.style.transform = "translateY(0)";

      isAnimating = false;
    }, slideDuration);
  }

  safeNextBtn.addEventListener("click", moveNext);
  openMenuBtn.addEventListener("click", () => {
    root.classList.toggle("open-side-bar");

    requestAnimationFrame(() => {
      updateViewportHeight();
    });
  });

  window.addEventListener("resize", updateViewportHeight);
  updateViewportHeight();
}
