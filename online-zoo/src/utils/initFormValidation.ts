import type { FieldConfig } from "../types/validator";

export function initFormValidation(fields: FieldConfig[]): void {
  fields.forEach(({ input, error, validator }) => {
    input.addEventListener("blur", () => {
      input.classList.add("invalid");
      validate();
    });

    input.addEventListener("input", validate);

    function validate(): void {
      const message = validator(input.value.trim());

      if (message) {
          input.classList.add("invalid");
          error.textContent = message;
    } else {
        input.classList.remove("invalid");
          error.textContent = "";
      }
    }
  });
}
