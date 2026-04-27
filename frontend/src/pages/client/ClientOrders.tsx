import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";

interface Order {
  id: number;
  order_number: string;
  product: string;
  theme: string;
  delivery: string;
  amount: number;
  status: string;
  created_at: string;
}

function ClientOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) { setLoading(false); return; }
    const { email } = JSON.parse(user);
    fetch(`http://localhost:5000/api/orders/client/${email}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "paid") return { bg: "#e6f7ee", color: "#1f9d57", label: "Payée" };
    if (status === "pending") return { bg: "#fff4e5", color: "#e67e22", label: "En attente" };
    return { bg: "#eee", color: "#666", label: status };
  };

  const fmt = (n: number) => Number(n).toFixed(2).replace(".", ",") + "€";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <ClientLayout>
      <h1 style={{ fontSize: 28, color: "#3d3a6d", fontWeight: 800 }}>Mes commandes</h1>

      <div style={{ background: "#fff", borderRadius: 20, padding: 24, marginTop: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        {loading ? (
          <p style={{ color: "#7a7699", textAlign: "center", padding: "32px" }}>Chargement...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: "#7a7699", textAlign: "center", padding: "32px" }}>Aucune commande pour l'instant.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#8a86a3", fontSize: "14px" }}>
                <th style={{ padding: "12px 8px" }}>Numéro</th>
                <th style={{ padding: "12px 8px" }}>Produit</th>
                <th style={{ padding: "12px 8px" }}>Thème</th>
                <th style={{ padding: "12px 8px" }}>Date</th>
                <th style={{ padding: "12px 8px" }}>Montant</th>
                <th style={{ padding: "12px 8px" }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const s = getStatusColor(o.status);
                return (
                  <tr key={o.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "14px 8px", color: "#3d3a6d", fontWeight: 700 }}>#{o.order_number}</td>
                    <td style={{ padding: "14px 8px", color: "#3d3a6d" }}>{o.product}</td>
                    <td style={{ padding: "14px 8px", color: "#7a7699" }}>{o.theme}</td>
                    <td style={{ padding: "14px 8px", color: "#7a7699" }}>{formatDate(o.created_at)}</td>
                    <td style={{ padding: "14px 8px", color: "#3d3a6d", fontWeight: 700 }}>{fmt(o.amount)}</td>
                    <td style={{ padding: "14px 8px" }}>
                      <span style={{ background: s.bg, color: s.color, padding: "6px 12px", borderRadius: 999, fontWeight: 600, fontSize: "13px" }}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </ClientLayout>
  );
}

export default ClientOrders;
