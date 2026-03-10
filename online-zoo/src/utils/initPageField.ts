import type { FieldConfig } from "../types/validator";
import { initFormValidation } from "../utils/initFormValidation";
import {
    validateLogin,
    validatePassword,
    validateName,
    validateEmail,
    validateConfirmPassword
} from "../utils/formValidations";

const submitBtn = document.querySelector<HTMLButtonElement>("#btnSubmit");


export function initPageRegistrationField(): void {

  const fields: FieldConfig[] = [
    {
      input: document.querySelector<HTMLInputElement>("#login")!,
      error: document.querySelector<HTMLElement>("#login + .error")!,
      validator: validateLogin,
    },
    {
      input: document.querySelector<HTMLInputElement>("#name")!,
      error: document.querySelector<HTMLElement>("#name + .error")!,
      validator: validateName,
    },
    {
      input: document.querySelector<HTMLInputElement>("#email")!,
      error: document.querySelector<HTMLElement>("#email + .error")!,
      validator: validateEmail,
    },
    {
      input: document.querySelector<HTMLInputElement>("#password")!,
      error: document.querySelector<HTMLElement>("#password + .error")!,
      validator: validatePassword,
    },
    {
      input: document.querySelector<HTMLInputElement>("#confirmPassword")!,
      error: document.querySelector<HTMLElement>("#confirmPassword + .error")!,
      validator: validateConfirmPassword,
    },
  ];

    initFormValidation(fields);
}

export function updateButtonState(fields: FieldConfig[]): void {
    const isValid = fields.every(({ input, validator }) => {
        return validator(input.value.trim()) === "";
    });

    if (submitBtn) submitBtn.disabled = !isValid;
}




