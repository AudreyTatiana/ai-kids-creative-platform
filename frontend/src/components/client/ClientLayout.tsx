import type { ReactNode } from "react";
import {
  UserCircle2,
  PackageCheck,
  Truck,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ClientLayout.css";

type Props = {
  children: ReactNode;
};

function ClientLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const menu = [
    { label: "Mon profil", path: "/account", icon: UserCircle2 },
    { label: "Mes commandes", path: "/client/orders", icon: PackageCheck },
    { label: "Mes livraisons", path: "/client/deliveries", icon: Truck },
    { label: "Panier", path: "/cart", icon: ShoppingCart },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="client-layout">
      <aside className="client-sidebar">
        <div>
          <div className="client-sidebar__header">
            <p className="client-sidebar__brand-label">PETITSRÊVES</p>
            <h1 className="client-sidebar__brand-title">Mon espace</h1>
          </div>

          <nav className="client-sidebar__nav">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={
                    isActive
                      ? "client-sidebar__nav-btn client-sidebar__nav-btn--active"
                      : "client-sidebar__nav-btn"
                  }
                >
                  <div
                    className={
                      isActive
                        ? "client-sidebar__icon-wrapper client-sidebar__icon-wrapper--active"
                        : "client-sidebar__icon-wrapper"
                    }
                  >
                    <Icon size={18} />
                  </div>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="client-sidebar__footer">
          <div className="client-sidebar__user-card">
            <div className="client-sidebar__avatar">
              {user?.firstName?.[0] || "U"}
            </div>

            <div className="client-sidebar__user-info">
              <p className="client-sidebar__user-name">
                {user?.firstName || "Utilisateur"} {user?.lastName || ""}
              </p>

              <p className="client-sidebar__user-role">Client</p>
            </div>
          </div>

          <button onClick={handleLogout} className="client-sidebar__logout-btn">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="client-layout__main">
        {children}
      </main>
    </div>
  );
}

export default ClientLayout;
