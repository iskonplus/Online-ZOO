import type { PetCard } from "../../src/types/pets";
import type { PetsResponseDTO } from "../../src/types/pets";
import { getAll } from "../../src/api/http";
import { handlerPopUp } from "../../src/utils/popup";
import { initSlider } from "../../src/utils/slider";
import { petImages } from "../../src/data/petImages";

const donateVolunteersBtn = document.querySelector<HTMLElement>(".footer .glass-light-btn")
const metSection = document.querySelector<HTMLElement>(".meet");
const storKey = "pet-images";

export function initPetImagesStorage(): void {
  const existing = localStorage.getItem(storKey);
  if (!existing) localStorage.setItem(storKey, JSON.stringify(petImages));
}

export async function initPetsSlider() {
  const loader = document.querySelector<HTMLElement>(".loader");

  if (!loader) return;
  loader.classList.add("active");

  try {
    const petsInfo = await getAll<PetsResponseDTO>("pets");
    await renderCards(petsInfo.data);
    initSlider(metSection);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    handlerPopUp("error");
  } finally {
    loader.classList.remove("active");
  }
}

async function renderCards(petsData: PetCard[]) {
  const track = document.querySelector<HTMLElement>(
    ".wrapper-slider .slider__track",
  );

  if (!track) return;

  const slides = petsData
    .map((petInfo) => {
      return `
        <li class="slider__slide">
          <a href="/pages/animal/animal.html" class="slider-link">
            <figure>
              <img src=${getPetImageById(petInfo.id)}>
              <h3>${petInfo.name}</h3>
            </figure>
            <h3>${petInfo.commonName}</h3>
            <p>${petInfo.description}</p>
            <span class="glass-btn">VIEW LIVE cam
              <img src="/assets/icons/arrow-orange.png" alt="arrow icon" class="arrow">
            </span>
          </a>
        </li>
      `;
    })
    .join("");

  track.innerHTML = slides;
}

export function getPetImageById(id: number): string {
  const stored = localStorage.getItem(storKey);

  if (!stored) return "";

  const images: Record<number, string> = JSON.parse(stored);

  return images[id] ?? "";
}

donateVolunteersBtn?.addEventListener("click", (): void => {
  handlerPopUp("donate");
  console.log("clicked");
      // if (target.closest(".left")) handleSlide("left")
})

