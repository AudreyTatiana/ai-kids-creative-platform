import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Users,
  Package,
  Briefcase,
  Palette,
  CreditCard,
  BarChart3,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const menu = [
    { label: "Tableau de bord", path: "/admin", end: true, icon: LayoutDashboard },
    { label: "Commandes", path: "/admin/orders", icon: ShoppingCart },
    { label: "Livraisons", path: "/admin/deliveries", icon: Truck },
    { label: "Clients", path: "/admin/clients", icon: Users },
    { label: "Produits", path: "/admin/products", icon: Package },
    { label: "Services", path: "/admin/services", icon: Briefcase },
    { label: "Thèmes", path: "/admin/themes", icon: Palette },
    { label: "Paiements", path: "/admin/payments", icon: CreditCard },
    { label: "Statistiques", path: "/admin/stats", icon: BarChart3 },
    { label: "Mon profil", path: "/admin/profile", icon: UserCircle2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__header">
          <p className="sidebar__brand-label">PETITSRÊVES</p>
          <h1 className="sidebar__brand-title">Admin Dashboard</h1>
        </div>

        <nav className="sidebar__nav">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__nav-link sidebar__nav-link--active"
                    : "sidebar__nav-link"
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={
                        isActive
                          ? "sidebar__icon-wrapper sidebar__icon-wrapper--active"
                          : "sidebar__icon-wrapper"
                      }
                    >
                      <Icon size={18} />
                    </div>

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__user-card">
          <div className="sidebar__avatar">
            {user?.firstName?.[0] || "A"}
          </div>

          <div className="sidebar__user-info">
            <p className="sidebar__user-name">
              {user?.firstName || "Admin"} {user?.lastName || "PetitsRêves"}
            </p>

            <p className="sidebar__user-role">Administrateur</p>
          </div>
        </div>

        <button onClick={handleLogout} className="sidebar__logout-btn">
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
