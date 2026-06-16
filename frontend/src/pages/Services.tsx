import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Services.css";

function Services() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const services = [
    {
      icon: "🎨",
      title: "Créations IA",
      description:
        "Transformez les photos de votre enfant en univers féeriques, doux et uniques selon le thème de votre choix.",
      badge: "Le plus aimé",
      button: "Découvrir",
      action: () => navigate("/services/ia-examples"),
    },
    {
      icon: "📖",
      title: "Albums & Livres",
      description:
        "Souvenirs durables sous forme d'albums photo et de livres illustrés personnalisés pour conserver les plus beaux moments.",
      badge: "Papier premium",
      button: "Découvrir",
      action: () => navigate("/services/albums-examples"),
    },
    {
      icon: "🧿",
      title: "Décoration",
      description:
        "Affiches et objets personnalisés pour une chambre apaisante et pleine de poésie.",
      badge: "Coup de cœur",
      button: "Découvrir",
      action: () => navigate("/services/decoration-examples"),
    },
    {
      icon: "🎁",
      title: "Coffrets & Cadeaux",
      description:
        "Coffrets pensés pour offrir : naissance, anniversaire, baptême ou souvenirs précieux à partager.",
      badge: "Idée cadeau",
      button: "Découvrir",
      action: () => navigate("/services/gift-examples"),
    },
  ];

  return (
    <Layout>
      <Navbar />

      <section className="services-section">
        <Container>
          <div className="services-section__header">
            <p className="services-section__badge">PETITSRÊVES</p>

            <h1 className="services-section__title">Nos services</h1>

            <p className="services-section__subtitle">
              Des créations uniques pensées pour préserver vos plus beaux
              souvenirs et offrir à chaque enfant un univers tendre, magique et
              personnalisé.
            </p>
          </div>

          <div className="services-grid">
            <ServiceCard {...services[0]} onAddToCart={addToCart} />
            <ServiceCard {...services[1]} onAddToCart={addToCart} />
            <ServiceCard {...services[2]} onAddToCart={addToCart} />

            <div className="services-grid__centered">
              <ServiceCard {...services[3]} onAddToCart={addToCart} />
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  badge: string;
  button: string;
  action: () => void;
  onAddToCart: () => void;
};

function ServiceCard({
  icon,
  title,
  description,
  badge,
  button,
  action,
  onAddToCart,
}: ServiceCardProps) {
  return (
    <div className="service-card">
      <div>
        <div className="service-card__icon">{icon}</div>

        <h2 className="service-card__title">{title}</h2>

        <p className="service-card__desc">{description}</p>
      </div>

      <div>
        <div className="service-card__badge">{badge}</div>

        <div className="service-card__actions">
          <button onClick={action} className="service-card__btn-discover">
            {button}
          </button>

          <button onClick={onAddToCart} className="service-card__btn-add">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services;
