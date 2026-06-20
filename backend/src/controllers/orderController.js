const orderRepository = require("../repositories/orderRepository");
const productRepository = require("../repositories/productRepository");
const themeRepository = require("../repositories/themeRepository");

async function getAllOrders(req, res) {
  try {
    const orders = await orderRepository.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
}

async function getPhysicalOrders(req, res) {
  try {
    const orders = await orderRepository.findPhysical();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
}

async function getOrdersByClientEmail(req, res) {
  try {
    const email = decodeURIComponent(req.params.email);
    console.log("[ORDERS] Recherche commandes pour email :", email);
    const orders = await orderRepository.findByEmail(email);
    console.log("[ORDERS] Résultats trouvés :", orders.length);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
}

async function getOrderStats(req, res) {
  try {
    const stats = await orderRepository.getStats();

    const activeProductsRows = await productRepository.getAll();
    const activeProducts = activeProductsRows.filter((p) => p.status === "Actif").length;

    const activeThemesRows = await themeRepository.getAll();
    const activeThemes = activeThemesRows.filter((t) => t.status === "Actif").length;

    return res.status(200).json({ ...stats, activeProducts, activeThemes });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
}

async function getOrderRealisation(req, res) {
  try {
    const { orderNumber } = req.params;
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email requis." });

    const order = await orderRepository.findRealisationByOrderNumber(orderNumber, email);
    if (!order) return res.status(404).json({ message: "Commande introuvable." });

    let images = [];
    try {
      images = typeof order.generated_images === "string"
        ? JSON.parse(order.generated_images || "[]")
        : (order.generated_images || []);
    } catch (_) { images = []; }

    return res.status(200).json({
      orderNumber: order.order_number,
      product: order.product,
      theme: order.theme,
      images,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
}

module.exports = {
  getAllOrders,
  getPhysicalOrders,
  getOrdersByClientEmail,
  getOrderStats,
  getOrderRealisation,
};
