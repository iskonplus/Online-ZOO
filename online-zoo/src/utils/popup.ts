const html: HTMLElement = document.documentElement;
import { logout } from "./authStorage";
import { initRegisteredUser } from "./initUser";
import { initDonationFirst } from "./initDonationFirst";

let isLoaded = false;

let popUp: HTMLElement | null = null;
let popUpBtnClose: HTMLElement | null = null;
let logOutBtn: HTMLElement | null = null;
// let nextBtn: HTMLElement | null = null;

let htmlPopup = "";

async function loadPopup(): Promise<void> {
  const response: Response = await fetch("/popup/popup.html");
  htmlPopup = await response.text();
}

function clearActivePopupContent(): void {
  const popupContents = document.querySelectorAll<HTMLElement>(
    ".wrapper-content-pop-up",
  );

  popupContents.forEach((content) => {
    content.classList.remove("active");
  });
}

function closePopup(): void {
  if (!popUp) return;

  popUp.classList.remove("open");
  html.classList.remove("no-scroll");
  clearActivePopupContent();
}

function logOut(): void {
  logout();
  closePopup();
  initRegisteredUser();
}

export async function handlerPopUp(selector: string): Promise<void> {
  if (!isLoaded) {
    if (!htmlPopup) {
      await loadPopup();
    }

    document.body.insertAdjacentHTML("beforeend", htmlPopup);

    initDonationFirst();

    popUp = document.querySelector<HTMLElement>(".pop-up-container");
    popUpBtnClose = document.querySelector<HTMLElement>(".modal__close");
    logOutBtn = document.querySelector<HTMLElement>(".logOutBtn");
    // nextBtn = document.querySelector<HTMLElement>(".nextStep");

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    });

    if (popUpBtnClose) popUpBtnClose.addEventListener("click", closePopup);
    if (logOutBtn) logOutBtn.addEventListener("click", logOut);
    // if (nextBtn) nextBtn.addEventListener("click", donationStepFirst);
    
    isLoaded = true;
  }

  const popUpContent = document.querySelector<HTMLElement>(
    `.wrapper-content-pop-up.${selector}`,
  );

  if (!popUp || !popUpContent) return;

  clearActivePopupContent();

  popUp.classList.add("open");
  html.classList.add("no-scroll");
  popUpContent.classList.add("active");
}

// function donationStepFirst() {
//   handlerPopUp("thanks")
// }
