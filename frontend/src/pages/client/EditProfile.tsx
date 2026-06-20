import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientLayout from "../../components/client/ClientLayout";
import { updateProfile, changePassword } from "../../api/auth";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setProfileLoading(true);
    try {
      const { res, data } = await updateProfile({ firstName, lastName, email });
      if (!res.ok) { setProfileError(data.message || "Erreur."); return; }
      localStorage.setItem("user", JSON.stringify({ ...user, firstName: data.user.firstName, lastName: data.user.lastName, email: data.user.email }));
      setProfileMsg("Informations mises à jour avec succès.");
    } catch {
      setProfileError("Impossible de contacter le serveur.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg("");
    setPwdError("");
    if (newPassword !== confirmNewPassword) { setPwdError("Les mots de passe ne correspondent pas."); return; }
    setPwdLoading(true);
    try {
      const { res, data } = await changePassword({ currentPassword, newPassword });
      if (!res.ok) { setPwdError(data.message || "Erreur."); return; }
      setPwdMsg("Mot de passe modifié avec succès.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      setPwdError("Impossible de contacter le serveur.");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <ClientLayout>
      <div className="edit-profile-wrapper">
        <header className="edit-profile-header">
          <h2 className="edit-profile-header__title">Modifier mes informations</h2>
          <p className="edit-profile-header__subtitle">Mettez à jour vos informations personnelles et votre mot de passe.</p>
        </header>

        <div className="edit-profile-grid">
          <form onSubmit={handleProfileSave} className="edit-profile-card" autoComplete="off">
            <h3 className="edit-profile-card__title">Informations personnelles</h3>

            <div className="edit-profile-two-cols">
              <Field label="Prénom" value={firstName} onChange={setFirstName} placeholder="Votre prénom" />
              <Field label="Nom" value={lastName} onChange={setLastName} placeholder="Votre nom" />
            </div>
            <Field label="Email" value={email} onChange={setEmail} placeholder="votre@email.com" type="email" />

            {profileMsg && <p className="edit-profile-success">{profileMsg}</p>}
            {profileError && <p className="edit-profile-error">{profileError}</p>}

            <div className="edit-profile-actions">
              <button type="button" className="edit-profile-btn--secondary" onClick={() => navigate("/account")}>Annuler</button>
              <button type="submit" className="edit-profile-btn--primary" disabled={profileLoading}>
                {profileLoading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>

          <form onSubmit={handlePasswordSave} className="edit-profile-card" autoComplete="off">
            <h3 className="edit-profile-card__title">Changer le mot de passe</h3>

            <Field label="Mot de passe actuel" value={currentPassword} onChange={setCurrentPassword} placeholder="Mot de passe actuel" type="password" autoComplete="current-password" />
            <Field label="Nouveau mot de passe" value={newPassword} onChange={setNewPassword} placeholder="Nouveau mot de passe" type="password" autoComplete="new-password" />
            <Field label="Confirmer le nouveau mot de passe" value={confirmNewPassword} onChange={setConfirmNewPassword} placeholder="Confirmez le nouveau mot de passe" type="password" autoComplete="new-password" />

            {pwdMsg && <p className="edit-profile-success">{pwdMsg}</p>}
            {pwdError && <p className="edit-profile-error">{pwdError}</p>}

            <div className="edit-profile-actions">
              <button type="submit" className="edit-profile-btn--primary" disabled={pwdLoading}>
                {pwdLoading ? "Modification..." : "Modifier le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", autoComplete }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="edit-profile-field">
      <label className="edit-profile-field__label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="edit-profile-field__input"
      />
    </div>
  );
}

export default EditProfile;
