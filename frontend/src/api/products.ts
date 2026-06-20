import { API_URL } from "./client";

export async function fetchAllProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
}

export async function createProduct(data: object) {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id: number, data: object) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
