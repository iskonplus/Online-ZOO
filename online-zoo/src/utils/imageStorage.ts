import { petIcons, petImages } from "../data/petImages";

const storIconKey = "pet-icons";
const storImageKey = "pet-images";


export function initPetIconStorage(): void {
  const existing = localStorage.getItem(storIconKey);
  if (!existing) localStorage.setItem(storIconKey, JSON.stringify(petIcons));
}


export function getPetIconById(id: number): string {
  const stored = localStorage.getItem(storIconKey);
  if (!stored) return "";
  const images: Record<number, string> = JSON.parse(stored);
  return images[id] ?? "";
}


export function initPetImagesStorage(): void {
  const existing = localStorage.getItem(storImageKey);
  if (!existing) localStorage.setItem(storImageKey, JSON.stringify(petImages));
}

export function getPetImageById(id: number): string {
  const stored = localStorage.getItem(storImageKey);
  if (!stored) return "";
  const images: Record<number, string> = JSON.parse(stored);
  return images[id] ?? "";
}