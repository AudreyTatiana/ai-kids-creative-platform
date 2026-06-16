const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const { sendWelcomeEmail, sendPasswordReset } = require("./emailService");

async function registerUser({ firstName, lastName, email, password }) {
  if (!firstName || !lastName || !email || !password) {
    throw { status: 400, message: "Tous les champs sont obligatoires." };
  }

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw { status: 400, message: "Cet email existe déjà." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.create({ firstName, lastName, email, hashedPassword, role: "client" });

  sendWelcomeEmail({ email, firstName }).catch((err) =>
    console.error("Erreur email bienvenue:", err.message)
  );
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw { status: 400, message: "Email et mot de passe obligatoires." };
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw { status: 401, message: "Email ou mot de passe incorrect." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: "Email ou mot de passe incorrect." };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  };
}

async function requestPasswordReset(email) {
  if (!email) {
    throw { status: 400, message: "Email obligatoire." };
  }

  const user = await userRepository.findByEmail(email);
  if (!user) return; // Réponse identique pour ne pas révéler l'existence du compte

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

  await userRepository.updateResetToken(user.id, token, expires);

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendPasswordReset({ email: user.email, firstName: user.first_name, resetLink });
}

async function resetUserPassword({ token, password }) {
  if (!token || !password) {
    throw { status: 400, message: "Token et mot de passe obligatoires." };
  }

  const user = await userRepository.findByResetToken(token);
  if (!user) {
    throw { status: 400, message: "Lien invalide ou expiré." };
  }

  const hashed = await bcrypt.hash(password, 10);
  await userRepository.updatePassword(user.id, hashed);
}

async function getAllClients() {
  return await userRepository.findAllClients();
}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetUserPassword,
  getAllClients,
};
