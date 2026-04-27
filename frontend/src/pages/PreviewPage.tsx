import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import { useCart } from "../context/CartContext";

function PreviewPage() {
  const navigate = useNavigate();
  const { project, setSelectedImageIndex } = useAI();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

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
  const [selectedIndex, setSelectedIndex] = useState(project.selectedImageIndex);

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
    setSelectedImageIndex(i);
  };

  if (project.generatedImages.length === 0) {
    return (
      <Layout>
        <Navbar />
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#7a7699", fontSize: "16px", marginBottom: "16px" }}>Aucune image générée. Veuillez recommencer depuis l'étape 1.</p>
            <button onClick={() => navigate("/upload")} style={{ background: "#f6b93b", color: "#fff", border: "none", borderRadius: "14px", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>Recommencer</button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <section style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)", padding: "48px 0 80px" }}>
        <Container>
          <div style={{ maxWidth: "1050px", margin: "0 auto", background: "#fff", borderRadius: "28px", padding: "32px", boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ margin: "0 0 10px", color: "#8c84c6", fontWeight: 700, fontSize: "14px" }}>Étape 3 : Aperçu de votre création</p>
              <h1 style={{ margin: "0 0 10px", color: "#3d3a6d", fontSize: "36px", fontWeight: 800 }}>Découvrez votre aperçu</h1>
              <p style={{ margin: 0, color: "#7a7699", fontSize: "15px", lineHeight: 1.7 }}>Voici les rendus générés selon vos photos et votre thème. Sélectionnez votre préféré.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }}>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px", marginBottom: "22px" }}>
                  {project.generatedImages.map((url, i) => (
                    <div key={i} onClick={() => handleSelect(i)} style={{ background: "#fff", borderRadius: "20px", padding: "10px", border: selectedIndex === i ? "2px solid #8a78c7" : "1px solid #e8e2f8", boxShadow: selectedIndex === i ? "0 12px 28px rgba(138, 120, 199, 0.18)" : "0 8px 18px rgba(117, 100, 170, 0.06)", cursor: "pointer", position: "relative" }}>
                      <img src={url} alt={`Aperçu ${i + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "14px", display: "block" }} />
                      {selectedIndex === i && (
                        <div style={{ position: "absolute", top: "18px", right: "18px", width: "28px", height: "28px", borderRadius: "50%", background: "#6f8fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>✓</div>
                      )}
                      <p style={{ margin: "8px 0 0", textAlign: "center", color: "#3d3a6d", fontSize: "14px", fontWeight: 700 }}>Aperçu {i + 1}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#fff8ef", border: "1px solid #f3dfb6", borderRadius: "18px", padding: "16px 18px", color: "#7a7699", fontSize: "14px", lineHeight: 1.7 }}>
                  Il s'agit d'un aperçu. La version finale sera livrée en meilleure qualité après validation et paiement.
                </div>
              </div>

              <div style={{ display: "grid", gap: "24px" }}>
                <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb", boxShadow: "0 10px 25px rgba(117, 100, 170, 0.06)" }}>
                  <h3 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "22px", fontWeight: 800 }}>Votre sélection</h3>
                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Thème" value={project.theme} />
                    <SummaryRow label="Produit" value={project.product} />
                    <SummaryRow label="Photos utilisées" value={String(project.images.length)} />
                    <SummaryRow label="Aperçu choisi" value={`Aperçu ${selectedIndex + 1}`} />
                  </div>

                  {/* Image sélectionnée en grand */}
                  {project.generatedImages[selectedIndex] && (
                    <img src={project.generatedImages[selectedIndex]} alt="Sélection" style={{ width: "100%", borderRadius: "14px", marginTop: "16px", objectFit: "cover", maxHeight: "200px" }} />
                  )}

                  <div style={{ width: "100%", height: "10px", background: "#eee8fb", borderRadius: "999px", overflow: "hidden", marginTop: "16px", marginBottom: "10px" }}>
                    <div style={{ width: "70%", height: "100%", background: "linear-gradient(90deg, #6f8fff 0%, #f6b93b 100%)", borderRadius: "999px" }} />
                  </div>
                  <p style={{ margin: "0 0 22px", color: "#8f89b2", fontSize: "14px" }}>Encore une étape avant la validation finale.</p>

                  <button onClick={() => navigate("/checkout")} style={{ width: "100%", background: "#f6b93b", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 18px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                    Continuer vers le paiement
                  </button>
                  <button onClick={handleAddToCart} disabled={addedToCart} style={{ width: "100%", marginTop: "10px", background: addedToCart ? "#ebfff1" : "#fff", color: addedToCart ? "#1f9d57" : "#6d67a0", border: addedToCart ? "1px solid #b6e8c8" : "1px solid #ddd4f2", borderRadius: "14px", padding: "12px 18px", fontSize: "14px", fontWeight: 700, cursor: addedToCart ? "default" : "pointer" }}>
                    {addedToCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
                  </button>
                </div>

                <button onClick={() => navigate("/theme")} style={{ width: "100%", background: "#fff", color: "#6d67a0", border: "1px solid #ddd4f2", borderRadius: "14px", padding: "12px 18px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
      <span style={{ color: "#7a7699", fontSize: "15px" }}>{label}</span>
      <span style={{ color: "#3d3a6d", fontSize: "15px", fontWeight: 700 }}>{value}</span>
    </div>
  );
}

export default PreviewPage;
