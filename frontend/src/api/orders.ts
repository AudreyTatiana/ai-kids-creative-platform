import { API_URL } from "./client";

/** Toutes les commandes (admin) */
export async function fetchAllOrders() {
  const res = await fetch(`${API_URL}/api/orders`);
  return res.json();
}

/** Commandes physiques uniquement (admin livraisons) */
export async function fetchPhysicalOrders() {
  const res = await fetch(`${API_URL}/api/orders/physical`);
  return res.json();
}

/** Statistiques commandes (admin stats) */
export async function fetchOrderStats() {
  const res = await fetch(`${API_URL}/api/orders/stats`);
  return res.json();
}

/** Commandes d'un client par email */
export async function fetchClientOrders(email: string) {
  const res = await fetch(`${API_URL}/api/orders/client/${encodeURIComponent(email)}`);
  return res.json();
}

/** Réalisation IA d'une commande (vérification par email) */
export async function fetchOrderRealisation(orderNumber: string, email: string) {
  const res = await fetch(
    `${API_URL}/api/orders/${orderNumber}/realisation?email=${encodeURIComponent(email)}`
  );
  return res.json();
}
