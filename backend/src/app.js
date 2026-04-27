const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectMongo = require("./config/mongodb");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectMongo();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Gestionnaire d'erreurs global — renvoie toujours du JSON
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Erreur upload : ${err.message}` });
  }
  console.error(err);
  return res.status(500).json({ message: "Erreur serveur.", error: err.message });
});

module.exports = app;