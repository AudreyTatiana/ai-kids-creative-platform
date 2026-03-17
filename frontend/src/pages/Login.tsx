import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur de connexion");
        return;
      }

      // ✅ stockage token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Connexion réussie 🎉");

      // ✅ redirection après 1.5s
      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 1500);
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <Layout>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#f6f1ff,#eef5ff)",
        }}
      >
        <Container>
          <form
            onSubmit={handleLogin}
            style={{
              maxWidth: 500,
              margin: "auto",
              background: "white",
              padding: 40,
              borderRadius: 20,
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h1 style={{ textAlign: "center", marginBottom: 30 }}>
              Connexion
            </h1>

            {error && (
              <div
                style={{
                  background: "#ffe6e6",
                  color: "#d10000",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 20,
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  background: "#e6fff1",
                  color: "#00a86b",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 20,
                }}
              >
                {success}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button style={buttonStyle}>Se connecter</button>
          </form>
        </Container>
      </section>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: 14,
  marginBottom: 15,
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 16,
};

const buttonStyle = {
  width: "100%",
  padding: 14,
  background: "#f6b93b",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer",
};

export default Login;