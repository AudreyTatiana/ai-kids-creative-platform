import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchAllOrders } from "../../api/orders";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Order {
  id: number;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  product: string;
  amount: number;
  status: string;
  stripe_session_id?: string;
  created_at: string;
}

function AdminPayments() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");

  useEffect(() => {
    fetchAllOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => Number(n).toFixed(2).replace(".", ",") + "€";

  const statusLabel: Record<string, string> = {
    pending: "En attente",
    paid: "Validé",
    processing: "En cours",
    cancelled: "Échoué",
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      search === "" ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      `${o.first_name} ${o.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const label = statusLabel[o.status] ?? o.status;
    const matchStatus = filterStatus === "Tous" || label === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des paiements</h2>
            <p className="admin-page__header-subtitle">
              Consultez les transactions et suivez l'état des paiements clients.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <div className="admin-page__filters">
            <input
              placeholder="Rechercher un paiement..."
              className="admin-page__search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="admin-page__filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>Tous</option>
              <option>Validé</option>
              <option>En attente</option>
              <option>Échoué</option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            {loading ? (
              <p className="admin-page__status-msg">Chargement...</p>
            ) : filtered.length === 0 ? (
              <p className="admin-page__status-msg">Aucun paiement trouvé.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Référence</th>
                    <th className="admin-table__th">Client</th>
                    <th className="admin-table__th">Produit</th>
                    <th className="admin-table__th">Méthode</th>
                    <th className="admin-table__th">Montant</th>
                    <th className="admin-table__th">Statut</th>
                    <th className="admin-table__th">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order.id}>
                      <td className="admin-table__td">#{order.order_number}</td>
                      <td className="admin-table__td">
                        <div>{order.first_name} {order.last_name}</div>
                        <div className="admin-table__email-sub">{order.email}</div>
                      </td>
                      <td className="admin-table__td">{order.product}</td>
                      <td className="admin-table__td">Carte bancaire (Stripe)</td>
                      <td className="admin-table__td">{fmt(order.amount)}</td>
                      <td className="admin-table__td">
                        <PaymentStatusBadge status={statusLabel[order.status] ?? order.status} />
                      </td>
                      <td className="admin-table__td">
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Validé":     "badge badge--paid",
    "En attente": "badge badge--pending",
    "Échoué":     "badge badge--default",
    "En cours":   "badge badge--inprogress",
  };
  const cls = map[status] ?? "badge badge--default";
  return <span className={cls}>{status}</span>;
}

export default AdminPayments;
