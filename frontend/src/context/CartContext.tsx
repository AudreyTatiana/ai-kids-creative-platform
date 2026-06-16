import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { fetchCart, addCartItem, removeCartItem, clearCartItems } from "../api/cart";

export interface CartItem {
  _id: string;
  product: string;
  theme: string;
  delivery: string;
  price: number;
  previewImage: string;
}

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "_id">) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function getUserId(): number | null {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user).id || null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const userId = getUserId();
    if (!userId) { console.warn("Cart: utilisateur non connecté"); return; }
    try {
      const { res, data } = await fetchCart(userId);
      if (!res.ok) { console.error("Cart: erreur HTTP", res.status); return; }
      console.log("Cart chargé:", data);
      setCartItems(data.items || []);
    } catch (err) { console.error("Erreur loadCart:", err); }
  };

  useEffect(() => {
    loadCart();
    // Recharger le panier si l'utilisateur se connecte dans un autre onglet
    const handleStorage = () => loadCart();
    window.addEventListener("storage", handleStorage);
    // Recharger le panier après connexion dans le même onglet
    const handleLogin = () => loadCart();
    window.addEventListener("user-logged-in", handleLogin);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("user-logged-in", handleLogin);
    };
  }, []);

  const addToCart = async (item: Omit<CartItem, "_id">): Promise<boolean> => {
    const userId = getUserId();
    if (!userId) {
      console.error("Cart: addToCart appelé sans utilisateur connecté");
      return false;
    }
    try {
      const { res, data } = await addCartItem(userId, item);
      if (!res.ok) {
        console.error("Cart: erreur addToCart", res.status, data);
        return false;
      }
      console.log("Article ajouté au panier:", data);
      setCartItems(data.items || []);
      return true;
    } catch (err) {
      console.error("Cart: erreur réseau addToCart", err);
      return false;
    }
  };

  const removeFromCart = async (itemId: string) => {
    const userId = getUserId();
    if (!userId) return;
    try {
      const { res, data } = await removeCartItem(userId, itemId);
      if (!res.ok) { console.error("Cart: erreur removeFromCart", res.status); return; }
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Cart: erreur réseau removeFromCart", err);
    }
  };

  const clearCart = async () => {
    const userId = getUserId();
    if (!userId) return;
    try {
      const { res } = await clearCartItems(userId);
      if (!res.ok) { console.error("Cart: erreur clearCart", res.status); return; }
      setCartItems([]);
    } catch (err) {
      console.error("Cart: erreur réseau clearCart", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount: cartItems.length, addToCart, removeFromCart, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
