const db = require("../config/db");

function getAll() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM services ORDER BY created_at DESC", (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
}

function create({ name, description, price, type, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO services (name, description, price, type, status) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, type, status],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function update(id, { name, description, price, type, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE services SET name=?, description=?, price=?, type=?, status=? WHERE id=?",
      [name, description, price, type, status, id],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM services WHERE id=?", [id], (err, result) => {
      if (err) reject(err); else resolve(result);
    });
  });
}

module.exports = { getAll, create, update, remove };
