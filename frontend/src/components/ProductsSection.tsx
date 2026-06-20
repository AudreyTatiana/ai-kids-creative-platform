import Container from "./Container";
import packImages from "../assets/images/pack-images.png";
import albumPhotos from "../assets/images/album-photos.png";
import histoirePersonnalisee from "../assets/images/histoire-personalisee.png";
import "./ProductsSection.css";

const products = [
  {
    title: "Pack d'images",
    price: "29,90€",
    description: "4 créations IA haute résolution livrées par email",
    image: packImages,
  },
  {
    title: "Album Photo Magique",
    price: "49,90€",
    description: "Album imprimé 20×20 cm, livré à domicile sous 7 jours",
    image: albumPhotos,
  },
  {
    title: "Histoire personnalisée",
    price: "39,90€",
    description: "Livre illustré avec votre enfant comme personnage principal, livré à domicile",
    image: histoirePersonnalisee,
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
  image: string;
};

function ProductCard({ title, price, description, image }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__illustration">
        <img src={image} alt={title} className="product-card__image" />
      </div>
      <h3 className="product-card__title">{title}</h3>
      <p className="product-card__desc">{description}</p>
      <p className="product-card__price">{price}</p>
    </div>
  );
}

export default ProductsSection;
