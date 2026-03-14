import { getAll, getById } from "../../api/http";
import { handlerPopUp } from "../../utils/popup";
import type {
  CameraCardResponseDTO,
  CameraCard,
  PetInfoResponseDTO,
  PetInfo,
} from "../../types/pets";
import { getPetIconById, getPetImageById } from "../../utils/imageStorage";
import { animalVideosId } from "../../data/petImages";

export function initSidebarSlider(root: HTMLElement | null): void {
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

    // sidebar.addEventListener("transitionend", () => updateViewportHeight(), {
    //   once: true,
    // });
    requestAnimationFrame(() => updateViewportHeight());
  });

  window.addEventListener("resize", updateViewportHeight);
  updateViewportHeight();
}

export async function generateSidebar() {
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
    renderSidebarCards(sliderData.data);
  } catch (error) {
    if (error instanceof Error) {
      await handlerPopUp("error");
      const track = document.querySelector<HTMLElement>(".track-side-bar");
      if (track)
        track.innerHTML = `
                <div class="wrapper-error"><p lang="en">${error.message}</p></div>`;
    }
  }

  generateSection("1");
  generateVideo(1);
}

function renderSidebarCards(data: CameraCard[]) {
  const root = document.querySelector<HTMLElement>(".wrapper-side-bar");
  const track = document.querySelector<HTMLElement>(".track-side-bar");

  if (!track) return;

  const slides = data
    .map((petInfo) => {
      return `
                            <div class="side-bar-slide ${petInfo.petId === 1 ? "active" : ""}" data-pet-id="${petInfo.petId}">
                                <div class="side-bar-icon-container">
                                    <span class="wrapper-icon">
                                        <img src=${getPetIconById(petInfo.petId)} alt="animal icon">
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
  initSidebarSlider(root);
}

export async function generateSection(id: string): Promise<void> {
  const titleAnimal = document.querySelector<HTMLElement>(".title-animal");
  const loader = document.querySelector<HTMLElement>(".loader.did-you-now");
  if (!titleAnimal || !loader) return;
  loader.classList.add("active");

  try {
    const animalData = await getById<PetInfoResponseDTO>("pets", `${id}`);
    titleAnimal.textContent = `live ${animalData.data.commonName} cams`;
    renderSection(animalData.data);
  } catch (error) {
    if (error instanceof Error) {
      const section = document.querySelector<HTMLElement>(
        ".wrapper-did-you-now",
      );
      if (!section) return;
      section.innerHTML = `
                <div class="wrapper-error"><p lang="en">${error.message}</p></div>`;
    }
  } finally {
    loader.classList.remove("active");
  }
}

function renderSection(animalData: PetInfo) {
  const section = document.querySelector<HTMLElement>(".wrapper-did-you-now");
  if (!section) return;

  section.innerHTML = `
  <div class="container did-you-now">
                <div class="block-did-you-now">
                    <h3>did you know?</h3>
                    <p>${animalData.description}</p>
                </div>

                <div class="wrapper-description-animal">

                    <div class="block-description animal">
                        <div class="wrap-description">
                            <h3>Common name:</h3><small>${animalData.commonName}</small>
                        </div>
                        <div class="wrap-description">
                            <h3>Scientific name:</h3><small>${animalData.scientificName}</small>
                        </div>
                        <div class="wrap-description">
                            <h3>Type:</h3><small>${animalData.type}</small>
                        </div>
                        <div class="wrap-description">
                            <h3>Size:</h3><small>${animalData.size}</small>
                        </div>
                        <div class="wrap-description">
                            <h3>Diet:</h3><small>${animalData.diet}</small>
                        </div>
                        <div class="wrap-description">
                            <h3>Habitat:</h3><small>${animalData.habitat}</small>
                        </div>
                        <div class="wrap-description">

                            <h3>Range:</h3><small>${animalData.range}</small> <button class="glass-btn">VIEW map
                                <img src="/assets/icons/arrow-orange.png" alt="arrow icon" class="arrow">
                            </button>
                        </div>

                    </div>
                    <div class="block-description photo">
                        <img src="${getPetImageById(animalData.id)}" alt="photo animal">
                    </div>

                </div>
                <p class="animal-article">${animalData.detailedDescription}</p>
            </div>
  `;
}

export function renderSelectedPet(event: Event) {
  const activeCard = document.querySelector<HTMLElement>(
    ".side-bar-slide.active",
  );
  const element = (event.target as HTMLElement).closest(".side-bar-slide");

  if (!(element instanceof HTMLElement)) return;

  const petId = element.dataset.petId;
  if (!petId) return;

  generateSection(petId);
  generateVideo(+petId);

  if (!activeCard) return;
  activeCard.classList.remove("active");
  element.classList.add("active");
}

export function generateVideo(petId: number): void {
  const iframe = document.querySelector<HTMLIFrameElement>(".main-video");
  const slides = document.querySelectorAll<HTMLElement>(".zoos .slider__slide");

  if (!iframe || !slides.length) return;
  slides.forEach((slide, index) => {
    const videoId = animalVideosId[petId]?.[index];
    if (!videoId) return;

    const previewImage = slide.querySelector<HTMLImageElement>(".video-preview");
    if (!previewImage) return;

      if (index === 0) {
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        slides[index]?.classList.add("active");
    } 
    
    previewImage.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    slide.dataset.videoId = videoId;

  });
}

export function initVideoSlider(): void {
  const track = document.querySelector<HTMLElement>(".zoos .slider__track");
  const iframe = document.querySelector<HTMLIFrameElement>(".main-video");

  if (!track || !iframe) return;

  track.addEventListener("click", (event) => {
    const slide = (event.target as HTMLElement).closest<HTMLElement>(".slider__slide");
    if (!slide) return;

    const videoId = slide.dataset.videoId;
    if (!videoId) return;

    iframe.src = `https://www.youtube.com/embed/${videoId}`;

    track
      .querySelectorAll<HTMLElement>(".slider__slide")
      .forEach((el) => el.classList.remove("active"));

    slide.classList.add("active");
  });
}