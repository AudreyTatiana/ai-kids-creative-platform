import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAI } from "../context/AIContext";
import { createPaymentSession } from "../api/payment";
import "./PaymentPage.css";

const PRICES: Record<string, number> = {
  "Pack d'images": 29.9,
  "Cartes Alphabet": 34.9,
  "Album Photo Magique": 49.9,
  "Livre d'Aventure": 39.9,
};

function PaymentPage() {
  const { project } = useAI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basePrice = PRICES[project.product] ?? 29.9;
  const fee = project.delivery === "physical" ? 5.9 : 0;
  const total = basePrice + fee;
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  const handlePay = async () => {
    if (!project.customer?.email) {
      setError("Informations manquantes. Veuillez revenir à l'étape précédente.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { res, data } = await createPaymentSession({
        product: project.product || "Pack d'images",
        theme: project.theme,
        delivery: project.delivery,
        amount: total,
        customer: project.customer,
        generatedImages: project.generatedImages,
      });
      if (!res.ok) throw new Error(data.message || "Erreur Stripe.");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />

      <section className="payment-section">
        <Container>
          <div className="payment-card">
            <div className="payment-card__header">
              <p className="payment-card__label">Paiement sécurisé</p>
              <h1 className="payment-card__title">Finalisez votre achat</h1>
              <p className="payment-card__subtitle">
                Procédez au paiement de votre création PetitsRêves en toute sécurité via Stripe.
              </p>
            </div>

            <div className="payment-card__grid">
              <div className="payment-form-block">
                <h2 className="payment-form-block__title">Récapitulatif client</h2>

                <div className="payment-customer-info">
                  <InfoRow label="Prénom" value={project.customer.firstName} />
                  <InfoRow label="Nom" value={project.customer.lastName} />
                  <InfoRow label="Email" value={project.customer.email} />
                  {project.customer.phone && (
                    <InfoRow label="Téléphone" value={project.customer.phone} />
                  )}
                  {project.delivery === "physical" && project.customer.address && (
                    <InfoRow
                      label="Adresse"
                      value={`${project.customer.address}, ${project.customer.postalCode} ${project.customer.city}`}
                    />
                  )}
                </div>

                <div className="payment-stripe-info">
                  <p className="payment-stripe-info__title">Comment ça fonctionne ?</p>
                  <p className="payment-stripe-info__text">
                    En cliquant sur "Payer en toute sécurité", vous serez redirigé vers la page de
                    paiement sécurisée de Stripe. Vos informations bancaires sont traitées
                    directement par Stripe et ne sont jamais transmises à PetitsRêves.
                  </p>
                </div>
              </div>

              <div className="payment-right-col">
                <div className="payment-summary">
                  <h2 className="payment-summary__title">Résumé</h2>

                  <div className="payment-summary__rows">
                    <SummaryRow label="Produit" value={project.product || "Pack d'images"} />
                    <SummaryRow label="Thème" value={project.theme || "Conte"} />
                    <SummaryRow label="Livraison" value={project.delivery === "email" ? "Par email" : "À domicile"} />
                    <SummaryRow label="Sous-total" value={fmt(basePrice)} />
                    <SummaryRow label="Frais" value={fmt(fee)} />
                  </div>

                  <div className="payment-summary__total">
                    <span className="payment-summary__total-label">Total</span>
                    <span className="payment-summary__total-value">{fmt(total)}</span>
                  </div>

                  {error && <p className="payment-summary__error">{error}</p>}

                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="payment-summary__pay-btn"
                  >
                    {loading ? "Redirection vers Stripe..." : "Payer en toute sécurité"}
                  </button>
                </div>

                <div className="payment-security">
                  <h3 className="payment-security__title">Paiement 100% sécurisé</h3>
                  <div className="payment-security__list">
                    <SecurityItem text="Données chiffrées SSL" />
                    <SecurityItem text="Paiement géré par Stripe" />
                    <SecurityItem text="Confirmation par email" />
                  </div>
                </div>

                <div className="payment-note">
                  <p className="payment-note__text">
                    Votre réalisation sera conservée pendant 14 jours si le paiement n'est pas finalisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="payment-info-row">
      <span className="payment-info-row__label">{label}</span>
      <span className="payment-info-row__value">{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="payment-summary__row">
      <span className="payment-summary__row-label">{label}</span>
      <span className="payment-summary__row-value">{value}</span>
    </div>
  );
}

function SecurityItem({ text }: { text: string }) {
  return (
    <div className="payment-security__item">
      <span className="payment-security__item-icon">✓</span>
      {text}
    </div>
  );
}

export default PaymentPage;
