import { initHandlerBtns } from "../../utils/handlerBtns";
import { initRegisteredUser } from "../../utils/initUser";
import { initSlider } from "../../utils/slider";
import { initSadeBar } from "./initSideBarSlider";

const zoosSection = document.querySelector<HTMLElement>(".zoos");

document.addEventListener("DOMContentLoaded", (): void => {
  initRegisteredUser();
  initSadeBar();
  initHandlerBtns();
  initSlider(zoosSection);
});
