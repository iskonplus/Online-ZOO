import type { AnimalMapData } from "../types/pets";

const petMapKey = "selectedAnimalMapData";

export function saveAnimalMapData(data: AnimalMapData): void {
  const mapData: AnimalMapData = {
    id: data.id,
    commonName: data.commonName,
    latitude: data.latitude,
    longitude: data.longitude,
  };

  localStorage.setItem(petMapKey, JSON.stringify(mapData));
}

export function getAnimalMapData(): AnimalMapData | null {
  const rawData = localStorage.getItem(petMapKey);

  if (!rawData) return null;

  try {
    return JSON.parse(rawData) as AnimalMapData;
  } catch {
    return null;
  }
}