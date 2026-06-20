const paymentService = require("../services/paymentService");

async function createSession(req, res) {
  try {
    const result = await paymentService.createCheckoutSession(req.body);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(err.status || 500).json({ message: err.message || "Erreur Stripe." });
  }
}

async function confirmPayment(req, res) {
  try {
    const result = await paymentService.handlePaymentConfirmation(req.params.sessionId);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Confirm error:", err.message);
    return res.status(err.status || 500).json({ message: err.message || "Erreur confirmation." });
  }
}

module.exports = { createSession, confirmPayment };
