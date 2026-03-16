import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function ThemeSelection() {
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
                Étape 2 : Choisissez un thème et un produit
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  color: "#3d3a6d",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                Personnalisez votre création
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Sélectionnez l’univers visuel et le format qui correspondent le
                mieux à votre projet.
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
              <div style={{ display: "grid", gap: "24px" }}>
                <div
                  style={{
                    background: "#faf8ff",
                    borderRadius: "22px",
                    padding: "22px",
                    border: "1px solid #eee8fb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        color: "#3d3a6d",
                        fontSize: "24px",
                        fontWeight: 800,
                      }}
                    >
                      Sélectionnez un thème
                    </h2>

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
                      1 choix recommandé
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <ThemeCard title="Conte" selected />
                    <ThemeCard title="Super-héros" />
                    <ThemeCard title="Pirate" />
                    <ThemeCard title="Futuriste" />
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
                      margin: "0 0 16px",
                      color: "#3d3a6d",
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    Choisissez votre produit
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <ProductCard
                      title="Pack d'images"
                      price="29,90€"
                      selected
                    />
                    <ProductCard title="Album Photo" price="49,90€" />
                    <ProductCard
                      title="Histoire personnalisée"
                      price="39,90€"
                    />
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
                      margin: "0 0 16px",
                      color: "#3d3a6d",
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    Récapitulatif
                  </h3>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Thème" value="Conte" />
                    <SummaryRow label="Produit" value="Pack d'images" />
                    <SummaryRow label="Nombre de photos" value="4" />
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
                        fontSize: "22px",
                        fontWeight: 800,
                      }}
                    >
                      29,90€
                    </span>
                  </div>
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
                      margin: "0 0 18px",
                      color: "#7a7699",
                      fontSize: "15px",
                      lineHeight: 1.7,
                    }}
                  >
                    Le rendu final dépendra de la qualité des photos et du thème
                    sélectionné. Vous pourrez visualiser un aperçu à l’étape
                    suivante.
                  </p>

                  <button
                     onClick={() => navigate("/preview")}
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
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function ThemeCard({
  title,
  selected = false,
}: {
  title: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "12px",
        border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8",
        boxShadow: selected
          ? "0 12px 28px rgba(138, 120, 199, 0.18)"
          : "0 8px 18px rgba(117, 100, 170, 0.06)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "110px",
          borderRadius: "14px",
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
        {title}
      </p>
    </div>
  );
}

function ProductCard({
  title,
  price,
  selected = false,
}: {
  title: string;
  price: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "12px",
        border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8",
        boxShadow: selected
          ? "0 12px 28px rgba(138, 120, 199, 0.18)"
          : "0 8px 18px rgba(117, 100, 170, 0.06)",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "120px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
          marginBottom: "12px",
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
          color: "#f0aa16",
          fontSize: "16px",
          fontWeight: 800,
        }}
      >
        {price}
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

export default ThemeSelection;