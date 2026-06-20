import React, { useState } from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import { ChevronDown, ChevronUp, HelpCircle, X, Send } from 'lucide-react';
import { sendContactMessage } from '../api/contact';
import './FAQ.css';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-item__toggle-btn"
      >
        <span className="faq-item__question">
          <HelpCircle size={20} color="#E7A928" />
          {question}
        </span>
        {isOpen ? <ChevronUp size={20} color="#7a7699" /> : <ChevronDown size={20} color="#7a7699" />}
      </button>

      {isOpen && (
        <div className="faq-item__answer">
          {answer}
        </div>
      )}
    </div>
  );
};

function FAQ() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const faqs = [
    {
      question: "Qu'est-ce que PetitsRêves ?",
      answer: "PetitsRêves est une plateforme créative qui utilise l'intelligence artificielle pour transformer les photos de vos enfants en illustrations magiques et personnalisées, que vous pouvez ensuite imprimer sur divers supports."
    },
    {
      question: "Comment fonctionne la création par IA ?",
      answer: "C'est très simple ! Vous téléchargez une photo de votre enfant, vous choisissez un thème (conte de fées, espace, jungle, etc.), et notre IA génère une image unique en conservant les traits de votre enfant dans un style artistique doux."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Le traitement numérique par l'IA est quasi instantané. Pour les produits physiques (albums, affiches, coffrets), il faut compter 3 à 5 jours ouvrés pour la fabrication et 2 à 3 jours pour la livraison à domicile."
    },
    {
      question: "Les produits sont-ils personnalisables ?",
      answer: "Absolument ! En plus de l'image générée par IA, vous pouvez ajouter le prénom de l'enfant, une date spéciale ou un petit message personnel sur la plupart de nos supports."
    },
    {
      question: "Mes photos sont-elles sécurisées ?",
      answer: "La sécurité et la confidentialité sont nos priorités. Vos photos sont utilisées uniquement pour générer vos créations et sont supprimées de nos serveurs après traitement, sauf si vous décidez de les enregistrer dans votre compte."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les principales cartes bancaires (Visa, MasterCard, American Express) ainsi que les règlements via PayPal pour une sécurité maximale."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    try {
      const { res: response } = await sendContactMessage(email, message);

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.");
      }

      setIsSent(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSent(false);
        setMessage("");
        setEmail("");
        setIsSending(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <Navbar />

      <section className="faq-section">
        <Container>
          <div className="faq-section__header">
            <p className="faq-section__badge">Aide & Support</p>
            <h1 className="faq-section__title">Questions Fréquentes</h1>
            <p className="faq-section__subtitle">
              Vous avez des questions sur PetitsRêves ? Nous avons les réponses pour vous aider à créer des moments magiques.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="faq-contact-box">
            <h3 className="faq-contact-box__title">Encore des questions ?</h3>
            <p className="faq-contact-box__subtitle">Notre équipe est là pour vous aider du lundi au vendredi.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="faq-contact-box__btn"
            >
              Contactez-nous
            </button>
          </div>
        </Container>
      </section>

      {isModalOpen && (
        <div className="faq-modal-overlay">
          <div className="faq-modal">
            <button
              onClick={() => { setIsModalOpen(false); setError(""); }}
              className="faq-modal__close-btn"
            >
              <X size={20} />
            </button>

            <h2 className="faq-modal__title">Contactez-nous</h2>
            <p className="faq-modal__subtitle">
              Posez-nous votre question, nous vous répondrons par email sous 24h.
            </p>

            {error && (
              <div className="faq-modal__error">{error}</div>
            )}

            {isSent ? (
              <div className="faq-modal__success">
                <div className="faq-modal__success-icon">
                  <Send size={30} />
                </div>
                Confirmation envoyée !<br />Vérifiez votre boîte mail.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="faq-modal__form">
                <div>
                  <label className="form-label">Votre adresse email</label>
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Votre message</label>
                  <textarea
                    placeholder="Comment pouvons-nous vous aider ?"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-input faq-modal__textarea"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="faq-modal__submit-btn"
                >
                  {isSending ? "Envoi en cours..." : "Envoyer mon message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default FAQ;
