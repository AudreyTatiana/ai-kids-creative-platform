import AdminLayout from "../../components/admin/AdminLayout";

function AdminProfile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <AdminLayout>
      <div style={{ display: "grid", gap: "24px" }}>
        <header
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "20px 24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 6px",
                color: "#3d3a6d",
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              Mon profil
            </h2>

            <p
              style={{
                margin: 0,
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              Consultez et gérez les informations du compte administrateur.
            </p>
          </div>

          <button style={primaryButtonStyle}>Modifier le profil</button>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
              border: "1px solid #efe9fb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "34px",
                fontWeight: 800,
                margin: "0 auto 18px",
              }}
            >
              {user?.firstName?.[0] || "A"}
            </div>

            <h3
              style={{
                margin: "0 0 6px",
                color: "#3d3a6d",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              {user?.firstName || "Admin"} {user?.lastName || "PetitsRêves"}
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "#7a7699",
                fontSize: "15px",
              }}
            >
              {user?.email || "admin@petitsreves.com"}
            </p>

            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#ebfff1",
                color: "#1f9d57",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Administrateur
            </span>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
                border: "1px solid #efe9fb",
              }}
            >
              <h3
                style={{
                  margin: "0 0 18px",
                  color: "#3d3a6d",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                Informations personnelles
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <InfoCard label="Prénom" value={user?.firstName || "Admin"} />
                <InfoCard label="Nom" value={user?.lastName || "PetitsRêves"} />
                <InfoCard
                  label="Email"
                  value={user?.email || "admin@petitsreves.com"}
                />
                <InfoCard label="Rôle" value={user?.role || "admin"} />
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
                border: "1px solid #efe9fb",
              }}
            >
              <h3
                style={{
                  margin: "0 0 18px",
                  color: "#3d3a6d",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                Sécurité du compte
              </h3>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button style={primaryButtonStyle}>Modifier le profil</button>
                <button style={secondaryButtonStyle}>
                  Changer le mot de passe
                </button>
              </div>
            </div>

            <div
              style={{
                background: "#fff8ef",
                border: "1px solid #f3dfb6",
                borderRadius: "22px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#7a7699",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                Ce compte dispose des droits administrateur et peut gérer les
                commandes, les paiements, les produits, les thèmes et les
                livraisons.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#faf8ff",
        border: "1px solid #eee8fb",
        borderRadius: "18px",
        padding: "18px",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          color: "#8f89b2",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: 0,
          color: "#3d3a6d",
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

export default AdminProfile;