export interface DonationRequestDTO {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export interface DonationResponseDTO {
  data: {
      message: string;
      donationId?: string;
    }
}

