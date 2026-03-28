import type { ReactNode } from "react";
import {
  UserCircle2,
  PackageCheck,
  Truck,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #f8f5ff 0%, #f3f7ff 100%)",
      }}
    >
      <aside
        style={{
          width: "290px",
          minWidth: "290px",
          background: "#ffffff",
          padding: "28px 18px 20px",
          borderRight: "1px solid #eee8fb",
          height: "100vh",
          position: "sticky",
          top: 0,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              padding: "8px 10px 18px",
              borderBottom: "1px solid #f1ecfb",
              marginBottom: "22px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#f0aa16",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              PETITSRÊVES
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "26px",
                color: "#3d3a6d",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Mon espace
            </h1>
          </div>

          <nav style={{ display: "grid", gap: "10px" }}>
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 14px",
                    borderRadius: "16px",
                    border: isActive ? "none" : "1px solid #f0ebfa",
                    background: isActive
                      ? "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)"
                      : "#fff",
                    color: isActive ? "#fff" : "#5f5989",
                    fontWeight: 700,
                    fontSize: "15px",
                    boxSizing: "border-box",
                    boxShadow: isActive
                      ? "0 12px 24px rgba(111, 143, 255, 0.22)"
                      : "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isActive ? "rgba(255,255,255,0.18)" : "#f7f4ff",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #f1ecfb",
            paddingTop: "18px",
          }}
        >
          <div
            style={{
              background: "#faf8ff",
              border: "1px solid #eee8fb",
              borderRadius: "18px",
              padding: "14px",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {user?.firstName?.[0] || "U"}
            </div>

            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#3d3a6d",
                  fontSize: "14px",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.firstName || "Utilisateur"} {user?.lastName || ""}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#8f89b2",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Client
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "16px",
              border: "1px solid #f3d6d6",
              background: "linear-gradient(180deg, #fff7f7 0%, #fff2f2 100%)",
              color: "#c0392b",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(192, 57, 43, 0.08)",
            }}
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default ClientLayout;