const cartRepository = require("../repositories/cartRepository");

async function getCart(req, res) {
  try {
    const { userId } = req.params;
    const cart = await cartRepository.findByUserId(userId);
    return res.status(200).json(cart || { userId, items: [] });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function addItem(req, res) {
  try {
    const { userId } = req.params;
    const { product, theme, delivery, price, previewImage } = req.body;

    if (!product || !theme || price === undefined) {
      return res.status(400).json({ message: "Champs product, theme et price obligatoires." });
    }

    const cart = await cartRepository.addItem(userId, { product, theme, delivery, price, previewImage });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function removeItem(req, res) {
  try {
    const { userId, itemId } = req.params;
    const cart = await cartRepository.removeItem(userId, itemId);
    if (!cart) return res.status(404).json({ message: "Panier introuvable." });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function clearCart(req, res) {
  try {
    const { userId } = req.params;
    const cart = await cartRepository.clear(userId);
    return res.status(200).json({ message: "Panier vidé.", cart });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

module.exports = { getCart, addItem, removeItem, clearCart };
