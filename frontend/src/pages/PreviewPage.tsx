import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function PreviewPage() {
  const navigate = useNavigate();

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
              maxWidth: "1050px",
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
                Étape 3 : Aperçu de votre création
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                Découvrez votre aperçu
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Voici une sélection de rendus générés selon vos photos, votre thème et votre produit.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "18px",
                    marginBottom: "22px",
                  }}
                >
                  <PreviewCard label="Aperçu 1" selected />
                  <PreviewCard label="Aperçu 2" />
                  <PreviewCard label="Aperçu 3" />
                  <PreviewCard label="Aperçu 4" />
                </div>

                <div
                  style={{
                    background: "#fff8ef",
                    border: "1px solid #f3dfb6",
                    borderRadius: "18px",
                    padding: "16px 18px",
                    color: "#7a7699",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  Il s’agit d’un aperçu. La version finale sera livrée en meilleure qualité après validation et paiement.
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
                      margin: "0 0 16px",
                      color: "#3d3a6d",
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    Votre sélection
                  </h3>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Thème" value="Conte" />
                    <SummaryRow label="Produit" value="Pack d'images" />
                    <SummaryRow label="Photos utilisées" value="4" />
                    <SummaryRow label="Aperçu choisi" value="Aperçu 1" />
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      background: "#eee8fb",
                      borderRadius: "999px",
                      overflow: "hidden",
                      marginTop: "22px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "70%",
                        height: "100%",
                        background: "linear-gradient(90deg, #6f8fff 0%, #f6b93b 100%)",
                        borderRadius: "999px",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      margin: "0 0 22px",
                      color: "#8f89b2",
                      fontSize: "14px",
                    }}
                  >
                    Encore une étape avant la validation finale.
                  </p>

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
                    Continuer
                  </button>
                </div>

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
                  Choisir un autre aperçu
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function PreviewCard({
  label,
  selected = false,
}: {
  label: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "12px",
        border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8",
        boxShadow: selected
          ? "0 12px 28px rgba(138, 120, 199, 0.18)"
          : "0 8px 18px rgba(117, 100, 170, 0.06)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "180px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
          marginBottom: "10px",
        }}
      >
        {selected && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
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
      </div>

      <p
        style={{
          margin: 0,
          textAlign: "center",
          color: "#3d3a6d",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {label}
      </p>
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

export default PreviewPage;