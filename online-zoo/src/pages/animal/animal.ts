import { initHandlerBtns } from "../../utils/handlerBtns";
import { initRegisteredUser } from "../../utils/initUser";
import { initSlider } from "../../utils/slider";

const zoosSection = document.querySelector<HTMLElement>(".zoos");

document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initSlider(zoosSection);
  initRegisteredUser();
});
