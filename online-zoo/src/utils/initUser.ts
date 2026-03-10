import { getUser } from "./authStorage";

export function initRegisteredUser(): void {
  const userNameElement = document.querySelector<HTMLElement>(".user-auth-name");

  if (!userNameElement) return;
  const user = getUser();
  if (!user) return;

  userNameElement.textContent = user.name;
}