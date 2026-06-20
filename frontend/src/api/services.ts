import { API_URL } from "./client";

export async function fetchAllServices() {
  const res = await fetch(`${API_URL}/api/services`);
  return res.json();
}

export async function createService(data: object) {
  const res = await fetch(`${API_URL}/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateService(id: number, data: object) {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteService(id: number) {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
