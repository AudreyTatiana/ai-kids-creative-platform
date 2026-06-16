const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/stats", orderController.getOrderStats);
router.get("/physical", orderController.getPhysicalOrders);
router.get("/client/:email", orderController.getOrdersByClientEmail);
router.get("/:orderNumber/realisation", orderController.getOrderRealisation);

module.exports = router;
