import { API_URL } from "./client";

export async function fetchAllThemes() {
  const res = await fetch(`${API_URL}/api/themes`);
  return res.json();
}

export async function createTheme(data: object) {
  const res = await fetch(`${API_URL}/api/themes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTheme(id: number, data: object) {
  const res = await fetch(`${API_URL}/api/themes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTheme(id: number) {
  const res = await fetch(`${API_URL}/api/themes/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
