require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",  
  database: "petitsreves",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL :", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

/* ================= REGISTER ================= */

app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = "client";

    const query = `
      INSERT INTO users (first_name, last_name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [firstName, lastName, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              message: "Cet email existe déjà.",
            });
          }

          return res.status(500).json({
            message: "Erreur serveur.",
            error: err.message,
          });
        }

        return res.status(201).json({
          message: "Inscription réussie.",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
});

/* ================= LOGIN ================= */

app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires.",
      });
    }

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Erreur serveur.",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Email ou mot de passe incorrect.",
        });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Email ou mot de passe incorrect.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Connexion réussie.",
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
});

/* ================= SERVER ================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});