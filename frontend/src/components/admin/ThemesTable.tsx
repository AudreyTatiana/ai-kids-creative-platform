import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/products";
import { fetchAllThemes } from "../../api/themes";
import "../admin/AdminTable.css";

interface CatalogItem {
  id: number;
  name: string;
  category: string;
  status: string;
  type: "Produit" | "Thème";
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="admin-table__th">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="admin-table__td">{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={status === "Actif" ? "badge badge--active" : "badge badge--default"}>
      {status}
    </span>
  );
}

function ThemesTable() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllProducts(), fetchAllThemes()])
      .then(([products, themes]) => {
        const productItems: CatalogItem[] = (Array.isArray(products) ? products : []).map(
          (p: { id: number; name: string; category: string; status: string }) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            status: p.status,
            type: "Produit",
          })
        );
        const themeItems: CatalogItem[] = (Array.isArray(themes) ? themes : []).map(
          (t: { id: number; name: string; category: string; status: string }) => ({
            id: t.id,
            name: t.name,
            category: t.category,
            status: t.status,
            type: "Thème",
          })
        );
        setItems([...productItems, ...themeItems].slice(0, 6));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-table-section">
      <h3 className="admin-table-section__title admin-table-section__title--mb">
        Gestion des thèmes &amp; produits
      </h3>

      <div className="admin-table-wrapper">
        {loading ? (
          <p className="admin-page__status-msg">Chargement...</p>
        ) : items.length === 0 ? (
          <p className="admin-page__status-msg">Aucun produit ou thème enregistré.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <TableHeader>Nom</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Catégorie</TableHeader>
                <TableHeader>Statut</TableHeader>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.type}-${item.id}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell><StatusBadge status={item.status} /></TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default ThemesTable;
