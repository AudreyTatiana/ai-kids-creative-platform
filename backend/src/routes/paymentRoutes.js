const express = require("express");
const { createSession, confirmPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-session", createSession);
router.get("/confirm/:sessionId", confirmPayment);

module.exports = router;
