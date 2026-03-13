import Container from "./Container";
import exampleImage from "../assets/images/ui-pack.png";

function ExamplesSection() {
  return (
    <section
      style={{
        padding: "60px 0",
        background: "#fcfbff",
      }}
    >
      <Container>
        <h2
          style={{
            fontSize: "32px",
            color: "#3d3a6d",
            marginBottom: "30px",
            fontWeight: 800,
          }}
        >
          Exemples de créations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <ExampleCard
            title="Univers féerique"
            image={exampleImage}
            position="left center"
          />
          <ExampleCard
            title="Aventure magique"
            image={exampleImage}
            position="center center"
          />
          <ExampleCard
            title="Héros d’histoire"
            image={exampleImage}
            position="right center"
          />
        </div>
      </Container>
    </section>
  );
}

type ExampleCardProps = {
  title: string;
  image: string;
  position: string;
};

function ExampleCard({ title, image, position }: ExampleCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(117, 100, 170, 0.12)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          objectPosition: position,
          display: "block",
        }}
      />

      <div style={{ padding: "16px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#3d3a6d",
            fontWeight: 700,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

export default ExamplesSection;