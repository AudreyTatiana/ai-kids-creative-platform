function HeroSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #f6f1ff 0%, #eef5ff 50%, #fdf7ff 100%)",
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "52px",
              lineHeight: 1.15,
              color: "#3d3a6d",
              marginBottom: "20px",
              fontWeight: 800,
            }}
          >
            Transformez les photos de votre enfant en créations magiques
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#6a678f",
              marginBottom: "32px",
              maxWidth: "560px",
            }}
          >
            Créez des images, albums photo et histoires personnalisées à partir
            de 2 à 4 photos, avec un univers féerique et une expérience simple.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button style={primaryButton}>Créer mon projet</button>
            <button style={secondaryButton}>Voir des exemples</button>
          </div>
        </div>

        <div
          style={{
            background: "#ffffffcc",
            border: "1px solid #e8ddff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(117, 100, 170, 0.12)",
          }}
        >
          <div
            style={{
              height: "320px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #d8c8ff 0%, #bfe2ff 50%, #ffe7f5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4b4780",
              fontWeight: 700,
              fontSize: "22px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Illustration / aperçu créatif
          </div>
        </div>
      </div>
    </section>
  );
}

const primaryButton: React.CSSProperties = {
  background: "#4f7cff",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 22px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  background: "#fff",
  color: "#3d3a6d",
  border: "1px solid #d9d4ee",
  borderRadius: "12px",
  padding: "14px 22px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

export default HeroSection;