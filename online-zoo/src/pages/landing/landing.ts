// import { initPetImagesStorage, initPetsSlider } from "../pages/landing/pet";
// import { initFeedBackSlider } from "../pages/landing/feedBack";
// import { initHandlerBtns } from "./utils/handlerBtns";
import { initPetImagesStorage, initPetsSlider } from "../landing/pet";
import { initFeedBackSlider } from "../landing/feedBack"
import { initHandlerBtns } from "../../utils/handlerBtns";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
   initHandlerBtns();
});
