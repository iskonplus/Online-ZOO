import { handlerPopUp } from "./popup";

const donateVolunteersBtn = document.querySelector<HTMLElement>(
  ".footer .glass-light-btn",
);
const donateBtns = document.querySelectorAll<HTMLElement>("#donate-btn");

const burgerBtn = document.querySelector<HTMLElement>(".burger");
const menu = document.querySelector<HTMLElement>(".header ul");
const menuLink = document.querySelector<HTMLElement>(".header ul li");

export function initHandlerBtns() {
  donateVolunteersBtn?.addEventListener("click", (): void => {
    handlerPopUp("donate");
  });

  donateBtns?.forEach((btn) => {
    btn.addEventListener("click", (): void => {
      handlerPopUp("first");
    });
  });

  burgerBtn?.addEventListener("click", () => handlerBurgerBtn());
  menuLink?.addEventListener("click", () => handlerBurgerBtn());

  function handlerBurgerBtn() {
    burgerBtn?.classList.toggle("active");
    menu?.classList.toggle("active");
  }
}
