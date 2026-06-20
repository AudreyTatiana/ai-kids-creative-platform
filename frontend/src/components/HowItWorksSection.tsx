import Container from "./Container";
import televerse from "../assets/images/televerse.png";
import theme from "../assets/images/theme.png";
import recevCreation from "../assets/images/recev-creation.png";
import "./HowItWorksSection.css";

const steps = [
  {
    number: "1",
    title: "Téléversez 1-4 photos",
    description: "Importez facilement les photos de votre enfant en quelques secondes depuis votre appareil.",
    image: televerse,
  },
  {
    number: "2",
    title: "Choisissez un thème",
    description: "Conte, super-héros, pirate ou futuriste — laissez parler votre imagination.",
    image: theme,
  },
  {
    number: "3",
    title: "Recevez votre création",
    description: "Obtenez vos images personnalisées par email ou commandez un album physique.",
    image: recevCreation,
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
  image: string;
};

function StepCard({ number, title, description, image }: StepCardProps) {
  return (
    <div className="step-card">
      <div className="step-card__illustration">
        <span className="step-card__number">{number}</span>
        <img src={image} alt={title} className="step-card__image" />
      </div>
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__desc">{description}</p>
    </div>
  );
}

export default HowItWorksSection;
