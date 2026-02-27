import { initSlider } from "/pages/helpers/slider.js";

initSlider(document.querySelector(".meet"));
initSlider(document.querySelector(".our-users"));

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.header ul');
const menuLink = document.querySelector('.header ul li');

burgerBtn.addEventListener('click', () => handlerBurgerBtn());

function handlerBurgerBtn() {
      burgerBtn.classList.toggle('active');
  menu.classList.toggle('active');
}

menuLink.addEventListener('click', () => handlerBurgerBtn());