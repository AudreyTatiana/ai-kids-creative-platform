import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function UploadPage() {
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
              maxWidth: "980px",
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
                Étape 1 : Téléversez des photos
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                Créez votre projet magique
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Importez 2 à 4 photos de votre enfant pour commencer la création.
              </p>
            </div>

            <div
              style={{
                border: "2px dashed #d9d2ef",
                borderRadius: "24px",
                background: "linear-gradient(180deg, #fcfbff 0%, #f8f5ff 100%)",
                padding: "34px 24px",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "76px",
                  height: "76px",
                  margin: "0 auto 16px",
                  borderRadius: "22px",
                  background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                ⬆️
              </div>

              <h2
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                Glissez-déposez ou cliquez pour téléverser
              </h2>

              <p
                style={{
                  margin: "0 0 18px",
                  color: "#6f6a93",
                  fontSize: "16px",
                }}
              >
                2 à 4 photos (JPG/PNG, max 5 Mo/photo)
              </p>

              <button
                style={{
                  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "13px 18px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Sélectionner des photos
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginBottom: "26px",
              }}
            >
              <PreviewCard label="Photo 1" selected />
              <PreviewCard label="Photo 2" selected />
              <PreviewCard label="Photo 3" />
              <PreviewCard label="Photo 4" selected />
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
                    background: "#f8f5ff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                    marginBottom: "18px",
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
                    Conseils qualité
                  </h3>

                  <div style={{ display: "grid", gap: "12px" }}>
                    <CheckItem text="Visage bien visible" />
                    <CheckItem text="Bonne lumière" />
                    <CheckItem text="Pas de lunettes / masque" />
                    <CheckItem text="Angle de face recommandé" />
                  </div>
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
                  Certaines photos semblent sombres. Vous pouvez continuer,
                  mais le rendu pourrait être moins bon.
                </div>
              </div>

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
                  Progression
                </h3>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: "#eee8fb",
                    borderRadius: "999px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "35%",
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
                  Vos photos sont prêtes pour l’étape suivante.
                </p>

               <button
                 onClick={() => navigate("/theme")}
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
    <div>
      <div
        style={{
          position: "relative",
          height: "120px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
          border: selected ? "3px solid #8a78c7" : "1px solid #e8e2f8",
          boxShadow: "0 10px 20px rgba(117, 100, 170, 0.08)",
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
          color: "#7a7699",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#5f5989",
        fontSize: "15px",
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

export default UploadPage;