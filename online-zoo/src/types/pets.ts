export interface PetCard {
  id: number;
  name: string;
  commonName: string;
  description: string;
}
export interface PetsResponseDTO {
  data: PetCard[];
}
export interface CameraCard {
  id: number;
  petId: number;
  text: string;
}
export interface CameraCardResponseDTO {
  data: CameraCard[];
}

export interface PetInfo{
    id: number;
    commonName: string;
    scientificName: string;
    type: string;
    size: string;
    diet: string;
    habitat: string;
    range: string;
    latitude: string;
    longitude: string;
    description: string;
    detailedDescription: string;
}
export interface PetInfoResponseDTO{
  data: PetInfo;
}
