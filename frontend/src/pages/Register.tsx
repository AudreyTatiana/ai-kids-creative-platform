import Layout from "../components/Layout";
import Container from "../components/Container";
import { Link } from "react-router-dom";

function Register() {
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

            <form style={{ display: "grid", gap: "18px" }}>
              <div style={gridTwoCols}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Nom</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    style={inputStyle}
                  />
                </div>
              </div>

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
                  placeholder="Choisissez un mot de passe"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Confirmer le mot de passe</label>
                <input
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={registerButtonStyle}>
                Créer mon compte
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

export default Register;