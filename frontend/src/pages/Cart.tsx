import { useNavigate } from "react-router-dom";
import ClientLayout from "../components/client/ClientLayout";

function Cart() {
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      title: "Pack d'images",
      theme: "Conte",
      delivery: "Email",
      price: "29,90€",
    },
    {
      id: 2,
      title: "Album Photo",
      theme: "Super-héros",
      delivery: "Domicile",
      price: "49,90€",
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
            Mon panier
          </h2>

          <p
            style={{
              margin: 0,
              color: "#7a7699",
              fontSize: "15px",
            }}
          >
            Consultez vos créations en attente avant validation et paiement.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
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
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: "18px",
                  alignItems: "center",
                  paddingBottom: "18px",
                  borderBottom: "1px solid #f2eefb",
                }}
              >
                <div
                  style={{
                    height: "96px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
                  }}
                />

                <div>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      color: "#3d3a6d",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={metaStyle}>Thème : {item.theme}</p>
                  <p style={metaStyle}>Livraison : {item.delivery}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: "0 0 10px",
                      color: "#3d3a6d",
                      fontSize: "18px",
                      fontWeight: 800,
                    }}
                  >
                    {item.price}
                  </p>

                  <button style={removeButtonStyle}>Retirer</button>
                </div>
              </div>
            ))}
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
              Résumé
            </h3>

            <div style={{ display: "grid", gap: "14px", marginBottom: "18px" }}>
              <SummaryRow label="Articles" value="2" />
              <SummaryRow label="Sous-total" value="79,80€" />
              <SummaryRow label="Frais de livraison" value="0,00€" />
            </div>

            <div
              style={{
                borderTop: "1px solid #eee8fb",
                paddingTop: "18px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#3d3a6d",
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                Total
              </span>

              <span
                style={{
                  color: "#3d3a6d",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                79,80€
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                background: "#f6b93b",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Continuer vers le paiement
            </button>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ color: "#7a7699", fontSize: "15px" }}>{label}</span>
      <span style={{ color: "#3d3a6d", fontSize: "15px", fontWeight: 700 }}>
        {value}
      </span>
    </div>
  );
}

const metaStyle: React.CSSProperties = {
  margin: "0 0 6px",
  color: "#7a7699",
  fontSize: "14px",
};

const removeButtonStyle: React.CSSProperties = {
  background: "#fff5f5",
  color: "#c0392b",
  border: "1px solid #f1d0d0",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
};

export default Cart;