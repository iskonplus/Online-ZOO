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
