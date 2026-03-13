import { initHandlerBtns } from "../../utils/handlerBtns";
import { initRegisteredUser } from "../../utils/initUser";
import { initSlider } from "../../utils/slider";
import { initSideBarSlider } from "./initSideBarSlider";

const root = document.querySelector<HTMLElement>(".wrapper-side-bar");
const zoosSection = document.querySelector<HTMLElement>(".zoos");

document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initSlider(zoosSection);
  initRegisteredUser();
  initSideBarSlider(root);
});
