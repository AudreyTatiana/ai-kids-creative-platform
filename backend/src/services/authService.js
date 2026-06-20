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
  const userId = await userRepository.create({ firstName, lastName, email, hashedPassword, role: "client" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await userRepository.saveActivationCode(userId, code, expires);

  const { sendActivationEmail } = require("./emailService");
  sendActivationEmail({ email, firstName, code }).catch((err) =>
    console.error("Erreur email activation:", err.message)
  );
}

async function verifyActivation({ email, code }) {
  if (!email || !code) {
    throw { status: 400, message: "Email et code obligatoires." };
  }
  const user = await userRepository.findByActivationCode(email, code);
  if (!user) {
    throw { status: 400, message: "Code invalide ou expiré." };
  }
  await userRepository.activateAccount(user.id);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw { status: 400, message: "Email et mot de passe obligatoires." };
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw { status: 401, message: "Email ou mot de passe incorrect." };
  }

  if (!user.is_activated) {
    throw { status: 403, message: "Compte non activé. Vérifiez votre email pour le code d'activation." };
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

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.updatePassword(user.id, hashedPassword);
}

async function getAllClients() {
  return await userRepository.findAllClients();
}

async function updateProfile(userId, { firstName, lastName, email }) {
  if (!firstName || !lastName || !email) {
    throw { status: 400, message: "Prénom, nom et email sont obligatoires." };
  }
  const existing = await userRepository.findByEmail(email);
  if (existing && existing.id !== userId) {
    throw { status: 400, message: "Cet email est déjà utilisé par un autre compte." };
  }
  await userRepository.updateProfile(userId, firstName, lastName, email);
  return await userRepository.findById(userId);
}

async function changePassword(userId, { currentPassword, newPassword }) {
  if (!currentPassword || !newPassword) {
    throw { status: 400, message: "Mot de passe actuel et nouveau mot de passe obligatoires." };
  }
  const user = await userRepository.findById(userId);
  if (!user) throw { status: 404, message: "Utilisateur introuvable." };

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw { status: 401, message: "Mot de passe actuel incorrect." };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepository.updatePassword(userId, hashedPassword);
}

module.exports = {
  registerUser,
  verifyActivation,
  loginUser,
  requestPasswordReset,
  resetUserPassword,
  getAllClients,
  updateProfile,
  changePassword,
};
