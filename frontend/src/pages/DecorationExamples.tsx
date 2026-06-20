import Navbar from "../components/Navbar";
import "./Examples.css";

function DecorationExamples() {
  const examples = [
    {
      title: "Affiche murale personnalisée",
      description:
        "Visuel décoratif inspiré d'un thème choisi, pensé pour une chambre d'enfant douce et harmonieuse.",
    },
    {
      title: "Cadre souvenir",
      description:
        "Création imprimable à encadrer pour conserver un moment précieux sous une forme élégante.",
    },
    {
      title: "Décoration chambre enfant",
      description:
        "Illustration personnalisée pouvant être intégrée à l'univers visuel d'une chambre ou d'un espace enfant.",
    },
  ];

  return (
    <div className="examples-page">
      <Navbar />

      <main className="examples-page__main">
        <section className="examples-page__header">
          <h1 className="examples-page__title">Exemples décoration</h1>

          <p className="examples-page__subtitle">
            Quelques exemples de supports décoratifs simples pouvant être
            proposés à partir des créations personnalisées.
          </p>
        </section>

        <section className="examples-page__grid">
          {examples.map((example) => (
            <div key={example.title} className="example-page-card">
              <div className="example-page-card__visual">
                Mockup déco
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

export default DecorationExamples;
