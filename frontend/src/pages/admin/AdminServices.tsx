import { useState } from "react";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  type: string;
  status: string;
};

function AdminServices() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "#SERV-001",
      name: "Création IA",
      description: "Transformation artistique des photos d’enfant",
      price: "29,90€",
      type: "Numérique",
      status: "Actif",
    },
    {
      id: "#SERV-002",
      name: "Livre personnalisé",
      description: "Histoire illustrée avec l’enfant comme héros",
      price: "39,90€",
      type: "Numérique",
      status: "Actif",
    },
    {
      id: "#SERV-003",
      name: "Album photo",
      description: "Album physique imprimé haute qualité",
      price: "49,90€",
      type: "Physique",
      status: "Inactif",
    },
  ]);

  const [formData, setFormData] = useState<Service>({
    id: "",
    name: "",
    description: "",
    price: "",
    type: "Numérique",
    status: "Actif",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      price: "",
      type: "Numérique",
      status: "Actif",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price.trim()) return;

    if (editingId) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingId ? { ...formData, id: editingId } : service
        )
      );
    } else {
      const newId = `#SERV-${String(services.length + 1).padStart(3, "0")}`;
      setServices((prev) => [...prev, { ...formData, id: newId }]);
    }

    resetForm();
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <AdminLayout>
      <div style={pageWrapStyle}>
        <header style={cardStyle}>
          <h2 style={titleStyle}>Gestion des services</h2>
          <p style={descStyle}>
            Gérez les offres proposées aux clients : création IA, livres,
            albums, impressions, etc.
          </p>
        </header>

        <section style={cardStyle}>
          <h3 style={subTitleStyle}>
            {editingId ? "Modifier un service" : "Ajouter un service"}
          </h3>

          <form onSubmit={handleSubmit} style={formGridStyle}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Nom du service"
              />
            </div>

            <div>
              <label style={labelStyle}>Prix</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
                placeholder="29,90€"
              />
            </div>

            <div>
              <label style={labelStyle}>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Numérique</option>
                <option>Physique</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Description du service"
              />
            </div>

            <div style={{ display: "flex", gap: "10px", gridColumn: "1 / -1" }}>
              <button type="submit" style={primaryBtnStyle}>
                {editingId ? "Enregistrer" : "Ajouter"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={secondaryBtnStyle}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </section>

        <section style={cardStyle}>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: "#faf8ff" }}>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Nom</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Prix</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Statut</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={service.status} />
                    </TableCell>
                    <TableCell>
                      <div style={actionWrapStyle}>
                        <button
                          type="button"
                          onClick={() => handleEdit(service)}
                          style={tableBtnStyle}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(service.id)}
                          style={dangerBtnStyle}
                        >
                          Supprimer
                        </button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <th style={tableHeaderStyle}>{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td style={tableCellStyle}>{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Actif";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: isActive ? "#ebfff1" : "#fff1f1",
        color: isActive ? "#1f9d57" : "#c0392b",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

const pageWrapStyle: CSSProperties = {
  display: "grid",
  gap: "24px",
};

const cardStyle: CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 15px 40px rgba(120,100,180,0.1)",
  border: "1px solid #efe9fb",
};

const titleStyle: CSSProperties = {
  margin: "0 0 6px",
  fontSize: "28px",
  fontWeight: 800,
  color: "#3d3a6d",
};

const subTitleStyle: CSSProperties = {
  margin: "0 0 18px",
  fontSize: "22px",
  fontWeight: 800,
  color: "#3d3a6d",
};

const descStyle: CSSProperties = {
  margin: 0,
  color: "#7a7699",
  fontSize: "15px",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "14px",
  alignItems: "end",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "8px",
  color: "#3d3a6d",
  fontWeight: 700,
  fontSize: "14px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #ddd4f2",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

const primaryBtnStyle: CSSProperties = {
  background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryBtnStyle: CSSProperties = {
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeaderStyle: CSSProperties = {
  textAlign: "left",
  padding: "14px 16px",
  color: "#6d67a0",
  fontSize: "14px",
  fontWeight: 800,
  borderBottom: "1px solid #eee8fb",
};

const tableCellStyle: CSSProperties = {
  padding: "14px 16px",
  color: "#4f4a76",
  fontSize: "15px",
  borderBottom: "1px solid #f2eefb",
  verticalAlign: "middle",
};

const actionWrapStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "nowrap",
};

const tableBtnStyle: CSSProperties = {
  background: "#fff",
  color: "#6d67a0",
  border: "1px solid #ddd4f2",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const dangerBtnStyle: CSSProperties = {
  background: "#fff5f5",
  color: "#c0392b",
  border: "1px solid #f1d0d0",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export default AdminServices;