import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../api/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { res: response, data } = await loginUser(email, password);

      if (!response.ok) {
        setError(data.message || "Erreur de connexion");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user-logged-in"));

      setSuccess("Connexion réussie !");

      setTimeout(() => {
        if (redirectTo) {
          navigate(redirectTo);
        } else if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch {
      setError("Erreur serveur");
    }
  };

  return (
    <Layout>
      <section className="login-section">
        <Container>
          <div className="login-card">
            <div className="login-card__header">
              <p className="section-badge">Bienvenue</p>
              <h1 className="login-card__title">Connexion</h1>
              <p className="login-card__subtitle">Accédez à votre espace PetitsRêves</p>
            </div>

            {error && (
              <div className="alert-error alert-error--mb">{error}</div>
            )}

            {success && (
              <div className="alert-success alert-success--mb">{success}</div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div>
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

              <div>
                <div className="login-card__password-row">
                  <label className="form-label login-card__password-label">Mot de passe</label>
                  <Link to="/forgot-password" className="login-card__forgot-link">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="login-card__password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input login-card__password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="login-card__eye-btn"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-card__submit-btn">
                Se connecter
              </button>
            </form>

            <p className="login-card__footer">
              Pas encore de compte ?{" "}
              <Link to="/register" className="login-card__register-link">
                S'inscrire
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default Login;
