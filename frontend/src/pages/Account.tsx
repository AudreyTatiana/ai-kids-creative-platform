import ClientLayout from "../components/client/ClientLayout";
import "./Account.css";

function Account() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <ClientLayout>
      <div className="account-wrapper">
        <header className="account-header">
          <h2 className="account-header__title">Mon profil</h2>
          <p className="account-header__subtitle">
            Consultez vos informations personnelles et suivez votre activité.
          </p>
        </header>

        <section className="account-content">
          <div className="account-profile-card">
            <div className="account-profile-card__avatar">
              {user?.firstName?.[0] || "U"}
            </div>

            <h3 className="account-profile-card__name">
              {user?.firstName || "Utilisateur"} {user?.lastName || ""}
            </h3>

            <p className="account-profile-card__email">
              {user?.email || "client@email.com"}
            </p>

            <span className="account-profile-card__badge">Client</span>
          </div>

          <div className="account-right-col">
            <div className="account-section-card">
              <h3 className="account-section-card__title">Informations personnelles</h3>
              <div className="account-info-grid">
                <InfoCard label="Prénom" value={user?.firstName || "Utilisateur"} />
                <InfoCard label="Nom" value={user?.lastName || "-"} />
                <InfoCard label="Email" value={user?.email || "client@email.com"} />
                <InfoCard label="Rôle" value={user?.role || "client"} />
              </div>
            </div>

            <div className="account-section-card">
              <h3 className="account-section-card__title">Actions</h3>
              <div className="account-actions">
                <button className="account-btn-primary">Modifier mes informations</button>
                <button className="account-btn-secondary">Changer le mot de passe</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="account-info-item">
      <p className="account-info-item__label">{label}</p>
      <p className="account-info-item__value">{value}</p>
    </div>
  );
}

export default Account;
