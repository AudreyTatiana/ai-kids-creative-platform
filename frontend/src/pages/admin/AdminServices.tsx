import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  fetchAllServices,
  createService,
  updateService,
  deleteService,
} from "../../api/services";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  type: string;
  status: string;
}

type ServiceForm = Omit<Service, "id">;

const emptyForm: ServiceForm = {
  name: "",
  description: "",
  price: "",
  type: "Numérique",
  status: "Actif",
};

function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ServiceForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllServices()
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) return;

    if (editingId !== null) {
      await updateService(editingId, formData);
      setServices((prev) =>
        prev.map((s) => (s.id === editingId ? { ...formData, id: editingId } : s))
      );
    } else {
      const result = await createService(formData);
      if (result.id) {
        setServices((prev) => [...prev, { ...formData, id: result.id }]);
      }
    }
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    const { id, ...rest } = service;
    setFormData(rest);
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) resetForm();
  };

  const fmtId = (id: number) => `#SERV-${String(id).padStart(3, "0")}`;

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des services</h2>
            <p className="admin-page__header-subtitle">
              Gérez les offres proposées aux clients : création IA, livres, albums, impressions, etc.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <h3 className="admin-table-section__title admin-table-section__title--mb">
            {editingId !== null ? "Modifier un service" : "Ajouter un service"}
          </h3>

          <form onSubmit={handleSubmit} className="admin-page__form-grid--4">
            <div>
              <label className="form-label">Nom</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Nom du service" />
            </div>
            <div>
              <label className="form-label">Prix</label>
              <input name="price" value={formData.price} onChange={handleChange} className="form-input" placeholder="29,90€" />
            </div>
            <div>
              <label className="form-label">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="form-input">
                <option>Numérique</option>
                <option>Physique</option>
              </select>
            </div>
            <div>
              <label className="form-label">Statut</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>
            <div className="admin-page__form-full">
              <label className="form-label">Description</label>
              <input name="description" value={formData.description} onChange={handleChange} className="form-input" placeholder="Description du service" />
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
            ) : services.length === 0 ? (
              <p className="admin-page__status-msg">Aucun service enregistré.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">ID</th>
                    <th className="admin-table__th">Nom</th>
                    <th className="admin-table__th">Description</th>
                    <th className="admin-table__th">Prix</th>
                    <th className="admin-table__th">Type</th>
                    <th className="admin-table__th">Statut</th>
                    <th className="admin-table__th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="admin-table__td">{fmtId(service.id)}</td>
                      <td className="admin-table__td">{service.name}</td>
                      <td className="admin-table__td">{service.description}</td>
                      <td className="admin-table__td">{service.price}</td>
                      <td className="admin-table__td">{service.type}</td>
                      <td className="admin-table__td">
                        <span className={service.status === "Actif" ? "badge badge--active" : "badge badge--default"}>
                          {service.status}
                        </span>
                      </td>
                      <td className="admin-table__td">
                        <div className="admin-table__action-btns">
                          <button type="button" className="table-action-btn" onClick={() => handleEdit(service)}>Modifier</button>
                          <button type="button" className="table-action-btn table-action-btn--danger" onClick={() => handleDelete(service.id)}>Supprimer</button>
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

export default AdminServices;
