const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, orderController.getAllOrders);
router.get("/stats", orderController.getOrderStats);
router.get("/physical", orderController.getPhysicalOrders);
router.get("/client/:email", orderController.getOrdersByClientEmail);
router.get("/:orderNumber/realisation", orderController.getOrderRealisation);

module.exports = router;
