import type { PetCard, PetsResponseDTO } from "../../types/pets";
import { getAll } from "../../api/http";
import { handlerPopUp } from "../../utils/popup";
import { initSlider } from "../../utils/slider";
import { petImages } from "../../data/petImages";

const metSection = document.querySelector<HTMLElement>(".meet");
const storKey = "pet-images";
const contextIssue = `<div class="wrapper-issue">
                        <p id="issue">Something went wrong. Please,
                        <a href="" id="refresh-page-link">refresh</a>
                        the page.</p>
                      </div>`;

export function initPetImagesStorage(): void {
  const existing = localStorage.getItem(storKey);
  if (!existing) localStorage.setItem(storKey, JSON.stringify(petImages));
}

export async function initPetsSlider() {
  const loader = document.querySelector<HTMLElement>(".loader.meet");

  if (!loader) return;
  loader.classList.add("active");

  try {
    const petsInfo = await getAll<PetsResponseDTO>("pets");
    await renderCards(petsInfo.data);
    initSlider(metSection);
  } catch (error) {
    loader.classList.remove("active");
    if (error instanceof Error) console.error(error.message);
    handlerPopUp("error");
    if (metSection) {
      metSection.insertAdjacentHTML("afterbegin", contextIssue);
    }
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
        <li class="slider__slide" data-petId="${petInfo.id}">
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
