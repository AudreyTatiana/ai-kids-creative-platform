import Container from "./Container";

type StepCardProps = {
  title: string;
  description: string;
};

function StepCard({ title, description }: StepCardProps) {
  return (
    <div
      style={{
        background: "#f6f3ff",
        padding: "30px",
        borderRadius: "18px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: "60px",
          width: "60px",
          background: "#d8c8ff",
          borderRadius: "50%",
          margin: "0 auto 20px",
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
          />
          <StepCard
            title="Choisissez un thème"
            description="Conte, super-héros, pirate ou futuriste, laissez parler votre imagination."
          />
          <StepCard
            title="Visualisez un aperçu"
            description="Obtenez un aperçu magique avant de finaliser votre commande."
          />
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;