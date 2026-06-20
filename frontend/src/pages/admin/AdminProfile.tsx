import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminPage.css";

function AdminProfile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Mon profil</h2>
            <p className="admin-page__header-subtitle">
              Consultez et gérez les informations du compte administrateur.
            </p>
          </div>

          <button className="admin-page__btn-primary">Modifier le profil</button>
        </header>

        <section className="admin-profile-grid">
          <div className="admin-profile-card">
            <div className="admin-profile-card__avatar">
              {user?.firstName?.[0] || "A"}
            </div>

            <h3 className="admin-profile-card__name">
              {user?.firstName || "Admin"} {user?.lastName || "PetitsRêves"}
            </h3>

            <p className="admin-profile-card__email">
              {user?.email || "admin@petitsreves.com"}
            </p>

            <span className="admin-profile-card__role-badge">
              Administrateur
            </span>
          </div>

          <div className="admin-profile-right">
            <div className="admin-page__content">
              <h3 className="admin-profile-section-title">
                Informations personnelles
              </h3>

              <div className="admin-profile-info-grid">
                <InfoCard label="Prénom" value={user?.firstName || "Admin"} />
                <InfoCard label="Nom" value={user?.lastName || "PetitsRêves"} />
                <InfoCard label="Email" value={user?.email || "admin@petitsreves.com"} />
                <InfoCard label="Rôle" value={user?.role || "admin"} />
              </div>
            </div>

            <div className="admin-page__content">
              <h3 className="admin-profile-section-title">
                Sécurité du compte
              </h3>

              <div className="admin-page__actions">
                <button className="admin-page__btn-primary">Modifier le profil</button>
                <button className="admin-page__btn-secondary">Changer le mot de passe</button>
              </div>
            </div>

            <div className="admin-page__note">
              <p className="admin-page__note-text">
                Ce compte dispose des droits administrateur et peut gérer les
                commandes, les paiements, les produits, les thèmes et les livraisons.
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
    <div className="admin-profile-info-card">
      <p className="admin-profile-info-card__label">{label}</p>
      <p className="admin-profile-info-card__value">{value}</p>
    </div>
  );
}

export default AdminProfile;
