const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/verify-activation", authController.verifyActivation);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/users", authController.listUsers);
router.put("/profile", verifyToken, authController.updateProfile);
router.put("/change-password", verifyToken, authController.changePassword);

module.exports = router;
