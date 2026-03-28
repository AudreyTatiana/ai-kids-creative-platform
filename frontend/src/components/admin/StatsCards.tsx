function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "22px",
        boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
        border: "1px solid #efe9fb",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: "#7a7699",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {title}
      </p>
      <h3
        style={{
          margin: "0 0 6px",
          color: "#3d3a6d",
          fontSize: "32px",
          fontWeight: 800,
        }}
      >
        {value}
      </h3>
      <p
        style={{
          margin: 0,
          color: "#9a95b6",
          fontSize: "14px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function StatsCards() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "18px",
      }}
    >
      <StatCard title="Commandes" value="128" subtitle="Ce mois-ci" />
      <StatCard title="Produits actifs" value="12" subtitle="Catalogue" />
      <StatCard title="Thèmes actifs" value="8" subtitle="Disponibles" />
      <StatCard title="Livraisons à domicile" value="17" subtitle="À suivre" />
    </section>
  );
}

export default StatsCards;