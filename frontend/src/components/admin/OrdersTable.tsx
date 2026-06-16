import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/orders";
import "../admin/AdminTable.css";

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  product: string;
  delivery: string;
  status: string;
  amount: number;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="admin-table__th">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="admin-table__td">{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid:       "badge badge--paid",
    pending:    "badge badge--pending",
    processing: "badge badge--inprogress",
    cancelled:  "badge badge--default",
  };
  const labels: Record<string, string> = {
    paid: "Payée", pending: "En attente", processing: "En cours", cancelled: "Annulée",
  };
  return <span className={map[status] ?? "badge badge--default"}>{labels[status] ?? status}</span>;
}

function DeliveryBadge({ mode }: { mode: string }) {
  const isHome = mode !== "email";
  return (
    <span className={isHome ? "badge delivery-badge--home" : "badge delivery-badge--email"}>
      {isHome ? "Domicile" : "Email"}
    </span>
  );
}

function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders()
      .then((data) => setOrders(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => Number(n).toFixed(2).replace(".", ",") + "€";

  return (
    <section className="admin-table-section">
      <div className="admin-table-section__header">
        <h3 className="admin-table-section__title">Dernières commandes</h3>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <p className="admin-page__status-msg">Chargement...</p>
        ) : orders.length === 0 ? (
          <p className="admin-page__status-msg">Aucune commande pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <TableHeader>Client</TableHeader>
                <TableHeader>Produit</TableHeader>
                <TableHeader>Livraison</TableHeader>
                <TableHeader>Statut</TableHeader>
                <TableHeader>Montant</TableHeader>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <TableCell>{order.first_name} {order.last_name}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell><DeliveryBadge mode={order.delivery} /></TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell>{fmt(order.amount)}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default OrdersTable;
