import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e9e4f5",
        position: "sticky",
        top: 0,
        zIndex: 10,
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
        }}
      >
        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link to="/" style={linkStyle}>
            Exemples
          </Link>
          <Link to="/services" style={linkStyle}>
            Produits
          </Link>
          <Link to="/account" style={linkStyle}>
            FAQ
          </Link>
        </nav>

        <Link to="/services" style={buttonStyle}>
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
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
};

export default Navbar;