import { useState } from "react";
import Navbar from "../components/Navbar";
import { generateAIImages } from "../api/ai";
import "./AIStudio.css";

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

      const { data } = await generateAIImages(theme);

      setPrompt(data.prompt);
      setMessage(data.message);
    } catch (error) {
      setMessage("Impossible de contacter le serveur IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-studio">
      <Navbar />

      <main className="ai-studio__main">
        <section className="ai-studio__header">
          <p className="ai-studio__brand-label">PETITSRÊVES</p>

          <h1 className="ai-studio__title">Studio IA</h1>

          <p className="ai-studio__subtitle">
            Choisissez un thème et générez automatiquement un prompt de
            transformation IA prêt à être connecté à un moteur de génération
            d'image.
          </p>
        </section>

        <section className="ai-studio__form">
          <div>
            <label className="form-label">Choisir un thème</label>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="ai-studio__select"
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
              className="ai-studio__generate-btn"
            >
              {loading ? "Génération..." : "Générer le prompt IA"}
            </button>
          </div>

          {message && (
            <div className="ai-studio__message">{message}</div>
          )}

          {prompt && (
            <div className="ai-studio__prompt-result">
              <h3 className="ai-studio__prompt-title">Prompt généré</h3>
              <p className="ai-studio__prompt-text">{prompt}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AIStudio;
