import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function ConfirmationPage() {
  return (
    <Layout>
      <Navbar />

      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)",
          padding: "48px 0 80px",
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "28px",
              padding: "36px",
              boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)",
              border: "1px solid #efe9fb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "86px",
                height: "86px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7edfa2 0%, #b8f0c9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "34px",
                fontWeight: 800,
              }}
            >
              ✓
            </div>

            <p
              style={{
                margin: "0 0 10px",
                color: "#8c84c6",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Commande confirmée
            </p>

            <h1
              style={{
                margin: "0 0 12px",
                color: "#3d3a6d",
                fontSize: "38px",
                fontWeight: 800,
              }}
            >
              Merci pour votre commande ✨
            </h1>

            <p
              style={{
                margin: "0 auto 28px",
                maxWidth: "620px",
                color: "#7a7699",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              Votre paiement a bien été validé. Votre création PetitsRêves est en
              cours de préparation et vous recevrez bientôt les prochaines
              informations par email.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                textAlign: "left",
                marginBottom: "28px",
              }}
            >
              <InfoCard
                title="Numéro de commande"
                value="#PR-2026-00128"
              />
              <InfoCard
                title="Mode de livraison"
                value="Version électronique par email"
              />
              <InfoCard
                title="Produit"
                value="Pack d'images"
              />
              <InfoCard
                title="Montant payé"
                value="29,90€"
              />
            </div>

            <div
              style={{
                background: "#faf8ff",
                borderRadius: "22px",
                padding: "22px",
                border: "1px solid #eee8fb",
                marginBottom: "28px",
                textAlign: "left",
              }}
            >
              <h2
                style={{
                  margin: "0 0 14px",
                  color: "#3d3a6d",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                Prochaines étapes
              </h2>

              <div style={{ display: "grid", gap: "12px" }}>
                <StepItem text="Votre commande a été enregistrée." />
                <StepItem text="Votre création finale va être préparée." />
                <StepItem text="Vous recevrez un email de confirmation." />
                <StepItem text="Le lien de téléchargement vous sera envoyé une fois la commande prête." />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/account" style={primaryLinkStyle}>
                Voir mon compte
              </Link>

              <Link to="/" style={secondaryLinkStyle}>
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "18px",
        border: "1px solid #eee8fb",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          color: "#8f89b2",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {title}
      </p>

      <p
        style={{
          margin: 0,
          color: "#3d3a6d",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: 1.6,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StepItem({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        color: "#5f5989",
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: 1.7,
      }}
    >
      <span
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "#ebfff1",
          color: "#1f9d57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 700,
          flexShrink: 0,
          marginTop: "2px",
        }}
      >
        ✓
      </span>
      {text}
    </div>
  );
}

const primaryLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  background: "#f6b93b",
  color: "#fff",
  borderRadius: "14px",
  padding: "14px 20px",
  fontSize: "15px",
  fontWeight: 700,
};

const secondaryLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  borderRadius: "14px",
  padding: "14px 20px",
  fontSize: "15px",
  fontWeight: 700,
};

export default ConfirmationPage;