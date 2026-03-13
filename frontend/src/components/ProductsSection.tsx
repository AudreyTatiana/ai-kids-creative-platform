import Container from "./Container";
import productImage from "../assets/images/ui-pack.png";

function ProductsSection() {
  return (
    <section
      style={{
        padding: "70px 0",
        background: "#fcfbff",
      }}
    >
      <Container>
        <h2
          style={{
            fontSize: "32px",
            color: "#3d3a6d",
            marginBottom: "40px",
            fontWeight: 800,
          }}
        >
          Nos Produits
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          <ProductCard
            title="Pack d'images"
            price="29,90€"
            image={productImage}
            position="left center"
          />
          <ProductCard
            title="Album Photo"
            price="49,90€"
            image={productImage}
            position="center center"
          />
          <ProductCard
            title="Histoire personnalisée"
            price="39,90€"
            image={productImage}
            position="right center"
          />
        </div>
      </Container>
    </section>
  );
}

type ProductCardProps = {
  title: string;
  price: string;
  image: string;
  position: string;
};

function ProductCard({
  title,
  price,
  image,
  position,
}: ProductCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(117, 100, 170, 0.12)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          objectPosition: position,
          borderRadius: "14px",
          marginBottom: "15px",
          display: "block",
        }}
      />

      <h3
        style={{
          fontSize: "20px",
          color: "#3d3a6d",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#f6b93b",
          margin: 0,
        }}
      >
        {price}
      </p>
    </div>
  );
}

export default ProductsSection;