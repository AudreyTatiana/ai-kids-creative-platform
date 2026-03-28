import AdminLayout from "../../components/admin/AdminLayout";

function AdminPayments() {
  const payments = [
    {
      id: "#PAY-001",
      client: "Marie Dupont",
      order: "#CMD-001",
      method: "Carte bancaire",
      amount: "29,90€",
      status: "Validé",
    },
    {
      id: "#PAY-002",
      client: "Sophie Martin",
      order: "#CMD-002",
      method: "Carte bancaire",
      amount: "49,90€",
      status: "En attente",
    },
    {
      id: "#PAY-003",
      client: "Nadia Benali",
      order: "#CMD-003",
      method: "Carte bancaire",
      amount: "39,90€",
      status: "Échoué",
    },
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
              Gestion des paiements
            </h2>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              Consultez les transactions et suivez l’état des paiements clients.
            </p>
          </div>

          <button style={primaryButtonStyle}>Exporter les paiements</button>
        </header>

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
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                placeholder="Rechercher un paiement..."
                style={inputStyle}
              />
              <select style={inputStyle}>
                <option>Tous les statuts</option>
                <option>Validé</option>
                <option>En attente</option>
                <option>Échoué</option>
              </select>
            </div>

            <button style={secondaryButtonStyle}>Filtrer</button>
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
                  <TableHeader>Référence</TableHeader>
                  <TableHeader>Client</TableHeader>
                  <TableHeader>Commande</TableHeader>
                  <TableHeader>Méthode</TableHeader>
                  <TableHeader>Montant</TableHeader>
                  <TableHeader>Statut</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.client}</TableCell>
                    <TableCell>{payment.order}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button style={tableButtonStyle}>Voir</button>
                        <button style={tableButtonStyle}>Modifier</button>
                        <button style={dangerButtonStyle}>Supprimer</button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

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

function PaymentStatusBadge({ status }: { status: string }) {
  let background = "#eef5ff";
  let color = "#3973d6";

  if (status === "Validé") {
    background = "#ebfff1";
    color = "#1f9d57";
  }

  if (status === "En attente") {
    background = "#fff7e8";
    color = "#d48a00";
  }

  if (status === "Échoué") {
    background = "#fff1f1";
    color = "#c0392b";
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

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #ddd4f2",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};

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

const secondaryButtonStyle: React.CSSProperties = {
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

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

const dangerButtonStyle: React.CSSProperties = {
  background: "#fff5f5",
  color: "#c0392b",
  border: "1px solid #f1d0d0",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
};

export default AdminPayments;