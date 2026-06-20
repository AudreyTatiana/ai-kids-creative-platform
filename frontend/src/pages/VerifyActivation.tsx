import { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyActivation } from "../api/auth";
import "./VerifyActivation.css";

function VerifyActivation() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string })?.email || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setError("Entrez les 6 chiffres du code reçu par email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { res, data } = await verifyActivation({ email: emailFromState, code });
      if (!res.ok) {
        setError(data.message || "Code invalide.");
        return;
      }
      setSuccess("Compte activé ! Redirection vers la connexion...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="verify-section">
        <Container>
          <div className="verify-card">
            <div className="verify-card__icon">✉️</div>
            <h1 className="verify-card__title">Vérifiez votre email</h1>
            <p className="verify-card__subtitle">
              Un code à 6 chiffres a été envoyé à <strong>{emailFromState || "votre adresse email"}</strong>.<br />
              Entrez-le ci-dessous pour activer votre compte.
            </p>

            {success && <div className="alert-success alert-success--mb">{success}</div>}
            {error && <div className="alert-error alert-error--mb">{error}</div>}

            <form onSubmit={handleSubmit} className="verify-form" autoComplete="off">
              <div className="verify-form__digits" onPaste={handlePaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="verify-form__digit-input"
                    autoComplete="off"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="verify-form__btn"
                disabled={loading || digits.join("").length < 6}
              >
                {loading ? "Vérification..." : "Activer mon compte"}
              </button>
            </form>

            <p className="verify-card__footer">
              Vous n'avez pas reçu le code ? Vérifiez vos spams.
            </p>
            <p className="verify-card__footer" style={{ marginTop: 8 }}>
              Compte activé ?{" "}
              <a href="/login" className="verify-card__link">Se connecter</a>
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default VerifyActivation;
