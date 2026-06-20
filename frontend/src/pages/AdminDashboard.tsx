import AdminLayout from "../components/admin/AdminLayout";
import StatsCards from "../components/admin/StatsCards";
import OrdersTable from "../components/admin/OrdersTable";
import DeliveriesTable from "../components/admin/DeliveriesTable";
import ThemesTable from "../components/admin/ThemesTable";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <header className="admin-dashboard__header">
          <div>
            <h2 className="admin-dashboard__title">Vue d'ensemble</h2>
            <p className="admin-dashboard__subtitle">
              Gérez les commandes, produits, thèmes et livraisons de la plateforme.
            </p>
          </div>

          <button className="admin-dashboard__btn">
            Ajouter un élément
          </button>
        </header>

        <StatsCards />
        <OrdersTable />
        <DeliveriesTable />
        <ThemesTable />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
