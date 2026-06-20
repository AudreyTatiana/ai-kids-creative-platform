import "./Layout.css";

function Layout({ children }: any) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

export default Layout;
