const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err.message);
    process.exit(1);
  }
  console.log("Connecté à la base de données MySQL.");

  // Migrations colonnes users
  db.query("ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL", (err) => {
    if (err && err.code !== "ER_DUP_FIELDNAME") console.error("Migration reset_token:", err.message);
  });
  db.query("ALTER TABLE users ADD COLUMN reset_token_expires DATETIME DEFAULT NULL", (err) => {
    if (err && err.code !== "ER_DUP_FIELDNAME") console.error("Migration reset_token_expires:", err.message);
  });

});

module.exports = db;
