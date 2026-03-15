import { post } from "../api/http";
import type {
  DonationRequestDTO,
  DonationResponseDTO,
} from "../types/donation";
import { getUser } from "./authStorage";
import { handlerPopUp } from "./popup";

const errorMsg = "Something went wrong. Please, try again later.";

export function initDonationFirst(): void {
  const popup = document.querySelector<HTMLElement>(
    ".wrapper-content-pop-up.first",
  );
  if (!popup) return;

  const amountButtons = popup.querySelectorAll<HTMLButtonElement>(
    ".block-amount .green-btn",
  );

  const otherAmountInput = popup.querySelector<HTMLInputElement>(
    ".wrapper-other-amount input",
  );

  const petSelect = popup.querySelector<HTMLSelectElement>(
    ".wrapper-special select",
  );

  const recurringCheckbox = popup.querySelector<HTMLInputElement>(
    '.wrapper-accept input[type="checkbox"]',
  );

  const nextButton = popup.querySelectorAll<HTMLButtonElement>(
    ".wrapper-pop-up-footer .green-btn",
  )[1];

  if (!amountButtons.length || !otherAmountInput || !petSelect || !nextButton) {
    return;
  }

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

    if (!nextButton) return;
    nextButton.disabled = !(
      isAmountValid &&
      isPetSelected &&
      isCheckboxChecked
    );
  }

  function resetForm(): void {
    selectedAmount = "";
    selectedPet = "";

    clearActiveAmountButtons();

    otherAmountInput.value = "";
    petSelect.selectedIndex = 0;

    if (recurringCheckbox) {
      recurringCheckbox.checked = false;
    }

    updateNextButtonState();
  }

  async function sendDonation(): Promise<void> {
    if (!isValidAmount(selectedAmount) || !selectedPet) return;

    const activeUser = getUser();

    const donationData: DonationRequestDTO = {
      name: activeUser?.name ? activeUser.name : "Guests",
      email: activeUser?.email ? activeUser.email : "user@example.com",
      amount: Number(selectedAmount),
      petId: Number(selectedPet),
    };

    try {
      if (nextButton) nextButton.disabled = true;
      const response = await post<DonationResponseDTO, DonationRequestDTO>(
        "donations",
        donationData,
      );
        
      await handlerPopUp("thanks");
      renderDonationMsg(response);
    } catch (error) {
      console.error("Donation error:", error);
      await handlerPopUp("thanks");
      renderDonationMsg({
        data: { message: errorMsg },
      });
      updateNextButtonState();
    }finally{resetForm()}
  }

  function renderDonationMsg(response: DonationResponseDTO) {
    const msgElement = document.querySelector<HTMLElement>(
      "#thanks-for-donation",
    );
    if (msgElement) msgElement.textContent = `${response.data.message}`;
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

  nextButton.addEventListener("click", async () => {
    await sendDonation();
  });

  updateNextButtonState();
}
