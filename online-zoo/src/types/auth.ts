import type { PublicUser } from "./user";

export interface SignInRequestDTO {
  login: string;
  password: string;
}

export interface SignInResponseDTO {
    data: {
        access_token: string;
        user: PublicUser;
    };
    message: string;
}

export interface RegistrationRequestDTO{
    login: string;
    password: string;
    name: string;
    email: string;
}

export interface RegistrationResponseDTO{
    data: {
        access_token: string;
        user: PublicUser;
    };
    message: string;
}