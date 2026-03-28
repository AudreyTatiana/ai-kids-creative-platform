import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #f8f5ff 0%, #f3f7ff 100%)",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;