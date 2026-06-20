import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Examples.css";

function AlbumsExamples() {
  const navigate = useNavigate();

  const examples = [
    {
      title: "Album souvenir illustré",
      description:
        "Compilation de plusieurs images personnalisées dans un album harmonisé, prêt à être imprimé ou partagé.",
    },
    {
      title: "Livre personnalisé",
      description:
        "Chaque page raconte une histoire où l'enfant devient le héros principal d'un univers imaginé sur mesure.",
    },
    {
      title: "Livre cadeau",
      description:
        "Format idéal pour un anniversaire, une naissance ou un souvenir familial à conserver durablement.",
    },
    {
      title: "Album premium",
      description:
        "Version plus élégante avec une mise en page raffinée, des fonds doux et un rendu haut de gamme.",
    },
    {
      title: "Mini livre narratif",
      description:
        "Petit format illustré, parfait pour une histoire courte et immersive autour d'un thème choisi.",
    },
    {
      title: "Album événement",
      description:
        "Conçu pour immortaliser un moment précis : anniversaire, baptême, première rentrée ou fête familiale.",
    },
  ];

  return (
    <div className="examples-page">
      <Navbar />

      <main className="examples-page__main">
        <section className="examples-page__header">
          <p className="examples-page__badge">PETITSRÊVES</p>

          <h1 className="examples-page__title">Exemples d'albums &amp; livres</h1>

          <p className="examples-page__subtitle">
            Découvrez comment les créations peuvent être transformées en albums
            photo ou en livres personnalisés, pensés comme de vrais souvenirs
            durables et émotionnels.
          </p>
        </section>

        <section className="examples-page__grid">
          {examples.map((example) => (
            <div key={example.title} className="example-page-card">
              <div className="example-page-card__visual">
                Exemple album
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
              Créez un album ou un livre personnalisé à partir de vos photos et d'un thème choisi.
            </p>
          </div>

          <button onClick={() => navigate("/upload")} className="examples-page__cta-btn">
            Créer mon projet
          </button>
        </section>
      </main>
    </div>
  );
}

export default AlbumsExamples;
