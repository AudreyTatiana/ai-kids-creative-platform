import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import feerique from "../assets/images/feerique.png";
import magique from "../assets/images/magique.png";
import herosHistoire from "../assets/images/herosHistoire.png";
import princesse from "../assets/images/princesse.png";
import heros from "../assets/images/heros.png";
import pirate from "../assets/images/pirate.png";
import "./Examples.css";

const examples = [
  {
    image: feerique,
    title: "Univers féerique",
    description: "Transformation d'une photo d'enfant en scène magique pastel avec château, lumière douce et ambiance conte.",
  },
  {
    image: magique,
    title: "Aventure magique",
    description: "L'enfant devient explorateur dans un univers imaginaire avec paysages enchanteurs et décor immersif.",
  },
  {
    image: herosHistoire,
    title: "Héros d'histoire",
    description: "Création d'un portrait stylisé où l'enfant devient le personnage principal d'un récit illustré.",
  },
  {
    image: princesse,
    title: "Style princesse",
    description: "Rendu élégant et poétique inspiré des univers royaux et des contes visuels pour enfants.",
  },
  {
    image: heros,
    title: "Style super-héros",
    description: "Transformation en héros moderne avec costume, lumière dynamique et décor d'action.",
  },
  {
    image: pirate,
    title: "Style pirate",
    description: "Ambiance aventure en mer avec navire, trésor et décor d'exploration adapté aux enfants.",
  },
];

function AIExamples() {
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
          <h1 className="examples-page__title">Exemples de créations IA</h1>
          <p className="examples-page__subtitle">
            Découvrez différents styles de rendus générés à partir des photos
            d'enfants. Ces exemples illustrent la richesse visuelle
            du service de création IA proposé par PetitsRêves.
          </p>
        </section>

        <section className="examples-page__grid">
          {examples.map((example) => (
            <div key={example.title} className="example-page-card">
              <div className="example-page-card__visual">
                <img src={example.image} alt={example.title} className="example-page-card__img" />
              </div>
              <div className="example-page-card__body">
                <h2 className="example-page-card__title">{example.title}</h2>
                <p className="example-page-card__desc">{example.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="examples-page__cta">
          <div>
            <h3 className="examples-page__cta-title">Lancez votre propre création</h3>
            <p className="examples-page__cta-desc">
              Choisissez un thème, importez 1 à 4 photos et démarrez votre projet personnalisé.
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

export default AIExamples;
