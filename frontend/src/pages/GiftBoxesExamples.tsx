import Navbar from "../components/Navbar";

function GiftBoxesExamples() {
  const examples = [
    {
      title: "Coffret naissance",
      description:
        "Regroupement de créations personnalisées pensées comme un cadeau doux et mémorable.",
    },
    {
      title: "Pack anniversaire",
      description:
        "Ensemble cadeau avec plusieurs supports pour marquer un événement important de façon originale.",
    },
    {
      title: "Cadeau personnalisé",
      description:
        "Offre visuelle prête à offrir, conçue autour d’un souvenir ou d’une occasion familiale.",
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
          <h1
            style={{
              margin: "0 0 14px",
              color: "#3d3a6d",
              fontSize: "42px",
              fontWeight: 800,
            }}
          >
            Exemples coffrets & cadeaux
          </h1>

          <p
            style={{
              margin: "0 auto",
              maxWidth: "760px",
              color: "#7a7699",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            Des exemples simples de coffrets et de cadeaux visuels à proposer
            dans l’univers PetitsRêves.
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
                Mockup coffret
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
      </main>
    </div>
  );
}

export default GiftBoxesExamples;