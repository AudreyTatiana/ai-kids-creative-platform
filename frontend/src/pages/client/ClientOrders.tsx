import ClientLayout from "../../components/client/ClientLayout";

function ClientOrders() {
  const orders = [
    {
      id: "#CMD-001",
      product: "Pack d'images",
      date: "12 Mars 2026",
      price: "29,90€",
      status: "En attente",
    },
    {
      id: "#CMD-002",
      product: "Album Photo",
      date: "10 Mars 2026",
      price: "49,90€",
      status: "Payée",
    },
    {
      id: "#CMD-003",
      product: "Histoire personnalisée",
      date: "05 Mars 2026",
      price: "39,90€",
      status: "Livrée",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Payée") return "#e6f7ee";
    if (status === "En attente") return "#fff4e5";
    if (status === "Livrée") return "#e6f0ff";
    return "#eee";
  };

  return (
    <ClientLayout>
      <h1 style={{ fontSize: 28, color: "#3d3a6d", fontWeight: 800 }}>
        Mes commandes
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 24,
          marginTop: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#8a86a3" }}>
              <th>ID</th>
              <th>Produit</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid #eee" }}>
                <td>{o.id}</td>
                <td>{o.product}</td>
                <td>{o.date}</td>
                <td>{o.price}</td>
                <td>
                  <span
                    style={{
                      background: getStatusColor(o.status),
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
}

export default ClientOrders;