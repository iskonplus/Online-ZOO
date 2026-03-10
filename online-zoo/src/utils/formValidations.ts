import type { Validator } from "../types/validator";

export const validateLogin: Validator = (value) => {
  if (value === "") return "Required field";
  if (value.length < 3) return "Login must be at least 3 characters";
  if (!/^[A-Za-z]/.test(value)) return "Login must start with a letter";
  if (!/^[A-Za-z]+$/.test(value)) return "Only English letters allowed";
  return "";
};
export const validateName: Validator = (value) => {
  if (value === "") return "Required field";
  if (value.length < 3) return "Name must be at least 3 characters";
  if (!/^[A-Za-z]+$/.test(value)) return "Only English letters allowed";
  return "";
};

export const validateEmail: Validator = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === "") return "Required field";
  if (!regex.test(value)) return "Invalid email";
  return "";
};

export const validatePassword: Validator = (value) => {
  if (value === "") return "Required field";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
    return "Password must contain a special character";
  return "";
};

export const validateConfirmPassword: Validator = (value) => {
  const passwordInput = document.querySelector<HTMLInputElement>("#password")!;
  if (value === "") return "Required field";
  if (value !== passwordInput.value) return "Passwords do not match";
  return "";
};
