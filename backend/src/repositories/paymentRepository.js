const db = require("../config/db");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function create({ orderId, amount, method = "stripe", transactionReference }) {
  const result = await query(
    `INSERT INTO payment (order_id, amount, method_, status, transaction_reference, payment_date)
     VALUES (?, ?, ?, 'completed', ?, NOW())`,
    [orderId, amount, method, transactionReference]
  );
  return result.insertId;
}

async function findByOrderId(orderId) {
  const rows = await query("SELECT * FROM payment WHERE order_id = ?", [orderId]);
  return rows[0] || null;
}

module.exports = { create, findByOrderId };
