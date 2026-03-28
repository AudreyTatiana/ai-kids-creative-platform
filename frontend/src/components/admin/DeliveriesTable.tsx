function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "14px 16px",
        color: "#6d67a0",
        fontSize: "14px",
        fontWeight: 800,
        borderBottom: "1px solid #eee8fb",
      }}
    >
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "14px 16px",
        color: "#4f4a76",
        fontSize: "15px",
        borderBottom: "1px solid #f2eefb",
      }}
    >
      {children}
    </td>
  );
}

function DeliveryStatusBadge({ status }: { status: string }) {
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
        padding: "6px 12px",
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

const tableButtonStyle: React.CSSProperties = {
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
};

function DeliveriesTable() {
  const deliveries = [
    {
      customer: "Sophie Martin",
      address: "14 rue Victor Hugo, Paris",
      product: "Album Photo",
      tracking: "TRK-45891",
      status: "Expédiée",
    },
    {
      customer: "Nadia Benali",
      address: "22 avenue de la Gare, Lyon",
      product: "Histoire personnalisée",
      tracking: "TRK-45892",
      status: "En préparation",
    },
    {
      customer: "Julie Bernard",
      address: "8 rue des Fleurs, Lille",
      product: "Album Photo",
      tracking: "TRK-45877",
      status: "Livrée",
    },
  ];

  return (
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
        Suivi des livraisons à domicile
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#faf8ff" }}>
              <TableHeader>Client</TableHeader>
              <TableHeader>Adresse</TableHeader>
              <TableHeader>Produit</TableHeader>
              <TableHeader>Suivi</TableHeader>
              <TableHeader>Statut livraison</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={`${delivery.customer}-${delivery.tracking}`}>
                <TableCell>{delivery.customer}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>{delivery.product}</TableCell>
                <TableCell>{delivery.tracking}</TableCell>
                <TableCell>
                  <DeliveryStatusBadge status={delivery.status} />
                </TableCell>
                <TableCell>
                  <button style={tableButtonStyle}>Mettre à jour</button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DeliveriesTable;