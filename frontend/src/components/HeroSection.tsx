import { useNavigate } from "react-router-dom";
import Container from "./Container";
import heroImage from "../assets/images/ui-pack.png";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/upload");
    } else {
      navigate("/login?redirect=/upload");
    }
  };

  return (
    <section className="hero">
      <Container>
        <div className="hero__grid">
          <div>
            <h1 className="hero__title">
              Transformez les photos de votre enfant en créations magiques
            </h1>

            <p className="hero__subtitle">
              Créez des images, albums photo et histoires personnalisées à partir
              de 2 à 4 photos.
            </p>

            <div className="hero__actions">
              <button className="hero__btn-primary" onClick={handleCreateProject}>Créer mon projet</button>
              <button className="hero__btn-secondary">Voir des exemples</button>
            </div>
          </div>

          <div className="hero__image-wrapper">
            <div className="hero__image-frame">
              <img
                src={heroImage}
                alt="Preview"
                className="hero__image"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
