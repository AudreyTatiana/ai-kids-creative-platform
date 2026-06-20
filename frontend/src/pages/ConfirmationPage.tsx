import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import { confirmPayment } from "../api/payment";
import "./ConfirmationPage.css";

interface OrderData {
  orderNumber: string;
  product: string;
  theme: string;
  delivery: string;
  amount: number;
  email: string;
}

function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  useEffect(() => {
    if (!sessionId) { setError("Session introuvable."); setLoading(false); return; }
    let cancelled = false;
    confirmPayment(sessionId)
      .then((data) => {
        if (cancelled) return;
        if (data.orderNumber) setOrder(data);
        else setError(data.message || "Erreur de confirmation.");
      })
      .catch(() => { if (!cancelled) setError("Erreur réseau."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [sessionId]);

  if (loading) return (
    <Layout><Navbar />
      <section className="confirmation-loading">
        <p className="confirmation-loading__text">Confirmation de votre commande...</p>
      </section>
    </Layout>
  );

  if (error) return (
    <Layout><Navbar />
      <section className="confirmation-error">
        <div className="confirmation-error__inner">
          <p className="confirmation-error__msg">{error}</p>
          <Link to="/home" className="confirmation-error__link">Retour à l'accueil</Link>
        </div>
      </section>
    </Layout>
  );

  return (
    <Layout>
      <Navbar />

      <section className="confirmation-section">
        <Container>
          <div className="confirmation-card">
            <div className="confirmation-card__check-icon">✓</div>

            <p className="confirmation-card__label">Commande confirmée</p>

            <h1 className="confirmation-card__title">Merci pour votre commande ✨</h1>

            <p className="confirmation-card__subtitle">
              Votre paiement a bien été validé. Votre création PetitsRêves est en
              cours de préparation et vous recevrez bientôt les prochaines
              informations par email.
            </p>

            <div className="confirmation-card__info-grid">
              <InfoCard title="Numéro de commande" value={order ? `#${order.orderNumber}` : "—"} />
              <InfoCard title="Mode de livraison" value={order?.delivery === "email" ? "Version électronique par email" : "Livraison à domicile"} />
              <InfoCard title="Produit" value={order?.product || "—"} />
              <InfoCard title="Montant payé" value={order ? fmt(order.amount) : "—"} />
            </div>

            <div className="confirmation-card__steps-block">
              <h2 className="confirmation-card__steps-title">Prochaines étapes</h2>
              <div className="confirmation-card__steps-list">
                <StepItem text="Votre commande a été enregistrée." />
                <StepItem text="Votre création finale va être préparée." />
                <StepItem text="Vous recevrez un email de confirmation." />
                <StepItem text="Le lien de téléchargement vous sera envoyé une fois la commande prête." />
              </div>
            </div>

            <div className="confirmation-card__actions">
              <Link to="/account" className="confirmation-card__btn-primary">
                Voir mon compte
              </Link>
              <Link to="/home" className="confirmation-card__btn-secondary">
                Retour à l'accueil
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
    <div className="info-card">
      <p className="info-card__label">{title}</p>
      <p className="info-card__value">{value}</p>
    </div>
  );
}

function StepItem({ text }: { text: string }) {
  return (
    <div className="step-item">
      <span className="step-item__icon">✓</span>
      {text}
    </div>
  );
}

export default ConfirmationPage;
