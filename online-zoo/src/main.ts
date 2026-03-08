import { initPetImagesStorage, initPetsSlider } from "../pages/landing/pet";
import { initFeedBackSlider } from "../pages/landing/feedBack";
import { initHandlerBtns } from "./utils/handlerBtns";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
   initHandlerBtns();
});
