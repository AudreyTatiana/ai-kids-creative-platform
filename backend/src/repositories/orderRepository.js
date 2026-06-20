const db = require("../config/db");
const aiRequestRepository = require("./aiRequestRepository");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

const BASE_COLS = `id, order_number, first_name, last_name, email, phone,
                   product, theme, delivery, amount, status, created_at`;

async function findAll() {
  return await query(
    `SELECT ${BASE_COLS} FROM orders ORDER BY created_at DESC`
  );
}

async function findPhysical() {
  return await query(
    `SELECT ${BASE_COLS} FROM orders WHERE delivery != 'email' ORDER BY created_at DESC`
  );
}

async function findByEmail(email) {
  const normalized = email.toLowerCase().trim();
  return await query(
    `SELECT ${BASE_COLS} FROM orders WHERE LOWER(TRIM(email)) = ? ORDER BY created_at DESC`,
    [normalized]
  );
}

async function findByOrderNumber(orderNumber) {
  const rows = await query(
    "SELECT * FROM orders WHERE order_number = ?",
    [orderNumber]
  );
  return rows[0] || null;
}

async function findBySessionId(sessionId) {
  const rows = await query(
    "SELECT * FROM orders WHERE stripe_session_id = ?",
    [sessionId]
  );
  return rows[0] || null;
}

async function create({ orderNumber, firstName, lastName, email, phone, product, theme, delivery, amount, generatedImages, userId, productId, themeId }) {
  const result = await query(
    `INSERT INTO orders (order_number, first_name, last_name, email, phone,
      product, theme, delivery, amount, status, generated_images,
      user_id, product_id, theme_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
    [
      orderNumber, firstName, lastName, email, phone || "",
      product, theme, delivery, amount,
      JSON.stringify(generatedImages || []),
      userId || null, productId || null, themeId || null,
    ]
  );
  const orderId = result.insertId;

  // Créer les entrées ai_request + generated_image pour les nouvelles commandes
  if (generatedImages && generatedImages.length > 0) {
    try {
      const aiRequestId = await aiRequestRepository.create({ orderId, prompt: null });
      for (const url of generatedImages) {
        await aiRequestRepository.addGeneratedImage(aiRequestId, url);
      }
    } catch (err) {
      console.error("Erreur création ai_request/generated_image:", err.message);
      // Non bloquant : la commande est créée, les images sont toujours dans generated_images JSON
    }
  }

  return orderId;
}

async function markAsPaid(orderNumber, sessionId) {
  await query(
    "UPDATE orders SET status = 'paid', stripe_session_id = ? WHERE order_number = ?",
    [sessionId, orderNumber]
  );
}

async function findRealisationByOrderNumber(orderNumber, email) {
  const normalized = email.toLowerCase().trim();
  const rows = await query(
    `SELECT order_number, product, theme, generated_images
     FROM orders WHERE order_number = ? AND LOWER(TRIM(email)) = ?`,
    [orderNumber, normalized]
  );
  return rows[0] || null;
}

async function getStats() {
  const [totals] = await query(
    `SELECT COUNT(*) as totalOrders,
            COALESCE(SUM(CASE WHEN status='paid' THEN amount ELSE 0 END), 0) as totalRevenue,
            COUNT(DISTINCT email) as totalClients,
            SUM(CASE WHEN delivery != 'email' THEN 1 ELSE 0 END) as physicalDeliveries
     FROM orders`
  );
  const topProducts = await query(
    "SELECT product as name, COUNT(*) as sales FROM orders GROUP BY product ORDER BY sales DESC LIMIT 5"
  );
  const topThemes = await query(
    "SELECT theme as name, COUNT(*) as uses FROM orders GROUP BY theme ORDER BY uses DESC LIMIT 5"
  );
  return { ...totals, topProducts, topThemes };
}

module.exports = {
  findAll,
  findPhysical,
  findByEmail,
  findByOrderNumber,
  findBySessionId,
  create,
  markAsPaid,
  findRealisationByOrderNumber,
  getStats,
};
