import ClientLayout from "../../components/client/ClientLayout";

function ClientDeliveries() {
  const deliveries = [
    {
      id: "#LIV-001",
      product: "Album Photo",
      date: "12 Mars 2026",
      mode: "Domicile",
      tracking: "TRK-45891",
      status: "Expédiée",
      address: "14 rue Victor Hugo, Paris",
    },
    {
      id: "#LIV-002",
      product: "Histoire personnalisée",
      date: "10 Mars 2026",
      mode: "Domicile",
      tracking: "TRK-45892",
      status: "En préparation",
      address: "22 avenue de la Gare, Lyon",
    },
    {
      id: "#LIV-003",
      product: "Album Photo",
      date: "05 Mars 2026",
      mode: "Domicile",
      tracking: "TRK-45877",
      status: "Livrée",
      address: "8 rue des Fleurs, Lille",
    },
  ];

  return (
    <ClientLayout>
      <div style={{ display: "grid", gap: "24px" }}>
        <header
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "20px 24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
          }}
        >
          <h2
            style={{
              margin: "0 0 6px",
              color: "#3d3a6d",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            Mes livraisons
          </h2>

          <p
            style={{
              margin: 0,
              color: "#7a7699",
              fontSize: "15px",
            }}
          >
            Suivez l’acheminement de vos commandes en livraison à domicile.
          </p>
        </header>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            display: "grid",
            gap: "18px",
          }}
        >
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              style={{
                border: "1px solid #eee8fb",
                borderRadius: "20px",
                padding: "20px",
                background: "#faf8ff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      color: "#3d3a6d",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    {delivery.product}
                  </h3>

                  <p style={metaStyle}>Référence : {delivery.id}</p>
                  <p style={metaStyle}>Date : {delivery.date}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <StatusBadge status={delivery.status} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <InfoCard label="Mode de livraison" value={delivery.mode} />
                <InfoCard label="Numéro de suivi" value={delivery.tracking} />
                <InfoCard label="Adresse" value={delivery.address} />
                <InfoCard label="Statut actuel" value={delivery.status} />
              </div>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#eee8fb",
                  borderRadius: "999px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: getProgressWidth(delivery.status),
                    height: "100%",
                    background: "linear-gradient(90deg, #6f8fff 0%, #9c8cff 100%)",
                    borderRadius: "999px",
                  }}
                />
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#8f89b2",
                  fontSize: "14px",
                }}
              >
                {getStatusMessage(delivery.status)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </ClientLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eee8fb",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
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
          lineHeight: 1.6,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let background = "#eef5ff";
  let color = "#3973d6";

  if (status === "En préparation") {
    background = "#fff7e8";
    color = "#d48a00";
  }

  if (status === "Expédiée") {
    background = "#eef5ff";
    color = "#3973d6";
  }

  if (status === "Livrée") {
    background = "#ebfff1";
    color = "#1f9d57";
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "999px",
        background,
        color,
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

function getProgressWidth(status: string) {
  if (status === "En préparation") return "35%";
  if (status === "Expédiée") return "70%";
  if (status === "Livrée") return "100%";
  return "15%";
}

function getStatusMessage(status: string) {
  if (status === "En préparation") {
    return "Votre commande est en cours de préparation.";
  }

  if (status === "Expédiée") {
    return "Votre commande a été expédiée et est en cours d’acheminement.";
  }

  if (status === "Livrée") {
    return "Votre commande a été livrée avec succès.";
  }

  return "Statut en attente de mise à jour.";
}

const metaStyle: React.CSSProperties = {
  margin: "0 0 4px",
  color: "#7a7699",
  fontSize: "14px",
};

export default ClientDeliveries;