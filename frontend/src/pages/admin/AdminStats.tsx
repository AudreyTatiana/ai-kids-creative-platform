import AdminLayout from "../../components/admin/AdminLayout";

function AdminStats() {
  const topProducts = [
    { name: "Album Photo", sales: 42 },
    { name: "Pack d'images", sales: 35 },
    { name: "Histoire personnalisée", sales: 21 },
  ];

  const topThemes = [
    { name: "Conte", uses: 38 },
    { name: "Super-héros", uses: 27 },
    { name: "Pirate", uses: 18 },
  ];

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
              Statistiques
            </h2>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              Analysez l’activité générale de la plateforme et les performances des produits.
            </p>
          </div>

          <button style={primaryButtonStyle}>Exporter le rapport</button>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "18px",
          }}
        >
          <StatCard title="Commandes totales" value="128" subtitle="Toutes périodes" />
          <StatCard title="Chiffre d'affaires" value="4 290€" subtitle="Cumulé" />
          <StatCard title="Clients actifs" value="67" subtitle="Ce mois-ci" />
          <StatCard title="Livraisons à domicile" value="17" subtitle="À suivre" />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
              border: "1px solid #efe9fb",
            }}
          >
            <h3
              style={{
                margin: "0 0 18px",
                color: "#3d3a6d",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Produits les plus vendus
            </h3>

            <div style={{ display: "grid", gap: "16px" }}>
              {topProducts.map((product) => (
                <ProgressRow
                  key={product.name}
                  label={product.name}
                  value={product.sales}
                  max={50}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
              border: "1px solid #efe9fb",
            }}
          >
            <h3
              style={{
                margin: "0 0 18px",
                color: "#3d3a6d",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Thèmes les plus utilisés
            </h3>

            <div style={{ display: "grid", gap: "16px" }}>
              {topThemes.map((theme) => (
                <ProgressRow
                  key={theme.name}
                  label={theme.name}
                  value={theme.uses}
                  max={40}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
          }}
        >
          <h3
            style={{
              margin: "0 0 18px",
              color: "#3d3a6d",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            Résumé analytique
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
            }}
          >
            <InsightCard
              title="Produit dominant"
              value="Album Photo"
              description="C’est actuellement le produit le plus demandé par les clients."
            />
            <InsightCard
              title="Thème favori"
              value="Conte"
              description="Le thème Conte reste le plus populaire sur la plateforme."
            />
            <InsightCard
              title="Canal principal"
              value="Livraison email"
              description="La majorité des commandes restent dématérialisées."
            />
            <InsightCard
              title="Point de vigilance"
              value="Livraisons physiques"
              description="Les livraisons à domicile nécessitent un suivi administratif plus poussé."
            />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

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

function ProgressRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          gap: "12px",
        }}
      >
        <span
          style={{
            color: "#3d3a6d",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {label}
        </span>

        <span
          style={{
            color: "#7a7699",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#eee8fb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #6f8fff 0%, #9c8cff 100%)",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}

function InsightCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#faf8ff",
        border: "1px solid #eee8fb",
        borderRadius: "18px",
        padding: "18px",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: "#8f89b2",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {title}
      </p>

      <h4
        style={{
          margin: "0 0 8px",
          color: "#3d3a6d",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        {value}
      </h4>

      <p
        style={{
          margin: 0,
          color: "#7a7699",
          fontSize: "14px",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

export default AdminStats;