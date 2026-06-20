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
  delivery: string;
  status: string;
  amount: number;
  created_at: string;
}

function AdminOrders() {
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
    paid: "Payée",
    processing: "En cours",
    cancelled: "Annulée",
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
            <h2 className="admin-page__header-title">Gestion des commandes</h2>
            <p className="admin-page__header-subtitle">
              Suivez, filtrez et gérez toutes les commandes clients.
            </p>
          </div>

          <button className="admin-page__btn-primary">Nouvelle commande</button>
        </header>

        <section className="admin-page__content">
          <div className="admin-page__filters">
            <input
              placeholder="Rechercher une commande..."
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
              <option>En attente</option>
              <option>Payée</option>
              <option>En cours</option>
              <option>Annulée</option>
            </select>

            <button className="admin-page__btn-secondary">Exporter</button>
          </div>

          <div className="admin-table-wrapper">
            {loading ? (
              <p className="admin-page__status-msg">Chargement...</p>
            ) : filtered.length === 0 ? (
              <p className="admin-page__status-msg">Aucune commande trouvée.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Référence</th>
                    <th className="admin-table__th">Client</th>
                    <th className="admin-table__th">Produit</th>
                    <th className="admin-table__th">Livraison</th>
                    <th className="admin-table__th">Statut</th>
                    <th className="admin-table__th">Montant</th>
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
                      <td className="admin-table__td">
                        <DeliveryBadge mode={order.delivery} />
                      </td>
                      <td className="admin-table__td">
                        <StatusBadge status={statusLabel[order.status] ?? order.status} />
                      </td>
                      <td className="admin-table__td">{fmt(order.amount)}</td>
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

function StatusBadge({ status }: { status: string }) {
  let badgeClass = "badge badge--default";
  if (status === "Payée") badgeClass = "badge badge--paid";
  if (status === "En attente") badgeClass = "badge badge--pending";
  if (status === "En cours") badgeClass = "badge badge--inprogress";
  return <span className={badgeClass}>{status}</span>;
}

function DeliveryBadge({ mode }: { mode: string }) {
  const badgeClass =
    mode === "Domicile"
      ? "badge delivery-badge--home"
      : "badge delivery-badge--email";
  return <span className={badgeClass}>{mode}</span>;
}

export default AdminOrders;
