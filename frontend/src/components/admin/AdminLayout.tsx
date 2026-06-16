import Sidebar from "./Sidebar";
import "./AdminLayout.css";

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-layout__main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
