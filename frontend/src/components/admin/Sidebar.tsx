type SidebarItemProps = {
  label: string;
  active?: boolean;
};

function SidebarItem({ label, active = false }: SidebarItemProps) {
  return (
    <button
      style={{
        width: "100%",
        textAlign: "left",
        padding: "12px 14px",
        borderRadius: "14px",
        border: active ? "none" : "1px solid #eee8fb",
        background: active
          ? "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)"
          : "#fff",
        color: active ? "#fff" : "#5f5989",
        fontWeight: 700,
        fontSize: "15px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Sidebar() {
  return (
    <aside
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "24px 18px",
        boxShadow: "0 18px 40px rgba(117, 100, 170, 0.10)",
        border: "1px solid #efe9fb",
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            margin: "0 0 8px",
            color: "#f0aa16",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          PetitsRêves
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#3d3a6d",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Admin Dashboard
        </h1>
      </div>

      <div style={{ display: "grid", gap: "10px" }}>
        <SidebarItem label="Commandes" active />
        <SidebarItem label="Clients" />
        <SidebarItem label="Produits" />
        <SidebarItem label="Thèmes" />
        <SidebarItem label="Paiements" />
        <SidebarItem label="Statistiques" />
      </div>
    </aside>
  );
}

export default Sidebar;