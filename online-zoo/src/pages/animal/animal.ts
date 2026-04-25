import { initHandlerBtns } from "../../utils/handlerBtns";
import { initPetIconStorage } from "../../utils/imageStorage";
import { initRegisteredUser } from "../../utils/initUser";
import { initSlider } from "../../utils/slider";
import { generateSidebar, initVideoSlider, renderSelectedPet } from "./initZoosPage";

const zoosSection = document.querySelector<HTMLElement>(".zoos");

document.addEventListener("DOMContentLoaded", (): void => {
  initRegisteredUser();
  generateSidebar();
  initSlider(zoosSection);
  initHandlerBtns();
  initPetIconStorage();
  initVideoSlider();

  const sidebar = document.querySelector(".track-side-bar");
  sidebar?.addEventListener("click", (e) => renderSelectedPet(e));
});
