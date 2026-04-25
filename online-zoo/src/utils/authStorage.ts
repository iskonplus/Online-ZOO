import type { PublicUser } from "../types/user";

const tokenKey = "access_token";
const userKey = "user";


export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem(tokenKey));
}

export function getToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function getUser(): PublicUser | null {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

export function saveAuth(token: string, user: unknown): void {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}