import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchPhysicalOrders } from "../../api/orders";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Order {
  id: number;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  product: string;
  status: string;
  created_at: string;
}

function AdminDeliveries() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPhysicalOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) =>
    search === "" ||
    o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    `${o.first_name} ${o.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des livraisons</h2>
            <p className="admin-page__header-subtitle">
              Suivez les envois à domicile et mettez à jour les statuts de livraison.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <div className="admin-page__filters-mb">
            <input
              placeholder="Rechercher une livraison..."
              className="admin-page__search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-table-wrapper">
            {loading ? (
              <p className="admin-page__status-msg">Chargement...</p>
            ) : filtered.length === 0 ? (
              <p className="admin-page__status-msg">Aucune livraison physique à afficher.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Référence</th>
                    <th className="admin-table__th">Client</th>
                    <th className="admin-table__th">Téléphone</th>
                    <th className="admin-table__th">Produit</th>
                    <th className="admin-table__th">Statut paiement</th>
                    <th className="admin-table__th">Date commande</th>
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
                      <td className="admin-table__td">{order.phone || "—"}</td>
                      <td className="admin-table__td">{order.product}</td>
                      <td className="admin-table__td">
                        <StatusBadge status={order.status} />
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    paid:       { cls: "badge badge--paid",      label: "Payée" },
    pending:    { cls: "badge badge--pending",   label: "En attente" },
    processing: { cls: "badge badge--inprogress", label: "En cours" },
    cancelled:  { cls: "badge badge--default",   label: "Annulée" },
  };
  const s = map[status] ?? { cls: "badge badge--default", label: status };
  return <span className={s.cls}>{s.label}</span>;
}

export default AdminDeliveries;
