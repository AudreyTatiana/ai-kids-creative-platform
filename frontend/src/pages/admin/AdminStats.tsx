import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchOrderStats } from "../../api/orders";
import "./AdminPage.css";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalClients: number;
  physicalDeliveries: number;
  topProducts: { name: string; sales: number }[];
  topThemes: { name: string; uses: number }[];
}

function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderStats()
      .then((data) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) =>
    Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + "€";

  const maxProducts = stats ? Math.max(...stats.topProducts.map((p) => p.sales), 1) : 1;
  const maxThemes = stats ? Math.max(...stats.topThemes.map((t) => t.uses), 1) : 1;

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Statistiques</h2>
            <p className="admin-page__header-subtitle">
              Analysez l'activité générale de la plateforme et les performances des produits.
            </p>
          </div>
        </header>

        {loading ? (
          <p className="admin-page__status-msg">Chargement...</p>
        ) : !stats ? (
          <p className="admin-page__error-inline">Erreur de chargement des statistiques.</p>
        ) : (
          <>
            <section className="admin-page__stats-row">
              <StatCard title="Commandes totales" value={String(stats.totalOrders)} subtitle="Toutes périodes" />
              <StatCard title="Chiffre d'affaires" value={fmt(stats.totalRevenue)} subtitle="Commandes payées" />
              <StatCard title="Clients uniques" value={String(stats.totalClients)} subtitle="Tous comptes" />
              <StatCard title="Livraisons physiques" value={String(stats.physicalDeliveries)} subtitle="À domicile" />
            </section>

            <section className="stats-bar-section">
              <div className="stats-bar-block">
                <h3 className="stats-bar-block__title">Produits les plus vendus</h3>
                <div className="admin-stats-data-grid">
                  {stats.topProducts.length === 0 ? (
                    <p className="admin-page__no-data">Aucune donnée.</p>
                  ) : stats.topProducts.map((p) => (
                    <ProgressRow key={p.name} label={p.name} value={p.sales} max={maxProducts} />
                  ))}
                </div>
              </div>

              <div className="stats-bar-block">
                <h3 className="stats-bar-block__title">Thèmes les plus utilisés</h3>
                <div className="admin-stats-data-grid">
                  {stats.topThemes.length === 0 ? (
                    <p className="admin-page__no-data">Aucune donnée.</p>
                  ) : stats.topThemes.map((t) => (
                    <ProgressRow key={t.name} label={t.name} value={t.uses} max={maxThemes} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="admin-stat-card">
      <p className="admin-stat-card__label">{title}</p>
      <h3 className="admin-stat-card__value">{value}</h3>
      <p className="admin-stat-card__sub">{subtitle}</p>
    </div>
  );
}

function ProgressRow({ label, value, max }: { label: string; value: number; max: number }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="stats-bar-item">
      <span className="stats-bar-item__label">{label}</span>
      <div className="stats-bar-item__track">
        <div className="stats-bar-item__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="stats-bar-item__count">{value}</span>
    </div>
  );
}

export default AdminStats;
