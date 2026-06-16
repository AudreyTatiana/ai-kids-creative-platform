import { API_URL } from "./client";

export interface CreateSessionPayload {
  product: string;
  theme: string;
  delivery: string;
  amount: number;
  customer: unknown;
  generatedImages: unknown;
}

export async function createPaymentSession(payload: CreateSessionPayload) {
  const res = await fetch(`${API_URL}/api/payment/create-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { res, data: await res.json() };
}

export async function confirmPayment(sessionId: string) {
  const res = await fetch(`${API_URL}/api/payment/confirm/${sessionId}`);
  return res.json();
}
