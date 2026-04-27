const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Commandes d'un client par email
router.get("/client/:email", (req, res) => {
  const { email } = req.params;
  db.query(
    "SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC",
    [email],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Erreur serveur.", error: err.message });
      return res.status(200).json(rows);
    }
  );
});

module.exports = router;
