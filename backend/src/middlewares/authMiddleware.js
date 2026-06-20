const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expiré ou invalide." });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }
  next();
}

function requireClient(req, res, next) {
  if (!req.user || (req.user.role !== "client" && req.user.role !== "admin")) {
    return res.status(403).json({ message: "Accès réservé aux clients connectés." });
  }
  next();
}

module.exports = { verifyToken, requireAdmin, requireClient };
