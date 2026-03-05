import { getPets } from "../pages/landing/pet";

document.addEventListener("DOMContentLoaded", (): void => {
  const pets = getPets();

  console.log(pets);
});
