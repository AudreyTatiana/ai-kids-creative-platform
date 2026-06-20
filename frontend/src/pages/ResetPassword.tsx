import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../api/auth";
import "./ResetPassword.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <Layout>
        <section className="reset-section">
          <div className="reset-invalid">
            <p className="reset-invalid__msg">Lien invalide ou manquant.</p>
            <Link to="/forgot-password" className="reset-invalid__link">
              Demander un nouveau lien
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const { res, data } = await resetPassword(token, password);
      if (!res.ok) { setError(data.message || "Erreur serveur."); return; }
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="reset-section">
        <Container>
          <div className="reset-card">
            <div className="reset-card__header">
              <h1 className="reset-card__title">Nouveau mot de passe</h1>
              <p className="reset-card__subtitle">
                Choisissez un mot de passe sécurisé d'au moins 12 caractères.
              </p>
            </div>

            {success ? (
              <div className="alert-success alert-success--mb">
                Mot de passe mis à jour ! Redirection vers la connexion...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reset-form">
                {error && (
                  <div className="alert-error">{error}</div>
                )}

                <div>
                  <label className="form-label">Nouveau mot de passe</label>
                  <div className="reset-form__password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Au moins 12 caractères"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input reset-form__password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="reset-form__eye-btn"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Répétez le mot de passe"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" disabled={loading} className="reset-form__submit-btn">
                  {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default ResetPassword;
