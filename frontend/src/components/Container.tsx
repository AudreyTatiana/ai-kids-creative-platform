function Container({ children }: any) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      {children}
    </div>
  );
}

export default Container;