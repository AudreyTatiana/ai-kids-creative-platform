import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

type Theme = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
};

function AdminThemes() {
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: "#TH-001",
      name: "Conte",
      description: "Univers féerique inspiré des contes pour enfants.",
      category: "Fantaisie",
      status: "Actif",
    },
    {
      id: "#TH-002",
      name: "Super-héros",
      description: "Transformation de l’enfant en héros moderne et puissant.",
      category: "Aventure",
      status: "Actif",
    },
    {
      id: "#TH-003",
      name: "Pirate",
      description: "Aventure en mer avec costumes et décor d’exploration.",
      category: "Aventure",
      status: "Inactif",
    },
  ]);

  const [formData, setFormData] = useState<Theme>({
    id: "",
    name: "",
    description: "",
    category: "Fantaisie",
    status: "Actif",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      category: "Fantaisie",
      status: "Actif",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) return;

    if (editingId) {
      setThemes((prev) =>
        prev.map((theme) =>
          theme.id === editingId ? { ...formData, id: editingId } : theme
        )
      );
    } else {
      const newId = `#TH-${String(themes.length + 1).padStart(3, "0")}`;
      setThemes((prev) => [...prev, { ...formData, id: newId }]);
    }

    resetForm();
  };

  const handleEdit = (theme: Theme) => {
    setEditingId(theme.id);
    setFormData(theme);
  };

  const handleDelete = (id: string) => {
    setThemes((prev) => prev.filter((theme) => theme.id !== id));
    if (editingId === id) resetForm();
  };

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
          }}
        >
          <h2
            style={{
              margin: "0 0 6px",
              color: "#3d3a6d",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            Gestion des thèmes
          </h2>

          <p
            style={{
              margin: 0,
              color: "#7a7699",
              fontSize: "15px",
            }}
          >
            Ajoutez, modifiez ou supprimez les thèmes créatifs proposés aux clients.
          </p>
        </header>

        <section
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
            {editingId ? "Modifier un thème" : "Ajouter un thème"}
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
              alignItems: "end",
            }}
          >
            <div>
              <label style={labelStyle}>Nom</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Nom du thème"
              />
            </div>

            <div>
              <label style={labelStyle}>Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Fantaisie</option>
                <option>Aventure</option>
                <option>Éducatif</option>
                <option>Magique</option>
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

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "46px", resize: "vertical" }}
                placeholder="Description du thème"
              />
            </div>

            <div style={{ display: "flex", gap: "10px", gridColumn: "1 / -1" }}>
              <button type="submit" style={primaryButtonStyle}>
                {editingId ? "Enregistrer" : "Ajouter"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={secondaryButtonStyle}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
            border: "1px solid #efe9fb",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#faf8ff" }}>
                  <TableHeader>Référence</TableHeader>
                  <TableHeader>Nom</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Catégorie</TableHeader>
                  <TableHeader>Statut</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {themes.map((theme) => (
                  <tr key={theme.id}>
                    <TableCell>{theme.id}</TableCell>
                    <TableCell>{theme.name}</TableCell>
                    <TableCell>{theme.description}</TableCell>
                    <TableCell>{theme.category}</TableCell>
                    <TableCell>
                      <ThemeStatusBadge status={theme.status} />
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "nowrap",
                        }}
                      >
                        <button
                          style={tableButtonStyle}
                          onClick={() => handleEdit(theme)}
                        >
                          Modifier
                        </button>
                        <button
                          style={dangerButtonStyle}
                          onClick={() => handleDelete(theme.id)}
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
  return (
    <th
      style={{
        textAlign: "left",
        padding: "14px 16px",
        color: "#6d67a0",
        fontSize: "14px",
        fontWeight: 800,
        borderBottom: "1px solid #eee8fb",
      }}
    >
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "14px 16px",
        color: "#4f4a76",
        fontSize: "15px",
        borderBottom: "1px solid #f2eefb",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function ThemeStatusBadge({ status }: { status: string }) {
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

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  color: "#3d3a6d",
  fontWeight: 700,
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #ddd4f2",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

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

const tableButtonStyle: React.CSSProperties = {
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

const dangerButtonStyle: React.CSSProperties = {
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

export default AdminThemes;