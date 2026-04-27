const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  theme: { type: String, required: true },
  delivery: { type: String, default: "email" },
  price: { type: Number, required: true },
  previewImage: { type: String, default: "" },
  addedAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);
