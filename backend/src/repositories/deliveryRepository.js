const db = require("../config/db");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function create({ orderId, address, city, postalCode, country = "France", email }) {
  const result = await query(
    `INSERT INTO delivery (order_id, address, city, postal_code, country, email, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [orderId, address, city, postalCode, country, email]
  );
  return result.insertId;
}

async function findByOrderId(orderId) {
  const rows = await query("SELECT * FROM delivery WHERE order_id = ?", [orderId]);
  return rows[0] || null;
}

async function updateStatus(orderId, status) {
  await query("UPDATE delivery SET status = ? WHERE order_id = ?", [status, orderId]);
}

module.exports = { create, findByOrderId, updateStatus };
