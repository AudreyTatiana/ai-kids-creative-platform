import AdminLayout from "../../components/admin/AdminLayout";

function AdminClients() {
  const clients = [
    {
      id: "#CLI-001",
      name: "Marie Dupont",
      email: "marie.dupont@email.com",
      phone: "06 12 34 56 78",
      orders: 3,
      status: "Actif",
    },
    {
      id: "#CLI-002",
      name: "Sophie Martin",
      email: "sophie.martin@email.com",
      phone: "06 98 45 21 33",
      orders: 5,
      status: "Actif",
    },
    {
      id: "#CLI-003",
      name: "Nadia Benali",
      email: "nadia.benali@email.com",
      phone: "07 55 12 89 44",
      orders: 1,
      status: "Inactif",
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
              Gestion des clients
            </h2>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              Consultez la liste des clients et leur activité sur la plateforme.
            </p>
          </div>

          <button style={primaryButtonStyle}>Ajouter un client</button>
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
                placeholder="Rechercher un client..."
                style={inputStyle}
              />
              <select style={inputStyle}>
                <option>Tous les statuts</option>
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>

            <button style={secondaryButtonStyle}>Exporter</button>
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
                  <TableHeader>Nom</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Téléphone</TableHeader>
                  <TableHeader>Commandes</TableHeader>
                  <TableHeader>Statut</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.orders}</TableCell>
                    <TableCell>
                      <ClientStatusBadge status={client.status} />
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "nowrap",
                          alignItems: "center",
                        }}
                      >
                        <button style={tableButtonStyle}>Voir</button>
                        {client.status === "Actif" ? (
                          <button style={warningButtonStyle}>Désactiver</button>
                        ) : (
                          <button style={successButtonStyle}>Réactiver</button>
                        )}
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
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function ClientStatusBadge({ status }: { status: string }) {
  const isActive = status === "Actif";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: isActive ? "#ebfff1" : "#fff1f1",
        color: isActive ? "#1f9d57" : "#c0392b",
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
  whiteSpace: "nowrap",
};

const warningButtonStyle: React.CSSProperties = {
  background: "#fff7e8",
  color: "#d48a00",
  border: "1px solid #f3dfb6",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const successButtonStyle: React.CSSProperties = {
  background: "#ebfff1",
  color: "#1f9d57",
  border: "1px solid #ccefd8",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export default AdminClients;