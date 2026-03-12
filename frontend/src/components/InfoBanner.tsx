function InfoBanner() {
  return (
    <section
      style={{
        padding: "30px 24px 70px",
        background: "#fcfbff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fff8ef",
          border: "1px solid #f3dfb6",
          borderRadius: "18px",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#6a678f",
              lineHeight: 1.6,
            }}
          >
            Certaines photos peuvent sembler sombres. Vous pouvez continuer,
            mais le rendu pourrait être moins bon.
          </p>
        </div>

        <button
          style={{
            background: "#f6b93b",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "14px 22px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continuer
        </button>
      </div>
    </section>
  );
}

export default InfoBanner;