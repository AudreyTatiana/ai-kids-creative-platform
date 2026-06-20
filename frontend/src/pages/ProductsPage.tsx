import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import packImages from "../assets/images/pack-images.png";
import albumPhotos from "../assets/images/album-photos.png";
import histoirePersonnalisee from "../assets/images/histoire-personalisee.png";
import "./Examples.css";

const products = [
  {
    image: packImages,
    title: "Pack d'images",
    price: "29,90 €",
    badge: "⚡ Livraison immédiate",
    description: "3 illustrations IA uniques générées à partir des photos de votre enfant dans l'univers de votre choix.",
    features: [
      "4 images haute résolution (PNG/JPEG)",
      "Visage de l'enfant parfaitement préservé",
      "6 thèmes disponibles",
      "Reçues par email sous 24h",
      "Livraison à domicile disponible",
      "Prêtes à imprimer ou partager",
    ],
    highlight: true,
  },
  {
    image: albumPhotos,
    title: "Album photos magique",
    price: "49,90 €",
    badge: "📦 Livraison à domicile",
    description: "Un album photo luxueux imprimé sur papier premium avec votre enfant illustré en héros de son propre monde.",
    features: [
      "Album relié couverture rigide",
      "Papier photo brillant 250g",
      "Jusqu'à 20 pages personnalisées",
      "Prénom de l'enfant intégré",
      "Livraison à domicile sous 5 à 7 jours",
      "Livraison par email disponible",
    ],
    highlight: false,
  },
  {
    image: histoirePersonnalisee,
    title: "Histoire personnalisée",
    price: "39,90 €",
    badge: "🎁 Idée cadeau parfaite",
    description: "Un livre illustré sur mesure où votre enfant est le héros de sa propre aventure magique, page après page.",
    features: [
      "Livre illustré 24 pages",
      "Histoire écrite avec le prénom de l'enfant",
      "Couverture personnalisée",
      "Format 20×20 cm",
      "Livraison à domicile sous 5 à 7 jours",
      "Livraison par email disponible",
    ],
    highlight: false,
  },
];

function ProductsPage() {
  const navigate = useNavigate();

  const handleChoose = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/upload");
    } else {
      navigate("/login?redirect=/upload");
    }
  };

  return (
    <div className="examples-page">
      <Navbar />

      <main className="examples-page__main">

        <section className="examples-page__header">
          <p className="examples-page__badge">PETITSRÊVES</p>
          <h1 className="examples-page__title">Nos produits</h1>
          <p className="examples-page__subtitle">
            Des créations magiques et personnalisées pensées pour offrir à chaque enfant
            un souvenir unique et précieux, fabriqué avec amour et intelligence artificielle.
          </p>
        </section>

        <section className="examples-page__grid">
          {products.map((p) => (
            <div key={p.title} className="example-page-card" style={p.highlight ? { border: "2px solid #9c8cff" } : {}}>
              <div className="example-page-card__visual">
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div className="example-page-card__body">
                <span style={{
                  display: "inline-block",
                  background: "#f3efff",
                  color: "#6f5fc8",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  marginBottom: "10px",
                }}>
                  {p.badge}
                </span>
                <h2 className="example-page-card__title">{p.title}</h2>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#6f5fc8", margin: "4px 0 10px" }}>
                  {p.price}
                </p>
                <p className="example-page-card__desc">{p.description}</p>
                <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "6px" }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ fontSize: "13px", color: "#5a5780", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ color: "#9c8cff", fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleChoose}
                  className="examples-page__cta-btn"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  Choisir ce produit
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="examples-page__cta">
          <div>
            <h3 className="examples-page__cta-title">Des questions sur nos produits ?</h3>
            <p className="examples-page__cta-desc">
              Consultez notre FAQ ou contactez-nous directement. Nous répondons sous 24h.
            </p>
          </div>
          <button onClick={() => navigate("/faq")} className="examples-page__cta-btn">
            Voir la FAQ
          </button>
        </section>

      </main>
    </div>
  );
}

export default ProductsPage;
