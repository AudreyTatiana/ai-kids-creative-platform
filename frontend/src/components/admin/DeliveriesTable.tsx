import { useEffect, useState } from "react";
import { fetchPhysicalOrders } from "../../api/orders";
import "../admin/AdminTable.css";

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  product: string;
  status: string;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="admin-table__th">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="admin-table__td">{children}</td>;
}

function DeliveryStatusBadge({ status }: { status: string }) {
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

function DeliveriesTable() {
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhysicalOrders()
      .then((data) => setDeliveries(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(() => setDeliveries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-table-section">
      <h3 className="admin-table-section__title admin-table-section__title--mb">
        Suivi des livraisons à domicile
      </h3>

      <div className="admin-table-wrapper">
        {loading ? (
          <p className="admin-page__status-msg">Chargement...</p>
        ) : deliveries.length === 0 ? (
          <p className="admin-page__status-msg">Aucune livraison physique pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <TableHeader>Client</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Produit</TableHeader>
                <TableHeader>Statut paiement</TableHeader>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((order) => (
                <tr key={order.id}>
                  <TableCell>{order.first_name} {order.last_name}</TableCell>
                  <TableCell>
                    <span className="admin-table__email-sub">{order.email}</span>
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell><DeliveryStatusBadge status={order.status} /></TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default DeliveriesTable;
