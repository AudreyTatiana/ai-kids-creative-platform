const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const connectMongo = require("./config/mongodb");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const themeRoutes = require("./routes/themeRoutes");

connectMongo();

const app = express();

// Logging HTTP
app.use(morgan("dev"));

// Sécurité HTTP headers (XSS, clickjacking, MIME sniffing…)
app.use(helmet());

// CORS — autorise uniquement le frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Rate limiting — protection brute force sur les routes auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Trop de tentatives. Réessayez dans 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const origin = req.headers.origin || req.headers.referer || "";
    const allowed = process.env.FRONTEND_URL || "http://localhost:5173";
    if (origin && !origin.startsWith(allowed)) {
      return res.status(403).json({ message: "Origine non autorisée." });
    }
  }
  next();
});

app.use("/api/auth", authLimiter);

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/themes", themeRoutes);

// Gestionnaire d'erreurs global — renvoie toujours du JSON
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Erreur upload : ${err.message}` });
  }
  console.error(err);
  return res.status(500).json({ message: "Erreur serveur.", error: err.message });
});

module.exports = app;
