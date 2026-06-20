const db = require("../config/db");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function findByEmail(email) {
  const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

async function findById(id) {
  const rows = await query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
}

async function create({ firstName, lastName, email, hashedPassword, role }) {
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword, role]
  );
  return result.insertId;
}

async function updateResetToken(id, token, expires) {
  await query(
    "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
    [token, expires, id]
  );
}

async function findByResetToken(token) {
  const rows = await query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()",
    [token]
  );
  return rows[0] || null;
}

async function updatePassword(id, hashedPassword) {
  await query(
    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
    [hashedPassword, id]
  );
}

async function findAllClients() {
  return await query(
    `SELECT u.id, u.first_name, u.last_name, u.email, u.role, u.created_at,
            COUNT(o.id) as orderCount
     FROM users u
     LEFT JOIN orders o ON o.email = u.email
     WHERE u.role = 'client'
     GROUP BY u.id
     ORDER BY u.created_at DESC`
  );
}

async function updateProfile(id, firstName, lastName, email) {
  await query(
    "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
    [firstName, lastName, email, id]
  );
}

async function saveActivationCode(id, code, expires) {
  await query(
    "UPDATE users SET activation_code = ?, activation_expires = ? WHERE id = ?",
    [code, expires, id]
  );
}

async function findByActivationCode(email, code) {
  const rows = await query(
    "SELECT * FROM users WHERE email = ? AND activation_code = ? AND activation_expires > NOW()",
    [email, code]
  );
  return rows[0] || null;
}

async function activateAccount(id) {
  await query(
    "UPDATE users SET is_activated = 1, activation_code = NULL, activation_expires = NULL WHERE id = ?",
    [id]
  );
}

module.exports = {
  findByEmail,
  findById,
  create,
  updateResetToken,
  findByResetToken,
  updatePassword,
  findAllClients,
  updateProfile,
  saveActivationCode,
  findByActivationCode,
  activateAccount,
};
