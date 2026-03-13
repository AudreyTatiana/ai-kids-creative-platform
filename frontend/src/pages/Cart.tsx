import Layout from "../components/Layout";
import Container from "../components/Container";

function Cart() {
  const cartItems = [
    {
      title: "Pack d'images",
      theme: "Conte féerique",
      quantity: 1,
      price: "29,90€",
    },
    {
      title: "Album Photo",
      theme: "Univers magique",
      quantity: 1,
      price: "49,90€",
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
              Mon panier
            </h1>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Retrouvez ici vos créations sélectionnées avant de passer au paiement.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 0.9fr",
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
              }}
            >
              <h2
                style={{
                  margin: "0 0 18px",
                  color: "#3d3a6d",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                Articles
              </h2>

              <div style={{ display: "grid", gap: "16px" }}>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={`${item.title}-${item.theme}`}
                    title={item.title}
                    theme={item.theme}
                    quantity={item.quantity}
                    price={item.price}
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
                position: "sticky",
                top: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0 0 18px",
                  color: "#3d3a6d",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                Résumé
              </h2>

              <div style={{ display: "grid", gap: "14px", marginBottom: "22px" }}>
                <SummaryRow label="Sous-total" value="79,80€" />
                <SummaryRow label="Livraison" value="Gratuite" />
                <SummaryRow label="Réduction" value="-0,00€" />
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee8fb",
                  paddingTop: "18px",
                  marginBottom: "22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
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
                    fontSize: "22px",
                    fontWeight: 800,
                  }}
                >
                  79,80€
                </span>
              </div>

              <button
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: "12px",
                }}
              >
                Passer au paiement
              </button>

              <button
                style={{
                  width: "100%",
                  background: "#fff",
                  color: "#6d67a0",
                  border: "1px solid #ddd4f2",
                  borderRadius: "14px",
                  padding: "12px 18px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function CartItemCard({
  title,
  theme,
  quantity,
  price,
}: {
  title: string;
  theme: string;
  quantity: number;
  price: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #eee8fb",
        borderRadius: "18px",
        padding: "18px",
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: "18px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "120px",
          height: "100px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
        }}
      />

      <div>
        <h3
          style={{
            margin: "0 0 8px",
            color: "#3d3a6d",
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: "0 0 8px",
            color: "#7a7699",
            fontSize: "15px",
          }}
        >
          Thème : {theme}
        </p>

        <span
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "#f6f1ff",
            color: "#8a78c7",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          Quantité : {quantity}
        </span>
      </div>

      <div style={{ textAlign: "right" }}>
        <p
          style={{
            margin: "0 0 12px",
            color: "#3d3a6d",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          {price}
        </p>

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
          Supprimer
        </button>
      </div>
    </div>
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
      <span
        style={{
          color: "#7a7699",
          fontSize: "15px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#3d3a6d",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Cart;