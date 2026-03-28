import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "#PROD-001",
      name: "Pack d'images",
      category: "Numérique",
      price: "29,90€",
      stock: "Illimité",
      status: "Actif",
    },
    {
      id: "#PROD-002",
      name: "Album Photo",
      category: "Physique",
      price: "49,90€",
      stock: "Disponible",
      status: "Actif",
    },
    {
      id: "#PROD-003",
      name: "Histoire personnalisée",
      category: "Numérique",
      price: "39,90€",
      stock: "Illimité",
      status: "Inactif",
    },
  ]);

  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    category: "Numérique",
    price: "",
    stock: "",
    status: "Actif",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      category: "Numérique",
      price: "",
      stock: "",
      status: "Actif",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId ? { ...formData, id: editingId } : product
        )
      );
    } else {
      const newId = `#PROD-${String(products.length + 1).padStart(3, "0")}`;
      setProducts((prev) => [...prev, { ...formData, id: newId }]);
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
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
            Gestion des produits
          </h2>

          <p
            style={{
              margin: 0,
              color: "#7a7699",
              fontSize: "15px",
            }}
          >
            Ajoutez, modifiez ou supprimez les produits proposés sur la plateforme.
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
            {editingId ? "Modifier un produit" : "Ajouter un produit"}
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
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
                placeholder="Nom du produit"
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
                <option>Numérique</option>
                <option>Physique</option>
              </select>
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
              <label style={labelStyle}>Stock</label>
              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Illimité / Disponible"
              />
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
                  <TableHeader>Catégorie</TableHeader>
                  <TableHeader>Prix</TableHeader>
                  <TableHeader>Stock</TableHeader>
                  <TableHeader>Statut</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <ProductStatusBadge status={product.status} />
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
                          onClick={() => handleEdit(product)}
                        >
                          Modifier
                        </button>
                        <button
                          style={dangerButtonStyle}
                          onClick={() => handleDelete(product.id)}
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

function ProductStatusBadge({ status }: { status: string }) {
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

export default AdminProducts;