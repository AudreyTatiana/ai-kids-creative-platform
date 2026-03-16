import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

function CheckoutPage() {
  return (
    <Layout>
      <Navbar />

      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)",
          padding: "48px 0 80px",
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "28px",
              padding: "32px",
              boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)",
              border: "1px solid #efe9fb",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#8c84c6",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                Étape 4 : Validation & paiement
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                Finalisez votre commande
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Vérifiez vos informations, choisissez votre mode de livraison et passez au paiement.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div style={{ display: "grid", gap: "24px" }}>
                <div
                  style={{
                    background: "#faf8ff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 18px",
                      color: "#3d3a6d",
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    Votre création
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "140px 1fr",
                      gap: "18px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "120px",
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
                          fontSize: "22px",
                          fontWeight: 800,
                        }}
                      >
                        Pack d'images
                      </h3>

                      <p
                        style={{
                          margin: "0 0 8px",
                          color: "#7a7699",
                          fontSize: "15px",
                        }}
                      >
                        Thème : Conte
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#7a7699",
                          fontSize: "15px",
                        }}
                      >
                        Aperçu choisi : Aperçu 1
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#faf8ff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 18px",
                      color: "#3d3a6d",
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    Mode de livraison
                  </h2>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <DeliveryCard
                      title="Version électronique"
                      subtitle="Réception par email après paiement"
                      selected
                    />
                    <DeliveryCard
                      title="Livraison à domicile"
                      subtitle="Envoi physique avec frais supplémentaires"
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "#faf8ff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 18px",
                      color: "#3d3a6d",
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    Informations client
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <InputBlock label="Prénom" placeholder="Marie" />
                    <InputBlock label="Nom" placeholder="Dupont" />
                    <InputBlock label="Email" placeholder="marie@email.com" />
                    <InputBlock label="Téléphone" placeholder="06 12 34 56 78" />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "24px" }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                    boxShadow: "0 10px 25px rgba(117, 100, 170, 0.06)",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 18px",
                      color: "#3d3a6d",
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    Résumé de commande
                  </h3>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Produit" value="Pack d'images" />
                    <SummaryRow label="Thème" value="Conte" />
                    <SummaryRow label="Livraison" value="Par email" />
                    <SummaryRow label="Sous-total" value="29,90€" />
                    <SummaryRow label="Frais" value="0,00€" />
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #eee8fb",
                      marginTop: "18px",
                      paddingTop: "18px",
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
                      29,90€
                    </span>
                  </div>

                 <button
                   onClick={() => (window.location.href = "/payment")}
                   style={{
                   width: "100%",
                   marginTop: "22px",
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
                   Continuer pour payer
                  </button>
                </div>

                <div
                  style={{
                    background: "#fff8ef",
                    border: "1px solid #f3dfb6",
                    borderRadius: "22px",
                    padding: "22px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#7a7699",
                      fontSize: "14px",
                      lineHeight: 1.7,
                    }}
                  >
                    Votre réalisation sera conservée pendant 14 jours si le paiement n’est pas finalisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function DeliveryCard({
  title,
  subtitle,
  selected = false,
}: {
  title: string;
  subtitle: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "16px",
        border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8",
        boxShadow: selected
          ? "0 12px 28px rgba(138, 120, 199, 0.18)"
          : "0 8px 18px rgba(117, 100, 170, 0.06)",
        position: "relative",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: "#6f8fff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          ✓
        </div>
      )}

      <h3
        style={{
          margin: "0 0 6px",
          color: "#3d3a6d",
          fontSize: "18px",
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
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function InputBlock({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#3d3a6d",
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {label}
      </label>

      <input
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 14px",
          borderRadius: "14px",
          border: "1px solid #ddd4f2",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
          background: "#fff",
        }}
      />
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

export default CheckoutPage;