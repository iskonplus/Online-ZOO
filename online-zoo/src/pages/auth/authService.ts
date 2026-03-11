import type {
  RegistrationRequestDTO,
  RegistrationResponseDTO,
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

    postUser(data, submitBtn);
  });
}

async function postUser(
  data: RegistrationRequestDTO,
  submitBtn: HTMLButtonElement,
): Promise<void> {
  try {
    const res = await post<RegistrationResponseDTO, RegistrationRequestDTO>(
      "auth/register",
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
