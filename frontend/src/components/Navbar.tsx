import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT — Logo + Brand */}
      <div
        onClick={() => navigate("/home")}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="PetitsRêves"
          style={{
            width: 42,
            height: 42,
            objectFit: "cover",
            borderRadius: 12,
            marginRight: 12,
          }}
        />

        <h2
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#2f2c5a",
            margin: 0,
          }}
        >
          PetitsRêves
        </h2>
      </div>

      {/* CENTER — Menu */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          fontWeight: 600,
          color: "#2f2c5a",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/examples")}>
          Exemples
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/products")}>
          Produits
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/services")}>
          Services
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/faq")}>
          FAQ
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Connexion
        </span>
      </div>

      {/* RIGHT — CTA */}
      <button
        onClick={() => navigate("/upload")}
        style={{
          background: "#E7A928",
          border: "none",
          padding: "14px 28px",
          borderRadius: "28px",
          color: "#fff",
          fontWeight: 700,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(231,169,40,0.35)",
        }}
      >
        Créer mon projet
      </button>
    </nav>
  );
}

export default Navbar;