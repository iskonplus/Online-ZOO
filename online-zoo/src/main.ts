import { initPetImagesStorage, initPetsSlider } from "../pages/landing/pet";
import { initFeedBackSlider } from "../pages/landing/feedBack";
import { initHandlerDonate } from "./utils/handlerDonate";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
   initHandlerDonate();
});
