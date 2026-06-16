import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchAllUsers } from "../../api/auth";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  orderCount: number;
}

function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllUsers()
      .then((data) => setClients(Array.isArray(data) ? data : []))
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter((c) =>
    search === "" ||
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des clients</h2>
            <p className="admin-page__header-subtitle">
              Consultez la liste des clients et leur activité sur la plateforme.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <div className="admin-page__filters-mb">
            <input
              placeholder="Rechercher un client..."
              className="admin-page__search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-table-wrapper">
            {loading ? (
              <p className="admin-page__status-msg">Chargement...</p>
            ) : filtered.length === 0 ? (
              <p className="admin-page__status-msg">Aucun client trouvé.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Nom</th>
                    <th className="admin-table__th">Email</th>
                    <th className="admin-table__th">Commandes</th>
                    <th className="admin-table__th">Inscrit le</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client) => (
                    <tr key={client.id}>
                      <td className="admin-table__td">{client.first_name} {client.last_name}</td>
                      <td className="admin-table__td">{client.email}</td>
                      <td className="admin-table__td">
                        <span className={client.orderCount > 0 ? "badge badge--active" : "badge badge--default"}>
                          {client.orderCount} commande{client.orderCount !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="admin-table__td">
                        {new Date(client.created_at).toLocaleDateString("fr-FR")}
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

export default AdminClients;
