import type {
  RegistrationRequestDTO,
  RegistrationResponseDTO,
  SignInRequestDTO,
  SignInResponseDTO
} from "../../types/auth";

import { post } from "../../api/http";
import { handlerPopUp } from "../../utils/popup";
import { saveAuth } from "../../utils/authStorage";

export function registerUser(): void {
  const submitBtn = document.querySelector<HTMLButtonElement>("#btnSubmit");
  submitBtn?.addEventListener("click", (e) => {
    submitBtn.disabled = true;
    e.preventDefault();
    const form = document.querySelector<HTMLFormElement>("form");

    if (!form) return;

    const formData = new FormData(form);

    const data: RegistrationRequestDTO = {
      login: String(formData.get("login")),
      password: String(formData.get("password")),
      name: String(formData.get("name")),
      email: String(formData.get("email")),
    };

    postUser<RegistrationRequestDTO, RegistrationResponseDTO>(data, submitBtn, "register");
  });
}

export function signInUser(): void {
  const submitBtn = document.querySelector<HTMLButtonElement>("#btnSubmit");
  submitBtn?.addEventListener("click", (e) => {
    submitBtn.disabled = true;
    e.preventDefault();
    const form = document.querySelector<HTMLFormElement>("form");

    if (!form) return;

    const formData = new FormData(form);

    const data: SignInRequestDTO = {
      login: String(formData.get("login")),
      password: String(formData.get("password")),
    };

    postUser<SignInRequestDTO, SignInResponseDTO>(data, submitBtn, "login");
  });
}

async function postUser<T, B extends RegistrationResponseDTO & SignInResponseDTO>(
  data: T,
  submitBtn: HTMLButtonElement,
  path: string,
): Promise<void> {
  try {
    const res = await post<B, T>(
      `auth/${path}`,
      data,
    );

    saveAuth(res.data.access_token, res.data.user);
    window.location.href = "/pages/landing/index.html";
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      await handlerPopUp("error");
      const errorElement =
        document.querySelector<HTMLElement>(".error-message");
      if (errorElement) errorElement.textContent = error.message;
    }
  } finally {
    submitBtn.disabled = false;
  }
}
