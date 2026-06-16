import { API_URL } from "./client";
import type { CartItem } from "../context/CartContext";

const BASE = `${API_URL}/api/cart`;

export async function fetchCart(userId: number) {
  const res = await fetch(`${BASE}/${userId}`);
  return { res, data: await res.json() };
}

export async function addCartItem(userId: number, item: Omit<CartItem, "_id">) {
  const res = await fetch(`${BASE}/${userId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return { res, data: await res.json() };
}

export async function removeCartItem(userId: number, itemId: string) {
  const res = await fetch(`${BASE}/${userId}/item/${itemId}`, {
    method: "DELETE",
  });
  return { res, data: await res.json() };
}

export async function clearCartItems(userId: number) {
  const res = await fetch(`${BASE}/${userId}/clear`, { method: "DELETE" });
  return { res, data: await res.json() };
}
