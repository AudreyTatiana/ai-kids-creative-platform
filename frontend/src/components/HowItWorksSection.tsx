import Container from "./Container";
import "./HowItWorksSection.css";

const steps = [
  {
    number: "1",
    title: "Téléversez 2-4 photos",
    description: "Importez facilement les photos de votre enfant en quelques secondes depuis votre appareil.",
    emoji: "📸",
    gradient: "linear-gradient(135deg, #fff3d5 0%, #ffd07a 100%)",
  },
  {
    number: "2",
    title: "Choisissez un thème",
    description: "Conte, super-héros, pirate ou futuriste — laissez parler votre imagination.",
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #e8d5ff 0%, #b89eff 100%)",
  },
  {
    number: "3",
    title: "Recevez votre création",
    description: "Obtenez vos images personnalisées par email ou commandez un album physique.",
    emoji: "✨",
    gradient: "linear-gradient(135deg, #d5ffe8 0%, #7ae8b0 100%)",
  },
];

function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <Container>
        <h2 className="how-it-works__title">Comment ça marche ?</h2>

        <div className="how-it-works__grid">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
};

function StepCard({ number, title, description, emoji, gradient }: StepCardProps) {
  return (
    <div className="step-card">
      <div className="step-card__illustration" style={{ background: gradient }}>
        <span className="step-card__emoji">{emoji}</span>
        <span className="step-card__number">{number}</span>
      </div>
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__desc">{description}</p>
    </div>
  );
}

export default HowItWorksSection;
