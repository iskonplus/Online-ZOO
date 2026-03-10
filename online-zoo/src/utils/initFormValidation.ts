import type { FieldConfig } from "../types/validator";

export function initFormValidation(fields: FieldConfig[]): void {
  fields.forEach(({ input, error, validator }): void => {
    input.addEventListener("blur", validate);
    input.addEventListener("input", validate);

    function validate(): void {
      const message = validator(input.value.trim());
      input.classList.add("invalid");

      if (!message) input.classList.remove("invalid");
      error.textContent = message;
    }
      
  });
}
