import { initHandlerBtns } from "../../utils/handlerBtns";
import { initSlider } from "../../utils/slider";

const zoosSection = document.querySelector<HTMLElement>(".zoos");

document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initSlider(zoosSection);
});
