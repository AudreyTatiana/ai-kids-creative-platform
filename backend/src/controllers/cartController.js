const Cart = require("../models/Cart");

// Récupérer le panier d'un utilisateur
async function getCart(req, res) {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId: Number(userId) });
    return res.status(200).json(cart || { userId, items: [] });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// Ajouter un article au panier
async function addItem(req, res) {
  try {
    const { userId } = req.params;
    const { product, theme, delivery, price, previewImage } = req.body;

    let cart = await Cart.findOne({ userId: Number(userId) });

    if (!cart) {
      cart = new Cart({ userId: Number(userId), items: [] });
    }

    cart.items.push({ product, theme, delivery, price, previewImage });
    cart.updatedAt = new Date();
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// Retirer un article du panier
async function removeItem(req, res) {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId: Number(userId) });
    if (!cart) return res.status(404).json({ message: "Panier introuvable." });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    cart.updatedAt = new Date();
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// Vider le panier
async function clearCart(req, res) {
  try {
    const { userId } = req.params;
    await Cart.findOneAndUpdate({ userId: Number(userId) }, { items: [], updatedAt: new Date() });
    return res.status(200).json({ message: "Panier vidé." });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

module.exports = { getCart, addItem, removeItem, clearCart };
