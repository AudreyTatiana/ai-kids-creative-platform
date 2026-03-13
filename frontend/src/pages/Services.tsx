import Layout from "../components/Layout";
import Container from "../components/Container";

function Services() {
  const services = [
    {
      icon: "🎨",
      title: "Créations IA",
      description:
        "Transformez les photos de votre enfant en univers féeriques, doux et uniques selon le thème de votre choix.",
      badge: "Le plus aimé",
      button: "Découvrir",
    },
    {
      icon: "📖",
      title: "Albums & Livres",
      description:
        "Souvenirs durables sous forme d’albums photo et de livres illustrés personnalisés pour conserver les plus beaux moments.",
      badge: "Papier premium",
      button: "Découvrir",
    },
    {
      icon: "🧿",
      title: "Décoration",
      description:
        "Affiches et objets personnalisés pour une chambre apaisante et pleine de poésie.",
      badge: "Coup de cœur",
      button: "Découvrir",
    },
    {
      icon: "🎁",
      title: "Coffrets & Cadeaux",
      description:
        "Coffrets pensés pour offrir : naissance, anniversaire, baptême ou souvenirs précieux à partager.",
      badge: "Idée cadeau",
      button: "Découvrir",
    },
  ];

  return (
    <Layout>
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #fffdfd 0%, #f8f5ff 100%)",
          padding: "70px 0 90px",
        }}
      >
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "44px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                color: "#d4a017",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.4px",
                textTransform: "uppercase",
              }}
            >
              PetitsRêves
            </p>

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "42px",
                color: "#3d3a6d",
                fontWeight: 800,
              }}
            >
              Nos services
            </h1>

            <p
              style={{
                margin: "0 auto",
                maxWidth: "700px",
                color: "#7a7699",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Des créations uniques pensées pour préserver vos plus beaux
              souvenirs et offrir à chaque enfant un univers tendre, magique et
              personnalisé.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            <div style={{ gridColumn: "1 / 2" }}>
              <ServiceCard {...services[3]} />
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
};

function ServiceCard({
  icon,
  title,
  description,
  badge,
  button,
}: ServiceCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "28px 24px",
        boxShadow: "0 12px 30px rgba(117, 100, 170, 0.08)",
        border: "1px solid #f0ebfa",
        textAlign: "center",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            width: "58px",
            height: "58px",
            margin: "0 auto 18px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #fff1bf 0%, #ffe0a8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
          }}
        >
          {icon}
        </div>

        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "22px",
            color: "#3d3a6d",
            fontWeight: 800,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "0 auto 18px",
            maxWidth: "280px",
            color: "#7a7699",
            fontSize: "15px",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>

      <div>
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "#f6f1ff",
            color: "#8a78c7",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          {badge}
        </div>

        <div>
          <button
            style={{
              background: "#ffffff",
              color: "#6d67a0",
              border: "1px solid #ddd4f2",
              borderRadius: "999px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services;