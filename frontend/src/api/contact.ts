import { API_URL } from "./client";

export async function sendContactMessage(email: string, message: string) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, message }),
  });
  return { res, data: await res.json() };
}
