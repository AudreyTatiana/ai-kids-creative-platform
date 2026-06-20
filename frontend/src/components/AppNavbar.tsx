import { Link } from "react-router-dom";
import "./AppNavbar.css";

function AppNavbar() {
  return (
    <div className="app-navbar">
      <h2 className="app-navbar__title">
        PetitsRêves
      </h2>

      <div className="app-navbar__links">
        <Link to="/services">Services</Link>
        <Link to="/account">Mon compte</Link>
        <Link to="/cart">Panier</Link>
        <Link to="/login">Logout</Link>
      </div>
    </div>
  );
}

export default AppNavbar;
