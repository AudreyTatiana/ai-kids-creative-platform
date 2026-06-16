import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import { useCart } from "../context/CartContext";
import "./PreviewPage.css";

function PreviewPage() {
  const navigate = useNavigate();
  const { project, setSelectedImageIndex } = useAI();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(project.selectedImageIndex);

  const PRICES: Record<string, number> = {
    "Pack d'images": 29.9,
    "Album Photo": 49.9,
    "Histoire personnalisée": 39.9,
  };

  const handleAddToCart = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vous devez être connecté pour ajouter au panier.");
      return;
    }
    const success = await addToCart({
      product: project.product,
      theme: project.theme,
      delivery: project.delivery || "email",
      price: PRICES[project.product] ?? 29.9,
      previewImage: project.generatedImages[selectedIndex] || "",
    });
    if (success) {
      setAddedToCart(true);
    } else {
      alert("Erreur lors de l'ajout au panier. Vérifiez la console et que le serveur backend est bien démarré.");
    }
  };

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
    setSelectedImageIndex(i);
  };

  if (project.generatedImages.length === 0) {
    return (
      <Layout>
        <Navbar />
        <section className="preview-empty">
          <div className="preview-empty__inner">
            <p className="preview-empty__text">Aucune image générée. Veuillez recommencer depuis l'étape 1.</p>
            <button onClick={() => navigate("/upload")} className="preview-empty__btn">Recommencer</button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <section className="preview-section">
        <Container>
          <div className="preview-card">
            <div className="preview-card__header">
              <p className="preview-card__step">Étape 3 : Aperçu de votre création</p>
              <h1 className="preview-card__title">Découvrez votre aperçu</h1>
              <p className="preview-card__subtitle">Voici les rendus générés selon vos photos et votre thème. Sélectionnez votre préféré.</p>
            </div>

            <div className="preview-card__grid">
              <div>
                <div className="preview-images-grid">
                  {project.generatedImages.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`preview-image-item${selectedIndex === i ? " preview-image-item--selected" : ""}`}
                    >
                      <img src={url} alt={`Aperçu ${i + 1}`} className="preview-image-item__img" />
                      {selectedIndex === i && (
                        <div className="preview-image-item__check">✓</div>
                      )}
                      <p className="preview-image-item__label">Aperçu {i + 1}</p>
                    </div>
                  ))}
                </div>

                <div className="preview-note">
                  Il s'agit d'un aperçu. La version finale sera livrée en meilleure qualité après validation et paiement.
                </div>
              </div>

              <div className="preview-right-col">
                <div className="preview-selection-card">
                  <h3 className="preview-selection-card__title">Votre sélection</h3>
                  <div>
                    <SummaryRow label="Thème" value={project.theme} />
                    <SummaryRow label="Produit" value={project.product} />
                    <SummaryRow label="Photos utilisées" value={String(project.images.length)} />
                    <SummaryRow label="Aperçu choisi" value={`Aperçu ${selectedIndex + 1}`} />
                  </div>

                  {project.generatedImages[selectedIndex] && (
                    <img
                      src={project.generatedImages[selectedIndex]}
                      alt="Sélection"
                      className="preview-selection-card__selected-img"
                    />
                  )}

                  <div className="preview-progress-bar-track">
                    <div className="preview-progress-bar-fill" />
                  </div>
                  <p className="preview-selection-card__hint">Encore une étape avant la validation finale.</p>

                  <button onClick={() => navigate("/checkout")} className="preview-selection-card__pay-btn">
                    Continuer vers le paiement
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className={`preview-selection-card__cart-btn${addedToCart ? " preview-selection-card__cart-btn--added" : " preview-selection-card__cart-btn--default"}`}
                  >
                    {addedToCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
                  </button>
                </div>

                <button onClick={() => navigate("/theme")} className="preview-back-btn">
                  Changer de thème
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
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

export default PreviewPage;
