import { initPetImagesStorage, initPetsSlider } from "../landing/pet";
import { initFeedBackSlider } from "../landing/feedBack"
import { initHandlerBtns } from "../../utils/handlerBtns";
import { initRegisteredUser } from "../../utils/initUser";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
   initHandlerBtns();
   initRegisteredUser();
});
