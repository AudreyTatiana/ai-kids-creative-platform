import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";

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

      const res = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
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
      <section style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)", padding: "48px 0 80px" }}>
        <Container>
          <div style={{ maxWidth: "1050px", margin: "0 auto", background: "#fff", borderRadius: "28px", padding: "32px", boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ margin: "0 0 10px", color: "#8c84c6", fontWeight: 700, fontSize: "14px" }}>Étape 2 : Choisissez un thème et un produit</p>
              <h1 style={{ margin: "0 0 10px", color: "#3d3a6d", fontSize: "36px", fontWeight: 800 }}>Personnalisez votre création</h1>
              <p style={{ margin: 0, color: "#7a7699", fontSize: "15px", lineHeight: 1.7 }}>Sélectionnez l'univers visuel et le format qui correspondent le mieux à votre projet.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }}>
              <div style={{ display: "grid", gap: "24px" }}>
                {/* Thèmes */}
                <div style={{ background: "#faf8ff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb" }}>
                  <h2 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "24px", fontWeight: 800 }}>Sélectionnez un thème</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    {THEMES.map((t) => (
                      <ThemeCard key={t} title={t} selected={selectedTheme === t} onClick={() => setSelectedTheme(t)} />
                    ))}
                  </div>
                </div>

                {/* Produits */}
                <div style={{ background: "#faf8ff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb" }}>
                  <h2 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "24px", fontWeight: 800 }}>Choisissez votre produit</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    {PRODUCTS.map((p) => (
                      <ProductCard key={p.title} title={p.title} price={p.price} selected={selectedProduct === p.title} onClick={() => setSelectedProduct(p.title)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Récapitulatif */}
              <div style={{ display: "grid", gap: "24px" }}>
                <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb", boxShadow: "0 10px 25px rgba(117, 100, 170, 0.06)" }}>
                  <h3 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "22px", fontWeight: 800 }}>Récapitulatif</h3>
                  <div style={{ display: "grid", gap: "14px" }}>
                    <SummaryRow label="Thème" value={selectedTheme} />
                    <SummaryRow label="Produit" value={selectedProduct} />
                    <SummaryRow label="Nombre de photos" value={String(project.images.length)} />
                  </div>
                  <div style={{ borderTop: "1px solid #eee8fb", marginTop: "18px", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#3d3a6d", fontSize: "18px", fontWeight: 800 }}>Total</span>
                    <span style={{ color: "#3d3a6d", fontSize: "22px", fontWeight: 800 }}>{selectedProductData.price}</span>
                  </div>
                </div>

                <div style={{ background: "#fff8ef", border: "1px solid #f3dfb6", borderRadius: "22px", padding: "22px" }}>
                  <p style={{ margin: "0 0 18px", color: "#7a7699", fontSize: "15px", lineHeight: 1.7 }}>
                    Le rendu final dépendra de la qualité des photos et du thème sélectionné. La génération prend environ 30 secondes.
                  </p>
                  {error && <p style={{ color: "#e74c3c", fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>{error}</p>}
                  <button onClick={handleContinue} disabled={loading} style={{ width: "100%", background: loading ? "#ccc" : "#f6b93b", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 18px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
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
  return (
    <div onClick={onClick} style={{ background: "#fff", borderRadius: "18px", padding: "12px", border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8", boxShadow: selected ? "0 12px 28px rgba(138, 120, 199, 0.18)" : "0 8px 18px rgba(117, 100, 170, 0.06)", cursor: "pointer" }}>
      <div style={{ height: "80px", borderRadius: "14px", background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
        {{"Conte": "🧚", "Super-héros": "🦸", "Pirate": "🏴‍☠️", "Univers féerique": "✨", "Princesse": "👸", "Astronaute": "🚀"}[title]}
      </div>
      <p style={{ margin: 0, textAlign: "center", color: "#3d3a6d", fontSize: "14px", fontWeight: 700 }}>{title}</p>
    </div>
  );
}

function ProductCard({ title, price, selected, onClick }: { title: string; price: string; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ background: "#fff", borderRadius: "18px", padding: "12px", border: selected ? "2px solid #8a78c7" : "1px solid #e8e2f8", boxShadow: selected ? "0 12px 28px rgba(138, 120, 199, 0.18)" : "0 8px 18px rgba(117, 100, 170, 0.06)", cursor: "pointer", textAlign: "center" }}>
      <h3 style={{ margin: "0 0 6px", color: "#3d3a6d", fontSize: "16px", fontWeight: 800 }}>{title}</h3>
      <p style={{ margin: 0, color: "#f0aa16", fontSize: "16px", fontWeight: 800 }}>{price}</p>
    </div>
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

export default ThemeSelection;
