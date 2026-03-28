import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AIExamples() {
  const navigate = useNavigate();

  const examples = [
    {
      title: "Univers féerique",
      description:
        "Transformation d’une photo d’enfant en scène magique pastel avec château, lumière douce et ambiance conte.",
    },
    {
      title: "Aventure magique",
      description:
        "L’enfant devient explorateur dans un univers imaginaire avec paysages enchanteurs et décor immersif.",
    },
    {
      title: "Héros d’histoire",
      description:
        "Création d’un portrait stylisé où l’enfant devient le personnage principal d’un récit illustré.",
    },
    {
      title: "Style princesse",
      description:
        "Rendu élégant et poétique inspiré des univers royaux et des contes visuels pour enfants.",
    },
    {
      title: "Style super-héros",
      description:
        "Transformation en héros moderne avec costume, lumière dynamique et décor d’action.",
    },
    {
      title: "Style pirate",
      description:
        "Ambiance aventure en mer avec navire, trésor et décor d’exploration adapté aux enfants.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fffdfd 0%, #f8f5ff 100%)",
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          display: "grid",
          gap: "28px",
        }}
      >
        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "36px",
            boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#f0aa16",
              fontSize: "14px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            PETITSRÊVES
          </p>

          <h1
            style={{
              margin: "0 0 14px",
              color: "#3d3a6d",
              fontSize: "42px",
              fontWeight: 800,
            }}
          >
            Exemples de créations IA
          </h1>

          <p
            style={{
              margin: "0 auto",
              maxWidth: "780px",
              color: "#7a7699",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            Découvrez différents styles de rendus générés à partir des photos
            d’enfants. Ces exemples permettent d’illustrer la richesse visuelle
            du service de création IA proposé par PetitsRêves.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {examples.map((example) => (
            <div
              key={example.title}
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(120, 100, 180, 0.12)",
                border: "1px solid #f0ebfa",
              }}
            >
              <div
                style={{
                  height: "220px",
                  background:
                    "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3d3a6d",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                Exemple visuel
              </div>

              <div style={{ padding: "20px" }}>
                <h2
                  style={{
                    margin: "0 0 10px",
                    color: "#3d3a6d",
                    fontSize: "22px",
                    fontWeight: 800,
                  }}
                >
                  {example.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#7a7699",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 8px",
                color: "#3d3a6d",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Lancez votre propre création
            </h3>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
                lineHeight: 1.7,
                maxWidth: "720px",
              }}
            >
              Choisissez un thème, importez une photo et démarrez votre projet
              personnalisé.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            style={{
              background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "14px 20px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Créer mon projet
          </button>
        </section>
      </main>
    </div>
  );
}

export default AIExamples;