import { useNavigate } from "react-router-dom";
import ClientLayout from "../components/client/ClientLayout";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";

  return (
    <ClientLayout>
      <div style={{ display: "grid", gap: "24px" }}>
        <header style={{ background: "#ffffff", borderRadius: "24px", padding: "20px 24px", boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
          <h2 style={{ margin: "0 0 6px", color: "#3d3a6d", fontSize: "28px", fontWeight: 800 }}>Mon panier</h2>
          <p style={{ margin: 0, color: "#7a7699", fontSize: "15px" }}>Consultez vos créations en attente avant validation et paiement.</p>
        </header>

        {cartItems.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "24px", padding: "48px", textAlign: "center", boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
            <p style={{ color: "#7a7699", fontSize: "16px", marginBottom: "20px" }}>Votre panier est vide.</p>
            <button onClick={() => navigate("/upload")} style={{ background: "#f6b93b", color: "#fff", border: "none", borderRadius: "14px", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
              Créer un projet
            </button>
          </div>
        ) : (
          <section style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "24px", alignItems: "start" }}>
            <div style={{ background: "#ffffff", borderRadius: "24px", padding: "24px", boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb", display: "grid", gap: "18px" }}>
              {cartItems.map((item) => (
                <div key={item._id} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: "18px", alignItems: "center", paddingBottom: "18px", borderBottom: "1px solid #f2eefb" }}>
                  <div style={{ height: "96px", borderRadius: "18px", overflow: "hidden", background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)" }}>
                    {item.previewImage && <img src={item.previewImage} alt={item.product} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>

                  <div>
                    <h3 style={{ margin: "0 0 8px", color: "#3d3a6d", fontSize: "20px", fontWeight: 800 }}>{item.product}</h3>
                    <p style={{ margin: "0 0 6px", color: "#7a7699", fontSize: "14px" }}>Thème : {item.theme}</p>
                    <p style={{ margin: 0, color: "#7a7699", fontSize: "14px" }}>Livraison : {item.delivery === "email" ? "Email" : "Domicile"}</p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: "0 0 10px", color: "#3d3a6d", fontSize: "18px", fontWeight: 800 }}>{fmt(item.price)}</p>
                    <button onClick={() => removeFromCart(item._id)} style={{ background: "#fff5f5", color: "#c0392b", border: "1px solid #f1d0d0", borderRadius: "999px", padding: "8px 14px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#ffffff", borderRadius: "24px", padding: "24px", boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
              <h3 style={{ margin: "0 0 18px", color: "#3d3a6d", fontSize: "24px", fontWeight: 800 }}>Résumé</h3>
              <div style={{ display: "grid", gap: "14px", marginBottom: "18px" }}>
                <SummaryRow label="Articles" value={String(cartItems.length)} />
                <SummaryRow label="Sous-total" value={fmt(total)} />
                <SummaryRow label="Frais de livraison" value="selon choix" />
              </div>
              <div style={{ borderTop: "1px solid #eee8fb", paddingTop: "18px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#3d3a6d", fontSize: "18px", fontWeight: 800 }}>Total</span>
                <span style={{ color: "#3d3a6d", fontSize: "24px", fontWeight: 800 }}>{fmt(total)}</span>
              </div>
              <button onClick={() => navigate("/checkout")} style={{ width: "100%", background: "#f6b93b", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 18px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
      <span style={{ color: "#7a7699", fontSize: "15px" }}>{label}</span>
      <span style={{ color: "#3d3a6d", fontSize: "15px", fontWeight: 700 }}>{value}</span>
    </div>
  );
}

export default Cart;
