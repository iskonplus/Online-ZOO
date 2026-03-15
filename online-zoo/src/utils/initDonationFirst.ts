export function initDonationFirst(): void {
  const popup = document.querySelector<HTMLElement>(".wrapper-content-pop-up.first");
  if (!popup) return;

  const amountButtons = popup.querySelectorAll<HTMLButtonElement>(".block-amount .green-btn");
  const otherAmountInput = popup.querySelector<HTMLInputElement>(".wrapper-other-amount input");
  const petSelect = popup.querySelector<HTMLSelectElement>(".wrapper-special select");
  const recurringCheckbox = popup.querySelector<HTMLInputElement>(
    '.wrapper-accept input[type="checkbox"]',
  );
  const nextButton = popup.querySelectorAll<HTMLButtonElement>(
    ".wrapper-pop-up-footer .green-btn",
  )[1];

  if (!amountButtons.length || !otherAmountInput || !petSelect || !nextButton) return;

  let selectedAmount = "";
  let selectedPet = "";

  function isValidAmount(value: string): boolean {
    return /^\d+$/.test(value) && Number(value) > 0;
  }

  function clearActiveAmountButtons(): void {
    amountButtons.forEach((button) => button.classList.remove("is-active"));
  }

  function updateNextButtonState(): void {
    const isAmountValid = isValidAmount(selectedAmount);
    const isPetSelected = selectedPet !== "";
      const isCheckboxChecked = recurringCheckbox?.checked ?? false;
      
      if(nextButton)nextButton.disabled = !(isAmountValid && isPetSelected && isCheckboxChecked);
  }

  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const amount = (button.textContent ?? "").replace(/[^\d]/g, "");
      if (!amount) return;

      selectedAmount = amount;
      otherAmountInput.value = amount;

      clearActiveAmountButtons();
      button.classList.add("is-active");

      updateNextButtonState();
    });
  });

  otherAmountInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (["e", "E", "+", "-", "."].includes(event.key)) {
      event.preventDefault();
    }
  });

  otherAmountInput.addEventListener("input", () => {
    const sanitizedValue = otherAmountInput.value.replace(/[^\d]/g, "");
    otherAmountInput.value = sanitizedValue;

    selectedAmount = sanitizedValue;
    clearActiveAmountButtons();

    updateNextButtonState();
  });

  petSelect.addEventListener("change", () => {
    selectedPet = petSelect.value;
    updateNextButtonState();
  });

  recurringCheckbox?.addEventListener("change", () => {
    updateNextButtonState();
  });

  updateNextButtonState();
}