import { getAll } from '../../api/http';
import { handlerPopUp } from '../../utils/popup';
import type { CameraCardResponseDTO, CameraCard } from './../../types/pets';
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

    const sidebar = root.querySelector<HTMLElement>(".wrapper-side-bar");
    if (!sidebar) return;

    sidebar.addEventListener("transitionend", () => updateViewportHeight(), {
      once: true,
    });
    requestAnimationFrame(() => updateViewportHeight());
  });

  window.addEventListener("resize", updateViewportHeight);
  updateViewportHeight();
}

export async function initSadeBar() {
    const sideBarWrapper = document.querySelector<HTMLElement>(".out-slider");

    if (!sideBarWrapper) return;
    sideBarWrapper.innerHTML = `
    <div class="wrapper-side-bar">
                    <div class="header-side-bar">
                        <div class="wrapper-cam">
                            <h4>Live</h4>
                            <img src="/assets/icons/cam.png" alt="icon cam">
                        </div>
                        <button class="site-bar-btn">
                            <span class="btn-content">&#8249;&#8249;</span>
                        </button>
                    </div>
                    <div class="side-bar-viewport">
                        <div class="track-side-bar">
                            <span class="loader active zoos-bar"></span>
                        </div>
                    </div>
                    <div class="footer-side-bar">
                        <button class="site-bar-btn">
                            <span class="btn-content">&#8249;</span>
                        </button>
                    </div>
    </div>
    `;

    try {
        const sliderData = await getAll<CameraCardResponseDTO>("cameras");
        renderSliderCards(sliderData.data);
    } catch (error) {
        if (error instanceof Error) {
            await handlerPopUp("error");
            const track = document.querySelector<HTMLElement>(".track-side-bar");
            if (track) track.innerHTML = `
                <div class="wrapper-error"><p lang="en">${error.message}</p></div>`
        }
    }
}


function renderSliderCards(data: CameraCard[]) {
    const root = document.querySelector<HTMLElement>(".wrapper-side-bar");
     const track = document.querySelector<HTMLElement>(".track-side-bar");
    
      if (!track) return;
    
    const slides = data.map((petInfo) => {
          return `
                            <div class="side-bar-slide">
                                <div class="side-bar-icon-container">
                                    <span class="wrapper-icon">
                                        <img src="/assets/icons/Panda.png" alt="animal icon">
                                    </span>
                                </div>

                                <div class="side-bar-content">
                                    <p>"${petInfo.text}"</p>
                                </div>
                            </div>
          `;
        })
        .join("");
    track.innerHTML = slides;
    initSideBarSlider(root);
}
      