const authService = require("../services/authService");

async function register(req, res) {
  try {
    await authService.registerUser(req.body);
    return res.status(201).json({ message: "Inscription réussie." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(200).json({ message: "Connexion réussie.", ...result });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
}

async function forgotPassword(req, res) {
  try {
    await authService.requestPasswordReset(req.body.email);
    return res.status(200).json({ message: "Si un compte existe, un email a été envoyé." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
}

async function resetPassword(req, res) {
  try {
    await authService.resetUserPassword(req.body);
    return res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
}

async function listUsers(req, res) {
  try {
    const users = await authService.getAllClients();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
}

module.exports = { register, login, forgotPassword, resetPassword, listUsers };
