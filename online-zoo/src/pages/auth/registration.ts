import type {
  RegistrationRequestDTO,
  RegistrationResponseDTO,
} from "../../types/auth";

import { initHandlerBtns } from "../../utils/handlerBtns";
import { initPageRegistrationField } from "../../utils/initPageField";
import { post } from "../../api/http";

const submitBtn = document.querySelector<HTMLButtonElement>("#btnSubmit");

document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initPageRegistrationField();
  submitBtn?.addEventListener("click", (e) => handleSubmit(e));
});

function handleSubmit(e: Event): void {
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

  postUser(data);
}

async function postUser( data: RegistrationRequestDTO): Promise<void> {
  const res = await post<RegistrationResponseDTO, RegistrationRequestDTO>("auth/register", data);
  console.log(res);
}
