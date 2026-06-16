import Container from "./Container";
import "./ProductsSection.css";

const products = [
  {
    title: "Pack d'images",
    price: "29,90€",
    description: "5 créations IA haute résolution livrées par email",
    emoji: "📷",
    gradient: "linear-gradient(135deg, #e8d5ff 0%, #a87fff 100%)",
  },
  {
    title: "Album Photo",
    price: "49,90€",
    description: "Album imprimé 20×20 cm, livré à domicile sous 7 jours",
    emoji: "📖",
    gradient: "linear-gradient(135deg, #ffd5e8 0%, #ff8fbe 100%)",
  },
  {
    title: "Histoire personnalisée",
    price: "39,90€",
    description: "Livre illustré avec votre enfant comme personnage principal",
    emoji: "📚",
    gradient: "linear-gradient(135deg, #d5f0ff 0%, #6ab8f0 100%)",
  },
];

function ProductsSection() {
  return (
    <section className="products-section">
      <Container>
        <h2 className="products-section__title">Nos Produits</h2>

        <div className="products-section__grid">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type ProductCardProps = {
  title: string;
  price: string;
  description: string;
  emoji: string;
  gradient: string;
};

function ProductCard({ title, price, description, emoji, gradient }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__illustration" style={{ background: gradient }}>
        <span className="product-card__emoji">{emoji}</span>
      </div>
      <h3 className="product-card__title">{title}</h3>
      <p className="product-card__desc">{description}</p>
      <p className="product-card__price">{price}</p>
    </div>
  );
}

export default ProductsSection;
