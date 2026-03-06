const html: HTMLElement = document.documentElement;

let isPopUpHidden: boolean = true;
let isLoaded: boolean = false;

let popUp: HTMLElement | null;
let popUpBtnClose: HTMLElement | null;
let popUpContent: HTMLElement | null;

let htmlPopup: string;

async function loadPopup(): Promise<void> {
  const response: Response = await fetch("../popup/popup.html");
  htmlPopup = await response.text();
}

export async function handlerPopUp(selector: string): Promise<void> {
  if (!isLoaded) {
    if (!htmlPopup) {
      await loadPopup();
    }

    document.body.insertAdjacentHTML("beforeend", htmlPopup);

    popUp = document.querySelector<HTMLElement>(".pop-up-container");
    popUpBtnClose = document.querySelector<HTMLElement>(".modal__close");
    popUpContent = document.querySelector<HTMLElement>(
      `.wrapper-content-pop-up.${selector}`,
    );

    if (popUpBtnClose) {
      popUpBtnClose.addEventListener(
        "click",
        () => void handlerPopUp(selector),
      );
    }

    isLoaded = true;
  }

  if (!popUp) return;

  if (isPopUpHidden) {
    popUp.classList.add("open");
    html.classList.add("no-scroll");
    popUpContent?.classList.add("active");
    isPopUpHidden = false;
  } else {
    popUp.classList.remove("open");
    html.classList.remove("no-scroll");
    popUpContent?.classList.remove("active");
    isPopUpHidden = true;
  }
}
