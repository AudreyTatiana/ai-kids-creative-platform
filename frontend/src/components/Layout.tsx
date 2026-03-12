function Layout({ children }: any) {
  return (
    <div
      style={{
        background: "#f4f3fb",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

export default Layout;