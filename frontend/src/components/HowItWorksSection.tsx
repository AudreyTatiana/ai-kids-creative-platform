import Container from "./Container";
import exampleImage from "../assets/images/ui-pack.png";

type StepCardProps = {
  title: string;
  description: string;
  image: string;
  position: string;
};

function StepCard({ title, description, image, position }: StepCardProps) {
  return (
    <div
      style={{
        background: "#f6f3ff",
        padding: "20px",
        borderRadius: "18px",
        textAlign: "center",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          objectPosition: position,
          borderRadius: "14px",
          marginBottom: "20px",
          display: "block",
        }}
      />

      <h3
        style={{
          fontSize: "20px",
          color: "#3d3a6d",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "15px",
          color: "#6a678f",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section
      style={{
        padding: "70px 0",
        background: "#ffffff",
      }}
    >
      <Container>
        <h2
          style={{
            fontSize: "32px",
            color: "#3d3a6d",
            marginBottom: "40px",
            fontWeight: 800,
          }}
        >
          Comment ça marche ?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          <StepCard
            title="Téléversez 2-4 photos"
            description="Importez facilement les photos de votre enfant en quelques secondes."
            image={exampleImage}
            position="left center"
          />
          <StepCard
            title="Choisissez un thème"
            description="Conte, super-héros, pirate ou futuriste, laissez parler votre imagination."
            image={exampleImage}
            position="center center"
          />
          <StepCard
            title="Visualisez un aperçu"
            description="Obtenez un aperçu magique avant de finaliser votre commande."
            image={exampleImage}
            position="right center"
          />
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;