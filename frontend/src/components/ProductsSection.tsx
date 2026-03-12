function ProductsSection() {
  return (
    <section
      style={{
        padding: "70px 24px",
        background: "#fcfbff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
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
          />
          <ProductCard
            title="Album Photo"
            price="49,90€"
          />
          <ProductCard
            title="Histoire personnalisée"
            price="39,90€"
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title, price }: any) {
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
      <div
        style={{
          height: "160px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, #d8c8ff 0%, #bfe2ff 50%, #ffe7f5 100%)",
          marginBottom: "15px",
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
        }}
      >
        {price}
      </p>
    </div>
  );
}

export default ProductsSection;