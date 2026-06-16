import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Compte à rebours + redirection après inscription réussie
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const checks = useMemo(
    () => ({
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[^A-Za-z\d]/.test(password),
    }),
    [password]
  );

  const isPasswordValid =
    checks.length &&
    checks.lowercase &&
    checks.uppercase &&
    checks.number &&
    checks.symbol;

  const canSubmit = isPasswordValid && acceptedTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un symbole."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      const { res: response, data } = await registerUser({ firstName, lastName, email, password });

      if (!response.ok) {
        setErrorMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setSuccessMessage("Inscription réussie !");
      setErrorMessage("");
      setCountdown(3);
    } catch {
      setErrorMessage("Impossible de contacter le serveur.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="register-section">
        <Container>
          <div className="register-card">
            <div className="register-card__header">
              <p className="section-badge">Nouveau compte</p>
              <h1 className="register-card__title">Inscription</h1>
              <p className="register-card__subtitle">
                Créez votre compte pour lancer votre projet créatif personnalisé.
              </p>
            </div>

            {successMessage && (
              <div className="alert-success alert-success--mb">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert-error alert-error--mb">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-form__two-cols">
                <div>
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="form-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="form-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Mot de passe</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Choisissez un mot de passe"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                <div className="password-rules">
                  <PasswordRule valid={checks.length} text="Au moins 12 caractères" />
                  <PasswordRule valid={checks.lowercase} text="Au moins une minuscule" />
                  <PasswordRule valid={checks.uppercase} text="Au moins une majuscule" />
                  <PasswordRule valid={checks.number} text="Au moins un chiffre" />
                  <PasswordRule valid={checks.symbol} text="Au moins un symbole" />
                </div>
              </div>

              <div>
                <label className="form-label">Confirmer le mot de passe</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez votre mot de passe"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <label className="register-form__terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="register-form__terms-checkbox"
                />
                <span>
                  J'accepte les{" "}
                  <a href="/cgu" target="_blank" className="register-card__login-link">
                    Conditions Générales d'Utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="/rgpd" target="_blank" className="register-card__login-link">
                    Politique de confidentialité (RGPD)
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="register-form__submit-btn"
                disabled={loading || !canSubmit}
                title={!acceptedTerms ? "Veuillez accepter les CGU et la RGPD pour continuer" : undefined}
              >
                {loading ? "Création du compte..." : "Créer mon compte"}
              </button>
            </form>

            <p className="register-card__footer">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="register-card__login-link">
                Connectez-vous
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function PasswordRule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className={valid ? "password-rule password-rule--valid" : "password-rule password-rule--invalid"}>
      <span className={valid ? "password-rule__icon password-rule__icon--valid" : "password-rule__icon password-rule__icon--invalid"}>
        {valid ? "✓" : "•"}
      </span>
      {text}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default Register;
