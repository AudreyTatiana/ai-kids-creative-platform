import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link } from "react-router-dom";

function Login() {
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
              maxWidth: "1100px",
              width: "100%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#fff",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 18px 40px rgba(117, 100, 170, 0.14)",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)",
                padding: "60px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  margin: "0 0 14px",
                  color: "#4f7cff",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Bon retour
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "42px",
                  lineHeight: 1.15,
                  color: "#3d3a6d",
                  fontWeight: 800,
                }}
              >
                Heureuse de vous revoir ✨
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#5f5a8a",
                  fontSize: "18px",
                  lineHeight: 1.8,
                  maxWidth: "420px",
                }}
              >
                Connectez-vous pour retrouver vos créations, suivre vos commandes
                et continuer votre projet magique en toute simplicité.
              </p>

              <div
                style={{
                  marginTop: "28px",
                  background: "rgba(255,255,255,0.65)",
                  borderRadius: "18px",
                  padding: "18px 20px",
                  maxWidth: "420px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#3d3a6d",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    fontWeight: 600,
                  }}
                >
                  Vos souvenirs créatifs vous attendent.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "48px 42px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ marginBottom: "28px" }}>
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "34px",
                    color: "#3d3a6d",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  Connexion
                </h2>

                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    color: "#6a678f",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  Entrez vos informations pour accéder à votre espace.
                </p>
              </div>

              <form style={{ display: "grid", gap: "18px" }}>
                <div>
                  <label style={labelStyle}>Adresse email</label>
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Mot de passe</label>
                  <input
                    type="password"
                    placeholder="Votre mot de passe"
                    style={inputStyle}
                  />
                </div>

                <div style={{ textAlign: "right" }}>
                  <a
                    href="#"
                    style={{
                      color: "#4f7cff",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                <button type="submit" style={loginButtonStyle}>
                  Se connecter
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
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#4f7cff",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
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

const loginButtonStyle: React.CSSProperties = {
  marginTop: "8px",
  background: "#4f7cff",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 18px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

export default Login;