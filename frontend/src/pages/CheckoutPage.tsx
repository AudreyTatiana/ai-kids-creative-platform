import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import "./CheckoutPage.css";

const PRICES: Record<string, number> = {
  "Pack d'images": 29.9,
  "Album Photo": 49.9,
  "Histoire personnalisée": 39.9,
};
const DELIVERY_FEE = 5.9;

function CheckoutPage() {
  const navigate = useNavigate();
  const { project, setDelivery, setCustomer } = useAI();

  // Pré-remplir avec le compte connecté si l'email du projet est vide
  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

  const [delivery, setLocalDelivery] = useState<"email" | "physical">(project.delivery);
  const [firstName, setFirstName] = useState(project.customer.firstName || loggedInUser?.firstName || "");
  const [lastName, setLastName] = useState(project.customer.lastName || loggedInUser?.lastName || "");
  const [email, setEmail] = useState(project.customer.email || loggedInUser?.email || "");
  const [phone, setPhone] = useState(project.customer.phone || "");
  const [address, setAddress] = useState(project.customer.address || "");
  const [city, setCity] = useState(project.customer.city || "");
  const [postalCode, setPostalCode] = useState(project.customer.postalCode || "");
  const [country, setCountry] = useState(project.customer.country || "France");
  const [error, setError] = useState("");

  const basePrice = PRICES[project.product] ?? 29.9;
  const fee = delivery === "physical" ? DELIVERY_FEE : 0;
  const total = basePrice + fee;

  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  const handleContinue = () => {
    if (!firstName || !lastName || !email) {
      setError("Veuillez remplir les champs obligatoires (prénom, nom, email).");
      return;
    }
    if (delivery === "physical" && (!address || !city || !postalCode)) {
      setError("Veuillez remplir l'adresse de livraison (adresse, ville, code postal).");
      return;
    }
    setDelivery(delivery);
    setCustomer({ firstName, lastName, email, phone, address, city, postalCode, country });
    navigate("/payment");
  };

  return (
    <Layout>
      <Navbar />
      <section className="checkout-section">
        <Container>
          <div className="checkout-card">
            <div className="checkout-card__header">
              <p className="checkout-card__step">Étape 4 : Validation & paiement</p>
              <h1 className="checkout-card__title">Finalisez votre commande</h1>
              <p className="checkout-card__subtitle">Vérifiez vos informations, choisissez votre mode de livraison et passez au paiement.</p>
            </div>

            <div className="checkout-card__grid">
              <div className="checkout-left-col">
                {/* Aperçu de la création */}
                <div className="checkout-block">
                  <h2 className="checkout-block__title">Votre création</h2>
                  <div className="checkout-creation-preview">
                    {project.generatedImages[project.selectedImageIndex] ? (
                      <img
                        src={project.generatedImages[project.selectedImageIndex]}
                        alt="Aperçu"
                        className="checkout-creation-preview__img"
                      />
                    ) : (
                      <div className="checkout-creation-preview__placeholder" />
                    )}
                    <div>
                      <h3 className="checkout-creation-preview__product-title">{project.product || "Pack d'images"}</h3>
                      <p className="checkout-creation-preview__detail">Thème : {project.theme || "Conte"}</p>
                      <p className="checkout-creation-preview__detail">Aperçu choisi : Aperçu {project.selectedImageIndex + 1}</p>
                    </div>
                  </div>
                </div>

                {/* Mode de livraison */}
                <div className="checkout-block">
                  <h2 className="checkout-block__title">Mode de livraison</h2>
                  <div className="delivery-options">
                    <DeliveryCard
                      title="Version électronique"
                      subtitle={`Réception par email après paiement — Gratuit`}
                      selected={delivery === "email"}
                      onClick={() => setLocalDelivery("email")}
                    />
                    <DeliveryCard
                      title="Livraison à domicile"
                      subtitle={`Envoi physique — +${fmt(DELIVERY_FEE)} de frais`}
                      selected={delivery === "physical"}
                      onClick={() => setLocalDelivery("physical")}
                    />
                  </div>
                </div>

                {/* Informations client */}
                <div className="checkout-block">
                  <h2 className="checkout-block__title">Informations client</h2>
                  <div className="checkout-customer-grid">
                    <InputBlock label="Prénom *" placeholder="Marie" value={firstName} onChange={setFirstName} />
                    <InputBlock label="Nom *" placeholder="Dupont" value={lastName} onChange={setLastName} />
                    <InputBlock label="Email *" placeholder="marie@email.com" value={email} onChange={setEmail} />
                    <InputBlock label="Téléphone" placeholder="06 12 34 56 78" value={phone} onChange={setPhone} />
                  </div>
                </div>

                {/* Adresse de livraison — uniquement si livraison physique */}
                {delivery === "physical" && (
                  <div className="checkout-block">
                    <h2 className="checkout-block__title">Adresse de livraison</h2>
                    <div className="checkout-customer-grid">
                      <div style={{ gridColumn: "1 / -1" }}>
                        <InputBlock label="Adresse *" placeholder="12 rue des Lilas" value={address} onChange={setAddress} />
                      </div>
                      <InputBlock label="Ville *" placeholder="Paris" value={city} onChange={setCity} />
                      <InputBlock label="Code postal *" placeholder="75015" value={postalCode} onChange={setPostalCode} />
                      <InputBlock label="Pays" placeholder="France" value={country} onChange={setCountry} />
                    </div>
                  </div>
                )}
              </div>

              {/* Résumé */}
              <div className="checkout-right-col">
                <div className="checkout-summary">
                  <h3 className="checkout-summary__title">Résumé de commande</h3>
                  <div className="checkout-summary__rows">
                    <SummaryRow label="Produit" value={project.product || "Pack d'images"} />
                    <SummaryRow label="Thème" value={project.theme || "Conte"} />
                    <SummaryRow label="Livraison" value={delivery === "email" ? "Par email" : "À domicile"} />
                    <SummaryRow label="Sous-total" value={fmt(basePrice)} />
                    <SummaryRow label="Frais" value={fmt(fee)} />
                  </div>
                  <div className="checkout-summary__total-row">
                    <span className="checkout-summary__total-label">Total</span>
                    <span className="checkout-summary__total-value">{fmt(total)}</span>
                  </div>
                  {error && <p className="checkout-summary__error">{error}</p>}
                  <button onClick={handleContinue} className="checkout-summary__btn">
                    Continuer pour payer
                  </button>
                </div>

                <div className="checkout-note">
                  <p className="checkout-note__text">Votre réalisation sera conservée pendant 14 jours si le paiement n'est pas finalisé.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function DeliveryCard({ title, subtitle, selected, onClick }: { title: string; subtitle: string; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`delivery-card${selected ? " delivery-card--selected" : ""}`}>
      {selected && <div className="delivery-card__check">✓</div>}
      <h3 className="delivery-card__title">{title}</h3>
      <p className="delivery-card__subtitle">{subtitle}</p>
    </div>
  );
}

function InputBlock({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="checkout-input-block">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span className="summary-row__label">{label}</span>
      <span className="summary-row__value">{value}</span>
    </div>
  );
}

export default CheckoutPage;
