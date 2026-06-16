import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import { createPaymentSession } from "../api/payment";
import "./PaymentPage.css";

const PRICES: Record<string, number> = {
  "Pack d'images": 29.9,
  "Album Photo": 49.9,
  "Histoire personnalisée": 39.9,
};

function PaymentPage() {
  const navigate = useNavigate();
  const { project } = useAI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basePrice = PRICES[project.product] ?? 29.9;
  const fee = project.delivery === "physical" ? 5.9 : 0;
  const total = basePrice + fee;
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const { res, data } = await createPaymentSession({
        product: project.product,
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
                Procédez au paiement de votre création PetitsRêves en toute sécurité.
              </p>
            </div>

            <div className="payment-card__grid">
              <div className="payment-form-block">
                <h2 className="payment-form-block__title">Informations de paiement</h2>

                <div className="payment-form-block__fields">
                  <InputBlock label="Nom sur la carte" placeholder="Marie Dupont" />
                  <InputBlock label="Numéro de carte" placeholder="1234 5678 9012 3456" />

                  <div className="payment-form-block__two-cols">
                    <InputBlock label="Date d'expiration" placeholder="MM/AA" />
                    <InputBlock label="CVC" placeholder="123" />
                  </div>

                  <div className="billing-block">
                    <h3 className="billing-block__title">Adresse de facturation</h3>
                    <div className="billing-block__fields">
                      <InputBlock label="Adresse" placeholder="12 rue des Lilas" />
                      <div className="billing-block__two-cols">
                        <InputBlock label="Ville" placeholder="Paris" />
                        <InputBlock label="Code postal" placeholder="75015" />
                      </div>
                    </div>
                  </div>
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
                    <SecurityItem text="Données chiffrées" />
                    <SecurityItem text="Paiement protégé" />
                    <SecurityItem text="Confirmation par email" />
                  </div>
                </div>

                <div className="payment-note">
                  <p className="payment-note__text">
                    Votre réalisation sera générée en version finale après validation du paiement.
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

function InputBlock({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="payment-input-block">
      <label>{label}</label>
      <input placeholder={placeholder} />
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
