import type { FieldConfig } from "../types/validator";
import { updateButtonState } from "./initPageField";

export function initFormValidation(fields: FieldConfig[]): void {
  fields.forEach(({ input, error, validator }): void => {
    input.addEventListener("blur", validate);
    input.addEventListener("input", validate);
    input.addEventListener("focus", ()=> input.classList.remove("invalid"));

    function validate(): void {
      const errorMessage = validator(input.value.trim());

      if (errorMessage) input.classList.add("invalid");
      if (!errorMessage) input.classList.remove("invalid");

        error.textContent = errorMessage;
        updateButtonState(fields);
    }
  });
}
