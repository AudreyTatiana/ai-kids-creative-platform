import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";

const PRICES: Record<string, number> = {
  "Pack d'images": 29.9,
  "Album Photo": 49.9,
  "Histoire personnalisée": 39.9,
};

function PaymentPage() {
  const navigate = useNavigate();
  const { project } = useAI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basePrice = PRICES[project.product] ?? 29.9;
  const fee = project.delivery === "physical" ? 5.9 : 0;
  const total = basePrice + fee;
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: project.product,
          theme: project.theme,
          delivery: project.delivery,
          amount: total,
          customer: project.customer,
          generatedImages: project.generatedImages,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur Stripe.");
      window.location.href = data.url; // Redirection vers Stripe
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

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
                Paiement sécurisé
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                Finalisez votre achat
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Procédez au paiement de votre création PetitsRêves en toute sécurité.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.9fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  background: "#faf8ff",
                  borderRadius: "24px",
                  padding: "24px",
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
                  Informations de paiement
                </h2>

                <div style={{ display: "grid", gap: "18px" }}>
                  <InputBlock label="Nom sur la carte" placeholder="Marie Dupont" />

                  <InputBlock
                    label="Numéro de carte"
                    placeholder="1234 5678 9012 3456"
                  />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <InputBlock label="Date d'expiration" placeholder="MM/AA" />
                    <InputBlock label="CVC" placeholder="123" />
                  </div>

                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e8e2f8",
                      borderRadius: "18px",
                      padding: "16px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        color: "#3d3a6d",
                        fontSize: "18px",
                        fontWeight: 800,
                      }}
                    >
                      Adresse de facturation
                    </h3>

                    <div style={{ display: "grid", gap: "14px" }}>
                      <InputBlock label="Adresse" placeholder="12 rue des Lilas" />
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "16px",
                        }}
                      >
                        <InputBlock label="Ville" placeholder="Paris" />
                        <InputBlock label="Code postal" placeholder="75015" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "24px" }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "24px",
                    padding: "24px",
                    border: "1px solid #eee8fb",
                    boxShadow: "0 10px 25px rgba(117, 100, 170, 0.06)",
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
                    Résumé
                  </h2>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Produit" value={project.product || "Pack d'images"} />
                    <SummaryRow label="Thème" value={project.theme || "Conte"} />
                    <SummaryRow label="Livraison" value={project.delivery === "email" ? "Par email" : "À domicile"} />
                    <SummaryRow label="Sous-total" value={fmt(basePrice)} />
                    <SummaryRow label="Frais" value={fmt(fee)} />
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
                      {fmt(total)}
                    </span>
                  </div>

                  {error && <p style={{ color: "#e74c3c", fontSize: "14px", fontWeight: 600, marginTop: "12px" }}>{error}</p>}
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    style={{
                      width: "100%",
                      marginTop: "22px",
                      background: loading ? "#ccc" : "#f6b93b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "14px",
                      padding: "14px 18px",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Redirection vers Stripe..." : "Payer en toute sécurité"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#f8fff8",
                    border: "1px solid #d8f0dc",
                    borderRadius: "22px",
                    padding: "20px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 12px",
                      color: "#2f7b46",
                      fontSize: "18px",
                      fontWeight: 800,
                    }}
                  >
                    Paiement 100% sécurisé
                  </h3>

                  <div style={{ display: "grid", gap: "10px" }}>
                    <SecurityItem text="Données chiffrées" />
                    <SecurityItem text="Paiement protégé" />
                    <SecurityItem text="Confirmation par email" />
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff8ef",
                    border: "1px solid #f3dfb6",
                    borderRadius: "22px",
                    padding: "20px",
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
                    Votre réalisation sera générée en version finale après validation du paiement.
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

function SecurityItem({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#4d7557",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "#ebfff1",
          color: "#1f9d57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      {text}
    </div>
  );
}

export default PaymentPage;