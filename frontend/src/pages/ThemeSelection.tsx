import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import { generateAIWithFormData } from "../api/ai";
import "./ThemeSelection.css";

const THEMES = ["Conte", "Super-héros", "Pirate", "Univers féerique", "Princesse", "Astronaute"];
const PRODUCTS = [
  { title: "Pack d'images", price: "29,90€" },
  { title: "Album Photo", price: "49,90€" },
  { title: "Histoire personnalisée", price: "39,90€" },
];

function ThemeSelection() {
  const navigate = useNavigate();
  const { project, setTheme, setProduct, setGeneratedImages } = useAI();
  const [selectedTheme, setSelectedTheme] = useState(project.theme || THEMES[0]);
  const [selectedProduct, setSelectedProduct] = useState(project.product || PRODUCTS[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedProductData = PRODUCTS.find((p) => p.title === selectedProduct) || PRODUCTS[0];

  const handleContinue = async () => {
    if (project.images.length === 0) {
      setError("Aucune photo trouvée. Veuillez retourner à l'étape précédente.");
      return;
    }
    setTheme(selectedTheme);
    setProduct(selectedProduct);
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("theme", selectedTheme);
      project.images.forEach((img) => formData.append("images", img));

      const { res, data } = await generateAIWithFormData(formData);
      if (!res.ok) throw new Error(data.message || "Erreur de génération.");

      setGeneratedImages(data.generatedImages);
      navigate("/preview");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />
      <section className="theme-selection-section">
        <Container>
          <div className="theme-selection-card">
            <div className="theme-selection-card__header">
              <p className="theme-selection-card__step">Étape 2 : Choisissez un thème et un produit</p>
              <h1 className="theme-selection-card__title">Personnalisez votre création</h1>
              <p className="theme-selection-card__subtitle">Sélectionnez l'univers visuel et le format qui correspondent le mieux à votre projet.</p>
            </div>

            <div className="theme-selection-card__grid">
              <div className="theme-selection-card__left">
                <div className="theme-block">
                  <h2 className="theme-block__title">Sélectionnez un thème</h2>
                  <div className="theme-block__grid">
                    {THEMES.map((t) => (
                      <ThemeCard key={t} title={t} selected={selectedTheme === t} onClick={() => setSelectedTheme(t)} />
                    ))}
                  </div>
                </div>

                <div className="theme-block">
                  <h2 className="theme-block__title">Choisissez votre produit</h2>
                  <div className="theme-block__grid">
                    {PRODUCTS.map((p) => (
                      <ProductCard key={p.title} title={p.title} price={p.price} selected={selectedProduct === p.title} onClick={() => setSelectedProduct(p.title)} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="theme-selection-card__right">
                <div className="theme-summary">
                  <h3 className="theme-summary__title">Récapitulatif</h3>
                  <div className="theme-summary__rows">
                    <SummaryRow label="Thème" value={selectedTheme} />
                    <SummaryRow label="Produit" value={selectedProduct} />
                    <SummaryRow label="Nombre de photos" value={String(project.images.length)} />
                  </div>
                  <div className="theme-summary__total-row">
                    <span className="theme-summary__total-label">Total</span>
                    <span className="theme-summary__total-value">{selectedProductData.price}</span>
                  </div>
                </div>

                <div className="theme-action-block">
                  <p className="theme-action-block__text">
                    Le rendu final dépendra de la qualité des photos et du thème sélectionné. La génération prend environ 30 secondes.
                  </p>
                  {error && <p className="theme-action-block__error">{error}</p>}
                  <button onClick={handleContinue} disabled={loading} className="theme-action-block__btn">
                    {loading ? "Génération en cours..." : "Générer les aperçus"}
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

function ThemeCard({ title, selected, onClick }: { title: string; selected: boolean; onClick: () => void }) {
  const emojis: Record<string, string> = {
    "Conte": "🧚",
    "Super-héros": "🦸",
    "Pirate": "🏴‍☠️",
    "Univers féerique": "✨",
    "Princesse": "👸",
    "Astronaute": "🚀",
  };
  return (
    <div onClick={onClick} className={`theme-card${selected ? " theme-card--selected" : ""}`}>
      <div className="theme-card__emoji-box">{emojis[title]}</div>
      <p className="theme-card__title">{title}</p>
    </div>
  );
}

function ProductCard({ title, price, selected, onClick }: { title: string; price: string; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`product-selection-card${selected ? " product-selection-card--selected" : ""}`}>
      <h3 className="product-selection-card__title">{title}</h3>
      <p className="product-selection-card__price">{price}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span className="summary-row__label">{label}</span>
      <span className="summary-row__value">{value}</span>
    </div>
  );
}

export default ThemeSelection;
