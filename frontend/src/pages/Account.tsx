import Layout from "../components/Layout";
import Container from "../components/Container";

function Account() {
  const orders = [
    {
      title: "Pack d'images",
      status: "Livré",
      date: "12 mars 2026",
      amount: "29,90€",
    },
    {
      title: "Album Photo",
      status: "En cours",
      date: "08 mars 2026",
      amount: "49,90€",
    },
  ];

  return (
    <Layout>
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #fffdfd 0%, #f8f5ff 100%)",
          padding: "70px 0 90px",
        }}
      >
        <Container>
          <div style={{ marginBottom: "34px" }}>
            <p
              style={{
                margin: "0 0 8px",
                color: "#f0aa16",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              PetitsRêves
            </p>

            <h1
              style={{
                margin: "0 0 10px",
                color: "#3d3a6d",
                fontSize: "42px",
                fontWeight: 800,
              }}
            >
              Mon compte
            </h1>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Consultez vos informations personnelles et suivez vos commandes.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Profil */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
                border: "1px solid #efe9fb",
              }}
            >
              <div
                style={{
                  width: "82px",
                  height: "82px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: 800,
                  marginBottom: "18px",
                }}
              >
                A
              </div>

              <h2
                style={{
                  margin: "0 0 6px",
                  color: "#3d3a6d",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                Audrey KAMGA
              </h2>

              <p
                style={{
                  margin: "0 0 20px",
                  color: "#7a7699",
                  fontSize: "15px",
                }}
              >
                audreytatiana@gmail.com
              </p>

              <div style={{ display: "grid", gap: "14px", marginBottom: "22px" }}>
                <InfoRow label="Téléphone" value="06 12 34 56 78" />
                <InfoRow label="Ville" value="Paris" />
                <InfoRow label="Membre depuis" value="Janvier 2026" />
              </div>

              <button
                style={{
                  width: "100%",
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
                Modifier mon profil
              </button>
            </div>

            {/* Commandes */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
                border: "1px solid #efe9fb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#3d3a6d",
                    fontSize: "28px",
                    fontWeight: 800,
                  }}
                >
                  Mes commandes
                </h2>

                <button
                  style={{
                    background: "#fff",
                    color: "#6d67a0",
                    border: "1px solid #ddd4f2",
                    borderRadius: "14px",
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Voir tout
                </button>
              </div>

              <div style={{ display: "grid", gap: "16px" }}>
                {orders.map((order) => (
                  <OrderCard
                    key={`${order.title}-${order.date}`}
                    title={order.title}
                    status={order.status}
                    date={order.date}
                    amount={order.amount}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#faf8ff",
        borderRadius: "14px",
        padding: "12px 14px",
      }}
    >
      <p
        style={{
          margin: "0 0 4px",
          color: "#8f89b2",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          color: "#3d3a6d",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function OrderCard({
  title,
  status,
  date,
  amount,
}: {
  title: string;
  status: string;
  date: string;
  amount: string;
}) {
  const statusStyle =
    status === "Livré"
      ? { background: "#ebfff1", color: "#1f9d57" }
      : { background: "#eef5ff", color: "#3973d6" };

  return (
    <div
      style={{
        border: "1px solid #eee8fb",
        borderRadius: "18px",
        padding: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h3
          style={{
            margin: "0 0 8px",
            color: "#3d3a6d",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#7a7699",
            fontSize: "14px",
          }}
        >
          Commandé le {date}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            ...statusStyle,
          }}
        >
          {status}
        </span>

        <strong
          style={{
            color: "#3d3a6d",
            fontSize: "16px",
          }}
        >
          {amount}
        </strong>

        <button
          style={{
            background: "#fff",
            color: "#6d67a0",
            border: "1px solid #ddd4f2",
            borderRadius: "999px",
            padding: "8px 14px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Détails
        </button>
      </div>
    </div>
  );
}

export default Account;