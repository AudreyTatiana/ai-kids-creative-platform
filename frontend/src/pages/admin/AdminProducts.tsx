import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";
import "./AdminPage.css";
import "../../components/admin/AdminTable.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
}

type ProductForm = Omit<Product, "id">;

const emptyForm: ProductForm = {
  name: "",
  category: "Numérique",
  price: "",
  stock: "",
  status: "Actif",
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    if (editingId !== null) {
      await updateProduct(editingId, formData);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p))
      );
    } else {
      const result = await createProduct(formData);
      if (result.id) {
        setProducts((prev) => [...prev, { ...formData, id: result.id }]);
      }
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    const { id, ...rest } = product;
    setFormData(rest);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const fmtId = (id: number) => `#PROD-${String(id).padStart(3, "0")}`;

  return (
    <AdminLayout>
      <div className="admin-page">
        <header className="admin-page__header">
          <div>
            <h2 className="admin-page__header-title">Gestion des produits</h2>
            <p className="admin-page__header-subtitle">
              Ajoutez, modifiez ou supprimez les produits proposés sur la plateforme.
            </p>
          </div>
        </header>

        <section className="admin-page__content">
          <h3 className="admin-table-section__title admin-table-section__title--mb">
            {editingId !== null ? "Modifier un produit" : "Ajouter un produit"}
          </h3>

          <form onSubmit={handleSubmit} className="admin-page__form-grid--5">
            <div>
              <label className="form-label">Nom</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Nom du produit" />
            </div>
            <div>
              <label className="form-label">Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-input">
                <option>Numérique</option>
                <option>Physique</option>
              </select>
            </div>
            <div>
              <label className="form-label">Prix</label>
              <input name="price" value={formData.price} onChange={handleChange} className="form-input" placeholder="29,90€" />
            </div>
            <div>
              <label className="form-label">Stock</label>
              <input name="stock" value={formData.stock} onChange={handleChange} className="form-input" placeholder="Illimité / Disponible" />
            </div>
            <div>
              <label className="form-label">Statut</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                <option>Actif</option>
                <option>Inactif</option>
              </select>
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
            ) : products.length === 0 ? (
              <p className="admin-page__status-msg">Aucun produit enregistré.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__th">Référence</th>
                    <th className="admin-table__th">Nom</th>
                    <th className="admin-table__th">Catégorie</th>
                    <th className="admin-table__th">Prix</th>
                    <th className="admin-table__th">Stock</th>
                    <th className="admin-table__th">Statut</th>
                    <th className="admin-table__th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="admin-table__td">{fmtId(product.id)}</td>
                      <td className="admin-table__td">{product.name}</td>
                      <td className="admin-table__td">{product.category}</td>
                      <td className="admin-table__td">{product.price}</td>
                      <td className="admin-table__td">{product.stock}</td>
                      <td className="admin-table__td">
                        <span className={product.status === "Actif" ? "badge badge--active" : "badge badge--default"}>
                          {product.status}
                        </span>
                      </td>
                      <td className="admin-table__td">
                        <div className="admin-table__action-btns">
                          <button className="table-action-btn" onClick={() => handleEdit(product)}>Modifier</button>
                          <button className="table-action-btn table-action-btn--danger" onClick={() => handleDelete(product.id)}>Supprimer</button>
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

export default AdminProducts;
