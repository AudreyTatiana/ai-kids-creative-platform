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

function StatusBadge({ status }: { status: string }) {
  let background = "#eef1ff";
  let color = "#5d6fe4";

  if (status === "Payée") {
    background = "#ebfff1";
    color = "#1f9d57";
  }

  if (status === "En attente") {
    background = "#fff7e8";
    color = "#d48a00";
  }

  if (status === "En cours") {
    background = "#eef5ff";
    color = "#3973d6";
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

function DeliveryBadge({ mode }: { mode: string }) {
  const isHome = mode === "Domicile";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: isHome ? "#fff1f1" : "#eef5ff",
        color: isHome ? "#c0392b" : "#3973d6",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      {mode}
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

function OrdersTable() {
  const orders = [
    {
      customer: "Marie Dupont",
      product: "Pack d'images",
      delivery: "Email",
      status: "En attente",
      amount: "29,90€",
      action: "Détails",
    },
    {
      customer: "Sophie Martin",
      product: "Album Photo",
      delivery: "Domicile",
      status: "Payée",
      amount: "49,90€",
      action: "Voir",
    },
    {
      customer: "Nadia Benali",
      product: "Histoire personnalisée",
      delivery: "Domicile",
      status: "En cours",
      amount: "39,90€",
      action: "Suivre",
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
        <h3
          style={{
            margin: 0,
            color: "#3d3a6d",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          Commandes
        </h3>

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
          Télécharger
        </button>
      </div>

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
              <TableHeader>Produit</TableHeader>
              <TableHeader>Livraison</TableHeader>
              <TableHeader>Statut</TableHeader>
              <TableHeader>Montant</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={`${order.customer}-${order.product}`}>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>
                  <DeliveryBadge mode={order.delivery} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <button style={tableButtonStyle}>{order.action}</button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrdersTable;