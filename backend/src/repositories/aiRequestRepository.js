const db = require("../config/db");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function create({ orderId, prompt }) {
  const result = await query(
    `INSERT INTO ai_request (order_id, prompt, status) VALUES (?, ?, 'completed')`,
    [orderId, prompt || null]
  );
  return result.insertId;
}

async function addGeneratedImage(aiRequestId, imageUrl) {
  await query(
    `INSERT INTO generated_image (ai_request_id, image_url) VALUES (?, ?)`,
    [aiRequestId, imageUrl]
  );
}

async function getImagesByOrderId(orderId) {
  const rows = await query(
    `SELECT gi.image_url
     FROM generated_image gi
     JOIN ai_request ar ON gi.ai_request_id = ar.id
     WHERE ar.order_id = ?`,
    [orderId]
  );
  return rows.map((r) => r.image_url);
}

async function findByOrderId(orderId) {
  const rows = await query("SELECT * FROM ai_request WHERE order_id = ?", [orderId]);
  return rows[0] || null;
}

module.exports = { create, addGeneratedImage, getImagesByOrderId, findByOrderId };
