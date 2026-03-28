import { useState } from "react";
import Navbar from "../components/Navbar";

function AIStudio() {
  const [theme, setTheme] = useState("Conte");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setMessage("");
      setPrompt("");

      const response = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la génération.");
        return;
      }

      setPrompt(data.prompt);
      setMessage(data.message);
    } catch (error) {
      setMessage("Impossible de contacter le serveur IA.");
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "1000px",
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
            Studio IA
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
            Choisissez un thème et générez automatiquement un prompt de
            transformation IA prêt à être connecté à un moteur de génération
            d’image.
          </p>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#3d3a6d",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Choisir un thème
            </label>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #ddd4f2",
                fontSize: "15px",
                outline: "none",
                background: "#fff",
              }}
            >
              <option>Conte</option>
              <option>Super-héros</option>
              <option>Pirate</option>
              <option>Univers féerique</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleGenerate}
              disabled={loading}
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
              {loading ? "Génération..." : "Générer le prompt IA"}
            </button>
          </div>

          {message && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                background: "#eef5ff",
                color: "#3973d6",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {message}
            </div>
          )}

          {prompt && (
            <div
              style={{
                background: "#faf8ff",
                border: "1px solid #eee8fb",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  color: "#3d3a6d",
                  fontSize: "22px",
                  fontWeight: 800,
                }}
              >
                Prompt généré
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#5f5989",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                {prompt}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AIStudio;