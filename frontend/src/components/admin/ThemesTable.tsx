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
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: "#ebfff1",
        color: "#1f9d57",
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

function ThemesTable() {
  const catalog = [
    { name: "Pack d'images", category: "Produit", status: "Actif" },
    { name: "Album Photo", category: "Produit", status: "Actif" },
    { name: "Conte", category: "Thème", status: "Actif" },
    { name: "Super-héros", category: "Thème", status: "Actif" },
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
        Gestion des thèmes & produits
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
              <TableHeader>Nom</TableHeader>
              <TableHeader>Catégorie</TableHeader>
              <TableHeader>Statut</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {catalog.map((item) => (
              <tr key={`${item.name}-${item.category}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <button style={tableButtonStyle}>Modifier</button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ThemesTable;