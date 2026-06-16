import { useEffect, useState } from "react";
import { fetchOrderStats } from "../../api/orders";
import "./StatsCards.css";

interface Stats {
  totalOrders: number;
  physicalDeliveries: number;
  activeProducts: number;
  activeThemes: number;
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
      <p className="stat-card__subtitle">{subtitle}</p>
    </div>
  );
}

function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchOrderStats()
      .then((data) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  return (
    <section className="stats-cards">
      <StatCard
        title="Commandes"
        value={stats ? String(stats.totalOrders) : "—"}
        subtitle="Toutes périodes"
      />
      <StatCard
        title="Produits actifs"
        value={stats ? String(stats.activeProducts) : "—"}
        subtitle="Catalogue"
      />
      <StatCard
        title="Thèmes actifs"
        value={stats ? String(stats.activeThemes) : "—"}
        subtitle="Disponibles"
      />
      <StatCard
        title="Livraisons à domicile"
        value={stats ? String(stats.physicalDeliveries) : "—"}
        subtitle="À suivre"
      />
    </section>
  );
}

export default StatsCards;
