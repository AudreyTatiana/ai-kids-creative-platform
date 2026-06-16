const express = require("express");
const { sendContactConfirmation } = require("../services/emailService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email et message requis." });
    }

    await sendContactConfirmation({ email, message });

    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur contact API:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
});

module.exports = router;
