import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ display: "flex", gap: "16px", padding: "20px" }}>
          <Link to="/">Accueil</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart">Panier</Link>
          <Link to="/account">Compte</Link>
          <Link to="/admin">Dashboard Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;