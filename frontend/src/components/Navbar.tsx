import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: "22px",
            color: "#3d3a6d",
          }}
        >
          PetitsRêves
        </div>

        <nav
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/examples" style={linkStyle}>
            Exemples
          </Link>

          <Link to="/products" style={linkStyle}>
            Produits
          </Link>

          <Link to="/services" style={linkStyle}>
            Services
          </Link>

          <Link to="/faq" style={linkStyle}>
            FAQ
          </Link>

          <Link to="/login" style={linkStyle}>
            Connexion
          </Link>
        </nav>

        <Link to="/upload" style={buttonStyle}>
          Créer mon projet
        </Link>
      </div>
    </header>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#3d3a6d",
  fontWeight: 600,
  fontSize: "15px",
};

const buttonStyle: React.CSSProperties = {
  textDecoration: "none",
  background: "#f6b93b",
  color: "white",
  padding: "12px 20px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
};

export default Navbar;