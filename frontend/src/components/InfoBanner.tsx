import type { CSSProperties } from "react";
import Container from "./Container";

const buttonStyle: CSSProperties = {
  background: "#f6b93b",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 22px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

function InfoBanner() {
  return (
    <section
      style={{
        padding: "30px 0 70px",
        background: "#fcfbff",
      }}
    >
      <Container>
        <div
          style={{
            background: "#fff8ef",
            border: "1px solid #f3dfb6",
            borderRadius: "18px",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#6a678f",
              lineHeight: 1.6,
            }}
          >
            Certaines photos peuvent sembler sombres. Vous pouvez continuer,
            mais le rendu pourrait être moins bon.
          </p>

          <button style={buttonStyle}>Continuer</button>
        </div>
      </Container>
    </section>
  );
}

export default InfoBanner;