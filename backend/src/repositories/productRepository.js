const db = require("../config/db");

function getAll() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products ORDER BY created_at DESC", (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
}

function create({ name, category, price, stock, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO products (name, category, price, stock, status) VALUES (?, ?, ?, ?, ?)",
      [name, category, price, stock, status],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function update(id, { name, category, price, stock, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET name=?, category=?, price=?, stock=?, status=? WHERE id=?",
      [name, category, price, stock, status, id],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
      if (err) reject(err); else resolve(result);
    });
  });
}

module.exports = { getAll, create, update, remove };
