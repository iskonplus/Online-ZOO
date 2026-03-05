import type { PetCardDTO } from "../../types/pets";
import { getAll } from "../../api/http";



export async function getPets(): Promise<PetCardDTO[]> {
    const petsCards = await getAll<PetCardDTO[]>("pets");

    return petsCards;
}