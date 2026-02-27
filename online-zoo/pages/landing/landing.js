import { initSlider } from "/pages/helpers/slider.js";

initSlider(document.querySelector(".meet"));
initSlider(document.querySelector(".our-users"));

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.header ul');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  menu.classList.toggle('active');
});