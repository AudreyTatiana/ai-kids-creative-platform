import { useNavigate } from "react-router-dom";
import ClientLayout from "../components/client/ClientLayout";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  return (
    <ClientLayout>
      <div className="cart-wrapper">
        <header className="cart-header">
          <h2 className="cart-header__title">Mon panier</h2>
          <p className="cart-header__subtitle">Consultez vos créations en attente avant validation et paiement.</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p className="cart-empty__text">Votre panier est vide.</p>
            <button onClick={() => navigate("/upload")} className="cart-empty__btn">
              Créer un projet
            </button>
          </div>
        ) : (
          <section className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item__image">
                    {item.previewImage && <img src={item.previewImage} alt={item.product} />}
                  </div>

                  <div>
                    <h3 className="cart-item__title">{item.product}</h3>
                    <p className="cart-item__detail">Thème : {item.theme}</p>
                    <p className="cart-item__detail">Livraison : {item.delivery === "email" ? "Email" : "Domicile"}</p>
                  </div>

                  <div className="cart-item__price-col">
                    <p className="cart-item__price">{fmt(item.price)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="cart-item__remove-btn">
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="cart-summary__title">Résumé</h3>
              <div className="cart-summary__rows">
                <SummaryRow label="Articles" value={String(cartItems.length)} />
                <SummaryRow label="Sous-total" value={fmt(total)} />
                <SummaryRow label="Frais de livraison" value="selon choix" />
              </div>
              <div className="cart-summary__total-row">
                <span className="cart-summary__total-label">Total</span>
                <span className="cart-summary__total-value">{fmt(total)}</span>
              </div>
              <button onClick={() => navigate("/checkout")} className="cart-summary__checkout-btn">
                Continuer vers le paiement
              </button>
            </div>
          </section>
        )}
      </div>
    </ClientLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span className="summary-row__label">{label}</span>
      <span className="summary-row__value">{value}</span>
    </div>
  );
}

export default Cart;
