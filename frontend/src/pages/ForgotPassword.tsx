import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { res, data } = await forgotPassword(email);
      if (!res.ok) { setError(data.message || "Erreur serveur."); return; }
      setSent(true);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="forgot-section">
        <Container>
          <div className="forgot-card">
            <div className="forgot-card__header">
              <div className="forgot-card__icon">🔑</div>
              <h1 className="forgot-card__title">Mot de passe oublié</h1>
              <p className="forgot-card__subtitle">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            {sent ? (
              <div>
                <div className="alert-success alert-success--mb">
                  Si un compte existe avec cet email, vous recevrez un lien de réinitialisation sous peu.
                </div>
                <Link to="/login" className="forgot-card__back-link">
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="forgot-form">
                {error && (
                  <div className="alert-error">{error}</div>
                )}

                <div className="forgot-form__field">
                  <label className="form-label">Adresse email</label>
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" disabled={loading} className="forgot-form__submit-btn">
                  {loading ? "Envoi en cours..." : "Envoyer le lien"}
                </button>

                <Link to="/login" className="forgot-form__back-link">
                  Retour à la connexion
                </Link>
              </form>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default ForgotPassword;
