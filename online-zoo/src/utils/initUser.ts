import { getUser } from "./authStorage";

export function initRegisteredUser(): void {
  const userNameElement = document.querySelector<HTMLElement>(".user-auth-name");

  if (!userNameElement) return;
  const user = getUser();
  userNameElement.textContent = user ? user.name : "guest";
}