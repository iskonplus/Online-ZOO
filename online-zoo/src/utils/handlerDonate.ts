import { handlerPopUp } from "./popup";

const donateVolunteersBtn = document.querySelector<HTMLElement>(".footer .glass-light-btn");
const donateBtns = document.querySelectorAll<HTMLElement>("#donate-btn");

export function initHandlerDonate() {
  donateVolunteersBtn?.addEventListener("click", (): void => {
    handlerPopUp("donate");
  });
    
  donateBtns?.forEach((btn) => {
    btn.addEventListener("click", (): void => {
      handlerPopUp("first");
    });
  });
}
