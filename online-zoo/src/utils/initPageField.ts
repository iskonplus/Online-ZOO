import type { FieldConfig } from "../types/validator";
import { initFormValidation } from "../utils/initFormValidation";
import {
  validateLogin,
  validatePassword,
  validateName,
  validateEmail,
  validateConfirmPassword,
} from "../utils/formValidations";

export function initPageRegistrationField(): void {
  const fields: FieldConfig[] = [
    {
      input: document.querySelector<HTMLInputElement>("#login")!,
      error: document.querySelector<HTMLElement>("#login + .incorrect-data")!,
      validator: validateLogin,
    },
    {
      input: document.querySelector<HTMLInputElement>("#name")!,
      error: document.querySelector<HTMLElement>("#name + .incorrect-data")!,
      validator: validateName,
    },
    {
      input: document.querySelector<HTMLInputElement>("#email")!,
      error: document.querySelector<HTMLElement>("#email + .incorrect-data")!,
      validator: validateEmail,
    },
    {
      input: document.querySelector<HTMLInputElement>("#password")!,
      error: document.querySelector<HTMLElement>(
        "#password + .incorrect-data",
      )!,
      validator: validatePassword,
    },
    {
      input: document.querySelector<HTMLInputElement>("#confirmPassword")!,
      error: document.querySelector<HTMLElement>(
        "#confirmPassword + .incorrect-data",
      )!,
      validator: validateConfirmPassword,
    },
  ];

  initFormValidation(fields);
}

export function initPageSignInField(): void {
  const fields: FieldConfig[] = [
    {
      input: document.querySelector<HTMLInputElement>("#login")!,
      error: document.querySelector<HTMLElement>("#login + .incorrect-data")!,
      validator: validateLogin,
    },
    {
      input: document.querySelector<HTMLInputElement>("#password")!,
      error: document.querySelector<HTMLElement>(
        "#password + .incorrect-data",
      )!,
      validator: validatePassword,
    },
  ];

  initFormValidation(fields);
}

export function updateButtonState(fields: FieldConfig[]): void {
  const submitBtn = document.querySelector<HTMLButtonElement>("#btnSubmit");
  const isValid = fields.every(({ input, validator }) => {
    return validator(input.value.trim()) === "";
  });

  if (submitBtn) submitBtn.disabled = !isValid;
}
