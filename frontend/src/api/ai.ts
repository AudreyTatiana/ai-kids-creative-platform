import { API_URL } from "./client";

/** Génération IA avec JSON (AIStudio) */
export async function generateAIImages(theme: string) {
  const res = await fetch(`${API_URL}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme }),
  });
  return { res, data: await res.json() };
}

/** Génération IA avec FormData (ThemeSelection — upload fichier) */
export async function generateAIWithFormData(formData: FormData) {
  const res = await fetch(`${API_URL}/api/ai/generate`, {
    method: "POST",
    body: formData,
  });
  return { res, data: await res.json() };
}
