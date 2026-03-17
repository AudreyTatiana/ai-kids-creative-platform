import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setSuccessMessage("Inscription réussie avec succès.");
      setErrorMessage("");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage("Impossible de contacter le serveur.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f6f1ff 0%, #eef5ff 100%)",
          padding: "40px 0",
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: "760px",
              width: "100%",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "28px",
              padding: "42px",
              boxShadow: "0 18px 40px rgba(117, 100, 170, 0.14)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#f6b93b",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Nouveau compte
              </p>

              <h1
                style={{
                  margin: "0 0 10px",
                  fontSize: "38px",
                  color: "#3d3a6d",
                  fontWeight: 800,
                }}
              >
                Inscription
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#6a678f",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                Créez votre compte pour lancer votre projet créatif personnalisé.
              </p>
            </div>

            {successMessage && (
              <div style={successBoxStyle}>{successMessage}</div>
            )}

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
              <div style={gridTwoCols}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    style={inputStyle}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Nom</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    style={inputStyle}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Adresse email</label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle}>Mot de passe</label>
                <input
                  type="password"
                  placeholder="Choisissez un mot de passe"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div
                  style={{
                    marginTop: "12px",
                    background: "#faf8ff",
                    border: "1px solid #eee8fb",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <PasswordRule
                    valid={checks.length}
                    text="Au moins 12 caractères"
                  />
                  <PasswordRule
                    valid={checks.lowercase}
                    text="Au moins une minuscule"
                  />
                  <PasswordRule
                    valid={checks.uppercase}
                    text="Au moins une majuscule"
                  />
                  <PasswordRule
                    valid={checks.number}
                    text="Au moins un chiffre"
                  />
                  <PasswordRule
                    valid={checks.symbol}
                    text="Au moins un symbole"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Confirmer le mot de passe</label>
                <input
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  style={inputStyle}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" style={registerButtonStyle} disabled={loading}>
                {loading ? "Création du compte..." : "Créer mon compte"}
              </button>
            </form>

            <p
              style={{
                marginTop: "22px",
                marginBottom: 0,
                textAlign: "center",
                color: "#6a678f",
                fontSize: "15px",
              }}
            >
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                style={{
                  color: "#4f7cff",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: valid ? "#1f9d57" : "#8f89b2",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: valid ? "#ebfff1" : "#f3f0fb",
          color: valid ? "#1f9d57" : "#8f89b2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {valid ? "✓" : "•"}
      </span>
      {text}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  color: "#3d3a6d",
  fontWeight: 700,
  fontSize: "15px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d9d4ee",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const registerButtonStyle: React.CSSProperties = {
  marginTop: "8px",
  background: "#f6b93b",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 18px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const gridTwoCols: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const successBoxStyle: React.CSSProperties = {
  marginBottom: "18px",
  padding: "14px 16px",
  borderRadius: "14px",
  background: "#ebfff1",
  border: "1px solid #ccefd8",
  color: "#1f9d57",
  fontSize: "14px",
  fontWeight: 700,
  textAlign: "center",
};

const errorBoxStyle: React.CSSProperties = {
  marginBottom: "18px",
  padding: "14px 16px",
  borderRadius: "14px",
  background: "#fff1f1",
  border: "1px solid #f1d0d0",
  color: "#c0392b",
  fontSize: "14px",
  fontWeight: 700,
  textAlign: "center",
};

export default Register;