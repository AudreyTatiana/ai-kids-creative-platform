const Cart = require("../models/Cart");

async function findByUserId(userId) {
  return await Cart.findOne({ userId: Number(userId) });
}

async function createCart(userId) {
  return new Cart({ userId: Number(userId), items: [] });
}

async function save(cart) {
  cart.updatedAt = new Date();
  return await cart.save();
}

async function addItem(userId, item) {
  let cart = await findByUserId(userId);
  if (!cart) cart = await createCart(userId);
  cart.items.push(item);
  return await save(cart);
}

async function removeItem(userId, itemId) {
  const cart = await findByUserId(userId);
  if (!cart) return null;
  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  return await save(cart);
}

async function clear(userId) {
  return await Cart.findOneAndUpdate(
    { userId: Number(userId) },
    { items: [], updatedAt: new Date() },
    { new: true }
  );
}

module.exports = { findByUserId, addItem, removeItem, clear };
