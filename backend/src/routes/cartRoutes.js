const express = require("express");
const { getCart, addItem, removeItem, clearCart } = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addItem);
router.delete("/:userId/item/:itemId", removeItem);
router.delete("/:userId/clear", clearCart);

module.exports = router;
