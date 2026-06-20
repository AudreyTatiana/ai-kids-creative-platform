import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientLayout from "../../components/client/ClientLayout";
import { fetchClientOrders } from "../../api/orders";
import "./ClientOrders.css";

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
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setDebugInfo("Aucun utilisateur connecté (localStorage vide)");
      setLoading(false);
      return;
    }
    const parsed = JSON.parse(stored);
    const email = parsed?.email;
    setDebugInfo(`Email utilisé : ${email}`);
    console.log("[ClientOrders] Email utilisé :", email);

    fetchClientOrders(email)
      .then((data) => {
        console.log("[ClientOrders] Réponse API :", data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setDebugInfo(`Email : ${email} | Réponse API non-tableau : ${JSON.stringify(data)}`);
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("[ClientOrders] Erreur fetch :", err);
        setDebugInfo(`Erreur réseau : ${err.message}`);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status: string) => {
    if (status === "paid") return "order-status-badge order-status-badge--paid";
    if (status === "pending") return "order-status-badge order-status-badge--pending";
    return "order-status-badge order-status-badge--default";
  };

  const getStatusLabel = (status: string) => {
    if (status === "paid") return "Payée";
    if (status === "pending") return "En attente";
    return status;
  };

  const fmt = (n: number) => Number(n).toFixed(2).replace(".", ",") + "€";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <ClientLayout>
      <h1 className="client-orders__title">Mes commandes</h1>

      <div className="client-orders__table-wrapper">
        {loading ? (
          <p className="client-orders__loading">Chargement...</p>
        ) : orders.length === 0 ? (
          <div>
            <p className="client-orders__empty">Aucune commande pour l'instant.</p>
            {debugInfo && (
              <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", padding: "8px" }}>
                Debug : {debugInfo}
              </p>
            )}
          </div>
        ) : (
          <table className="client-orders__table">
            <thead className="client-orders__thead">
              <tr>
                <th>Numéro</th>
                <th>Produit</th>
                <th>Thème</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Réalisation</th>
              </tr>
            </thead>
            <tbody className="client-orders__tbody">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="client-orders__td--number">#{o.order_number}</td>
                  <td className="client-orders__td--product">{o.product}</td>
                  <td className="client-orders__td--muted">{o.theme}</td>
                  <td className="client-orders__td--muted">{formatDate(o.created_at)}</td>
                  <td className="client-orders__td--amount">{fmt(o.amount)}</td>
                  <td>
                    <span className={getStatusClass(o.status)}>
                      {getStatusLabel(o.status)}
                    </span>
                  </td>
                  <td>
                    {o.status === "paid" ? (
                      <Link
                        to={`/realisation/${o.order_number}`}
                        className="client-orders__realisation-btn"
                      >
                        ✨ Voir ma réalisation
                      </Link>
                    ) : (
                      <span className="client-orders__realisation-disabled">
                        En attente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ClientLayout>
  );
}

export default ClientOrders;
