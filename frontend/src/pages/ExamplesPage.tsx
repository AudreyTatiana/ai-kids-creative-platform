import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import packImages from "../assets/images/pack-images.png";
import albumPhotos from "../assets/images/album-photos.png";
import histoirePersonnalisee from "../assets/images/histoire-personalisee.png";
import enfantLettreAlphabet from "../assets/images/enfant-lettre-aplhabet.png";
import bebeFruit from "../assets/images/bebe-fruit.png";
import "./Examples.css";

const creations = [
  {
    image: packImages,
    title: "Pack d'images",
    description: "4 illustrations IA uniques de votre enfant dans l'univers de votre choix. Reçues par email en haute résolution, prêtes à imprimer.",
    badge: "Le plus populaire",
    themes: ["Conte", "Super-héros", "Pirate", "Astronaute", "Princesse", "Chevalier"],
  },
  {
    image: albumPhotos,
    title: "Album photos magique",
    description: "Un album photo luxueux imprimé sur papier premium avec votre enfant illustré en héros de son propre univers. Livré chez vous.",
    badge: "Coup de cœur",
    themes: ["Conte", "Univers féerique", "Aventure", "Safari", "Princesse"],
  },
  {
    image: histoirePersonnalisee,
    title: "Histoire personnalisée",
    description: "Un livre illustré sur mesure où votre enfant est le héros de sa propre aventure. Chaque page raconte une histoire unique avec son prénom.",
    badge: "Idée cadeau",
    themes: ["Chevalier", "Astronaute", "Super-héros", "Fée", "Pirate"],
  },
  {
    image: enfantLettreAlphabet,
    title: "Cartes alphabet illustrées",
    description: "Un set de cartes alphabet aquarelle où votre enfant explore chaque lettre aux côtés d'un animal. Parfait pour apprendre en s'amusant.",
    badge: "Éducatif & Magique",
    themes: ["Animaux", "Nature", "Aquarelle", "Apprentissage"],
  },
  {
    image: bebeFruit,
    title: "Suivi mensuel bébé",
    description: "Immortalisez chaque mois de la première année de bébé dans un décor fruité et coloré. Un souvenir tendre à chérir pour toujours.",
    badge: "Spécial naissance",
    themes: ["Bébé", "Mensuel", "Fruits", "Coloré", "Souvenir"],
  },
];

function ExamplesPage() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
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
          <h1 className="examples-page__title">Exemples de créations</h1>
          <p className="examples-page__subtitle">
            Découvrez ce que PetitsRêves peut créer à partir des photos de votre enfant.
            Chaque création est unique, personnalisée et réalisée grâce à l'intelligence artificielle.
          </p>
        </section>

        <div className="examples-page__grid">
          {creations.map((item) => (
            <div key={item.title} className="example-page-card">
              <div className="example-page-card__visual">
                <img
                  src={item.image}
                  alt={item.title}
                  className="example-page-card__img"
                />
              </div>
              <div className="example-page-card__body">
                <span className="example-page-card__badge-pill">{item.badge}</span>
                <h2 className="example-page-card__title">{item.title}</h2>
                <p className="example-page-card__desc">{item.description}</p>
                <div className="example-page-card__themes">
                  {item.themes.map((t) => (
                    <span key={t} className="example-page-card__theme-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="examples-page__cta">
          <div>
            <h3 className="examples-page__cta-title">Prêt à créer votre chef-d'œuvre ?</h3>
            <p className="examples-page__cta-desc">
              Importez 1 à 4 photos de votre enfant, choisissez un thème et laissez la magie opérer en quelques minutes.
            </p>
          </div>
          <button onClick={handleCreateProject} className="examples-page__cta-btn">
            Créer mon projet
          </button>
        </section>

      </main>
    </div>
  );
}

export default ExamplesPage;
