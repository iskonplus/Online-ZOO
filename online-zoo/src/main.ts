import { initPetImagesStorage, initPetsSlider } from "../pages/landing/pet";
import { initFeedBackSlider } from "../pages/landing/feedBack";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
});
