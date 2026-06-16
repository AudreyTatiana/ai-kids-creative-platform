import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  fetchAllThemes,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../../api/themes";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Theme {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
}

type ThemeForm = Omit<Theme, "id">;

const emptyForm: ThemeForm = {
  name: "",
  description: "",
  category: "Fantaisie",
  status: "Actif",
};

function AdminThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ThemeForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllThemes()
      .then((data) => setThemes(Array.isArray(data) ? data : []))
      .catch(() => setThemes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    if (editingId !== null) {
      await updateTheme(editingId, formData);
      setThemes((prev) =>
        prev.map((t) => (t.id === editingId ? { ...formData, id: editingId } : t))
      );
    } else {
      const result = await createTheme(formData);
      if (result.id) {
        setThemes((prev) => [...prev, { ...formData, id: result.id }]);
      }
    }
    resetForm();
  };

  const handleEdit = (theme: Theme) => {
    setEditingId(theme.id);
    const { id, ...rest } = theme;
    setFormData(rest);
  };

  const handleDelete = async (id: number) => {
    await deleteTheme(id);
    setThemes((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) resetForm();
  };

  const fmtId = (id: number) => `#TH-${String(id).padStart(3, "0")}`;

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des thèmes</h2>
            <p className="admin-page__header-subtitle">
              Ajoutez, modifiez ou supprimez les thèmes créatifs proposés aux clients.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <h3 className="admin-table-section__title admin-table-section__title--mb">
            {editingId !== null ? "Modifier un thème" : "Ajouter un thème"}
          </h3>

          <form onSubmit={handleSubmit} className="admin-page__form-grid--4">
            <div>
              <label className="form-label">Nom</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Nom du thème" />
            </div>
            <div>
              <label className="form-label">Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-input">
                <option>Fantaisie</option>
                <option>Aventure</option>
                <option>Éducatif</option>
                <option>Magique</option>
              </select>
            </div>
            <div>
              <label className="form-label">Statut</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                style={{ minHeight: "46px", resize: "vertical" }}
                placeholder="Description du thème"
              />
            </div>

            <div className="admin-page__form-btns">
              <button type="submit" className="admin-page__btn-primary">
                {editingId !== null ? "Enregistrer" : "Ajouter"}
              </button>
              {editingId !== null && (
                <button type="button" onClick={resetForm} className="admin-page__btn-secondary">
                  Annuler
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="admin-page__content">
          <div className="admin-table-wrapper">
            {loading ? (
              <p className="admin-page__status-msg">Chargement...</p>
            ) : themes.length === 0 ? (
              <p className="admin-page__status-msg">Aucun thème enregistré.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Référence</th>
                    <th className="admin-table__th">Nom</th>
                    <th className="admin-table__th">Description</th>
                    <th className="admin-table__th">Catégorie</th>
                    <th className="admin-table__th">Statut</th>
                    <th className="admin-table__th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {themes.map((theme) => (
                    <tr key={theme.id}>
                      <td className="admin-table__td">{fmtId(theme.id)}</td>
                      <td className="admin-table__td">{theme.name}</td>
                      <td className="admin-table__td">{theme.description}</td>
                      <td className="admin-table__td">{theme.category}</td>
                      <td className="admin-table__td">
                        <span className={theme.status === "Actif" ? "badge badge--active" : "badge badge--default"}>
                          {theme.status}
                        </span>
                      </td>
                      <td className="admin-table__td">
                        <div className="admin-table__action-btns">
                          <button className="table-action-btn" onClick={() => handleEdit(theme)}>Modifier</button>
                          <button className="table-action-btn table-action-btn--danger" onClick={() => handleDelete(theme.id)}>Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminThemes;
