import Container from "./Container";
import "./ExamplesSection.css";

const examples = [
  {
    title: "Univers féerique",
    description: "Votre enfant devient le héros d'un conte enchanté",
    emoji: "🧚",
    gradient: "linear-gradient(135deg, #e8d5ff 0%, #c4a0ff 100%)",
  },
  {
    title: "Aventure pirate",
    description: "Cap sur les mers, votre enfant prend le large",
    emoji: "🏴‍☠️",
    gradient: "linear-gradient(135deg, #d5eeff 0%, #7ec8f8 100%)",
  },
  {
    title: "Super-héros",
    description: "Transformez votre enfant en héros invincible",
    emoji: "🦸",
    gradient: "linear-gradient(135deg, #ffd5e8 0%, #ff99cc 100%)",
  },
];

function ExamplesSection() {
  return (
    <section className="examples-section">
      <Container>
        <h2 className="examples-section__title">Exemples de créations</h2>

        <div className="examples-section__grid">
          {examples.map((ex) => (
            <ExampleCard key={ex.title} {...ex} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type ExampleCardProps = {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
};

function ExampleCard({ title, description, emoji, gradient }: ExampleCardProps) {
  return (
    <div className="example-card">
      <div className="example-card__illustration" style={{ background: gradient }}>
        <span className="example-card__emoji">{emoji}</span>
      </div>
      <div className="example-card__body">
        <h3 className="example-card__title">{title}</h3>
        <p className="example-card__desc">{description}</p>
      </div>
    </div>
  );
}

export default ExamplesSection;
