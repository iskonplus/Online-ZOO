import { initSlider } from "/pages/helpers/slider.js";

initSlider(document.querySelector(".meet"));
initSlider(document.querySelector(".our-users"));

const burgerBtn = document.querySelector(".burger");
const menu = document.querySelector(".header ul");
const menuLink = document.querySelector(".header ul li");

burgerBtn.addEventListener("click", () => handlerBurgerBtn());

function handlerBurgerBtn() {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
}

menuLink.addEventListener("click", () => handlerBurgerBtn());

let popUpBtn;
let popUp;
let isLoaded = false;

const makeDonateBtns = document.querySelectorAll(
  ".footer .glass-light-btn, .block-welcome-footer button, .content-wrapper-pay .orange-btn"
);

const html = document.documentElement;
let isPopUpHidden = true;

const response = await fetch("../popup/popup.html");
const htmlPopup = await response.text();

makeDonateBtns.forEach((btn) => {
  btn.addEventListener("click", () => handlerPopUp());
});

function handlerPopUp() {
  if (!isLoaded) {
    document.body.insertAdjacentHTML("beforeend", htmlPopup);

    popUp = document.querySelector(".pop-up-container");
    popUpBtn = document.querySelector(".modal__close");

    popUpBtn.addEventListener("click", handlerPopUp);

    isLoaded = true;
  }

  if (isPopUpHidden) {
    popUp.classList.add("open");
    html.classList.add("no-scroll");
    isPopUpHidden = false;
  } else {
    popUp.classList.remove("open");
    html.classList.remove("no-scroll");
    isPopUpHidden = true;
  }
}


const leaveFeedBackBtn = document.querySelector(".our-users .glass-light-btn");

leaveFeedBackBtn.addEventListener("click", () =>
  window.location.assign("/pages/contact/contact.html#contact-form"),
);
