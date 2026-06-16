import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/images/logo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      {/* LEFT — Logo + Brand */}
      <div
        onClick={() => navigate("/home")}
        className="navbar__brand"
      >
        <img
          src={logo}
          alt="PetitsRêves"
          className="navbar__logo"
        />

        <h2 className="navbar__title">
          PetitsRêves
        </h2>
      </div>

      {/* CENTER — Menu */}
      <div className="navbar__menu">
        <span onClick={() => navigate("/examples")}>Exemples</span>
        <span onClick={() => navigate("/products")}>Produits</span>
        <span onClick={() => navigate("/services")}>Services</span>
        <span onClick={() => navigate("/faq")}>FAQ</span>
        <span onClick={() => navigate("/login")}>Connexion</span>
      </div>

      {/* RIGHT — Cart icon + CTA */}
      <div className="navbar__actions">
        <button
          onClick={() => navigate("/cart")}
          className="navbar__cart-btn"
          aria-label="Voir le panier"
          title="Panier"
        >
          <ShoppingCart size={22} color="#2f2c5a" />

          {cartCount > 0 && (
            <span className="navbar__cart-badge">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            const user = localStorage.getItem("user");
            if (user) {
              navigate("/upload");
            } else {
              navigate("/login?redirect=/upload");
            }
          }}
          className="navbar__cta-btn"
        >
          Créer mon projet
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
