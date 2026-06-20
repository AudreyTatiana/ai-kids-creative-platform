import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import UploadPage from "./pages/UploadPage";
import ThemeSelection from "./pages/ThemeSelection";
import PreviewPage from "./pages/PreviewPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDeliveries from "./pages/admin/AdminDeliveries";
import AdminClients from "./pages/admin/AdminClients";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminThemes from "./pages/admin/AdminThemes";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminStats from "./pages/admin/AdminStats";
import AdminProfile from "./pages/admin/AdminProfile";
import ClientOrders from "./pages/client/ClientOrders";
import ClientDeliveries from "./pages/client/ClientDeliveries";
import RealisationPage from "./pages/client/RealisationPage";
import EditProfile from "./pages/client/EditProfile";
import VerifyActivation from "./pages/VerifyActivation";
import AdminServices from "./pages/admin/AdminServices";
import AIExamples from "./pages/AIExamples";
import ExamplesPage from "./pages/ExamplesPage";
import ProductsPage from "./pages/ProductsPage";
import AlbumsExamples from "./pages/AlbumsExamples";
import DecorationExamples from "./pages/DecorationExamples";
import GiftBoxesExamples from "./pages/GiftBoxesExamples";
import AIStudio from "./pages/AIStudio";
import FAQ from "./pages/FAQ";
import CGU from "./pages/CGU";
import RGPD from "./pages/RGPD";
import { CartProvider } from "./context/CartContext";
import { AIProvider } from "./context/AIContext";

function App() {
  return (
    <CartProvider>
      <AIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-activation" element={<VerifyActivation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/theme" element={<ThemeSelection />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/deliveries" element={<AdminDeliveries />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/themes" element={<AdminThemes />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/client/orders" element={<ClientOrders />} />
          <Route path="/client/deliveries" element={<ClientDeliveries />} />
          <Route path="/client/edit-profile" element={<EditProfile />} />
          <Route path="/realisation/:orderNumber" element={<RealisationPage />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/services/ia-examples" element={<AIExamples />} />
          <Route path="/services/albums-examples" element={<AlbumsExamples />} />
          <Route
            path="/services/decoration-examples"
            element={<DecorationExamples />}
          />
          <Route
            path="/services/gift-examples"
            element={<GiftBoxesExamples />}
          />
          <Route path="/ai-studio" element={<AIStudio />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/rgpd" element={<RGPD />} />
        </Routes>
      </BrowserRouter>
      </AIProvider>
    </CartProvider>
  );
}

export default App;
