export interface PetCard {
  id: number;
  name: string;
  commonName: string;
  description: string;
}
export interface PetsResponseDTO {
  data: PetCard[];
}
