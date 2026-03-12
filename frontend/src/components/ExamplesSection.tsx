function ExamplesSection() {
  return (
    <section
      style={{
        padding: "60px 24px",
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
            marginBottom: "30px",
            fontWeight: 800,
          }}
        >
          Exemples de créations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
        </div>
      </div>
    </section>
  );
}

function ExampleCard() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #d8c8ff 0%, #bfe2ff 50%, #ffe7f5 100%)",
        height: "160px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        color: "#4b4780",
      }}
    >
      Image Exemple
    </div>
  );
}

export default ExamplesSection;