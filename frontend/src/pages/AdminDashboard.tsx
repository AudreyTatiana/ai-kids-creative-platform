import AdminLayout from "../components/admin/AdminLayout";
import StatsCards from "../components/admin/StatsCards";
import OrdersTable from "../components/admin/OrdersTable";
import DeliveriesTable from "../components/admin/DeliveriesTable";
import ThemesTable from "../components/admin/ThemesTable";

function AdminDashboard() {
  return (
    <AdminLayout>
      <div style={{ display: "grid", gap: "24px" }}>
        <header
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "20px 24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 6px",
                color: "#3d3a6d",
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              Vue d’ensemble
            </h2>
            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              Gérez les commandes, produits, thèmes et livraisons de la plateforme.
            </p>
          </div>

          <button
            style={{
              background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "12px 18px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
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