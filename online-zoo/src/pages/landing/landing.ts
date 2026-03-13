import { initPetsSlider } from "../landing/pet";
import { initFeedBackSlider } from "../landing/feedBack"
import { initHandlerBtns } from "../../utils/handlerBtns";
import { initRegisteredUser } from "../../utils/initUser";
import { initPetImagesStorage } from "../../utils/imageStorage";

document.addEventListener("DOMContentLoaded", (): void => {
   initPetImagesStorage();
   initPetsSlider();
   initFeedBackSlider();
   initHandlerBtns();
   initRegisteredUser();
});
