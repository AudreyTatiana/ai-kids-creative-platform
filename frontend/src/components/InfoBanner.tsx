import Container from "./Container";
import "./InfoBanner.css";

function InfoBanner() {
  return (
    <section className="info-banner">
      <Container>
        <div className="info-banner__box">
          <p className="info-banner__text">
            Certaines photos peuvent sembler sombres. Vous pouvez continuer,
            mais le rendu pourrait être moins bon.
          </p>

          <button className="info-banner__btn">Continuer</button>
        </div>
      </Container>
    </section>
  );
}

export default InfoBanner;
