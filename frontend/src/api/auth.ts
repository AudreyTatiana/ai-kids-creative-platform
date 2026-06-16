import { API_URL } from "./client";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return { res, data: await res.json() };
}

export async function registerUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { res, data: await res.json() };
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return { res, data: await res.json() };
}

export async function resetPassword(token: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  return { res, data: await res.json() };
}

export async function fetchAllUsers() {
  const res = await fetch(`${API_URL}/api/auth/users`);
  return res.json();
}
