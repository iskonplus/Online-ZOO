import { getUser } from "./authStorage";
import { handlerPopUp } from "./popup";

const donateVolunteersBtn = document.querySelector<HTMLElement>(
  ".footer .glass-light-btn",
);
const donateBtns = document.querySelectorAll<HTMLElement>("#donate-btn");

const burgerBtn = document.querySelector<HTMLElement>(".burger");
const menu = document.querySelector<HTMLElement>(".header ul");
const menuLink = document.querySelector<HTMLElement>(".header ul li");
const authBtn = document.querySelector<HTMLElement>(".loginIcon");

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

  authBtn?.addEventListener("click", async (): Promise<void> => {
    const user = getUser();
    if (user) {
      await handlerPopUp("user-profile");
      const userNameElement = document.querySelector<HTMLElement>(
        ".user-profile .user-content-name",
      );
      const userEmailElement = document.querySelector<HTMLElement>(
        ".user-profile .user-content-email",
      );
      if (userNameElement) userNameElement.textContent = user.name;
      if (userEmailElement) userEmailElement.textContent = user.email;
    }
    if (!user) handlerPopUp("auth");
    
  });
}
