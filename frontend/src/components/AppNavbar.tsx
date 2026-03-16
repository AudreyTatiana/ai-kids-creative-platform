import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <h2 style={{ margin: 0, color: "#3d3a6d" }}>
        PetitsRêves
      </h2>

      <div style={{ display: "flex", gap: 28 }}>
        <Link to="/services">Services</Link>
        <Link to="/account">Mon compte</Link>
        <Link to="/cart">Panier</Link>
        <Link to="/login">Logout</Link>
      </div>
    </div>
  );
}

export default AppNavbar;