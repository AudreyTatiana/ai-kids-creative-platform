const db = require("../config/db");

function getAll() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM themes ORDER BY created_at DESC", (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
}

function create({ name, description, category, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO themes (name, description, category, status) VALUES (?, ?, ?, ?)",
      [name, description, category, status],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function update(id, { name, description, category, status }) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE themes SET name=?, description=?, category=?, status=? WHERE id=?",
      [name, description, category, status, id],
      (err, result) => { if (err) reject(err); else resolve(result); }
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM themes WHERE id=?", [id], (err, result) => {
      if (err) reject(err); else resolve(result);
    });
  });
}

module.exports = { getAll, create, update, remove };
