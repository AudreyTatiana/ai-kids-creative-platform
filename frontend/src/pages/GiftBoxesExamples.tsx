import Navbar from "../components/Navbar";
import "./Examples.css";

function GiftBoxesExamples() {
  const examples = [
    {
      title: "Coffret naissance",
      description:
        "Regroupement de créations personnalisées pensées comme un cadeau doux et mémorable.",
    },
    {
      title: "Pack anniversaire",
      description:
        "Ensemble cadeau avec plusieurs supports pour marquer un événement important de façon originale.",
    },
    {
      title: "Cadeau personnalisé",
      description:
        "Offre visuelle prête à offrir, conçue autour d'un souvenir ou d'une occasion familiale.",
    },
  ];

  return (
    <div className="examples-page">
      <Navbar />

      <main className="examples-page__main">
        <section className="examples-page__header">
          <h1 className="examples-page__title">Exemples coffrets &amp; cadeaux</h1>

          <p className="examples-page__subtitle">
            Des exemples simples de coffrets et de cadeaux visuels à proposer
            dans l'univers PetitsRêves.
          </p>
        </section>

        <section className="examples-page__grid">
          {examples.map((example) => (
            <div key={example.title} className="example-page-card">
              <div className="example-page-card__visual">
                Mockup coffret
              </div>

              <div className="example-page-card__body">
                <h2 className="example-page-card__title">{example.title}</h2>
                <p className="example-page-card__desc">{example.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default GiftBoxesExamples;
