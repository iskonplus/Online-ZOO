import type { PetCardDTO } from "../../src/types/pets";
import { getAll } from "../../src/api/http";

export async function getPets(): Promise<PetCardDTO[]> {
  const petsCards = await getAll<PetCardDTO[]>("pets");

  return petsCards;
}
