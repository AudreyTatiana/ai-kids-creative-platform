const Stripe = require("stripe");
const orderRepository = require("../repositories/orderRepository");
const paymentRepository = require("../repositories/paymentRepository");
const deliveryRepository = require("../repositories/deliveryRepository");
const { sendOrderConfirmation } = require("./emailService");

function getStripe() {
  return Stripe(process.env.STRIPE_SECRET_KEY);
}

function generateOrderNumber() {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `PR-2026-${rand}`;
}

async function createCheckoutSession({ product, theme, delivery, amount, customer, generatedImages }) {
  if (!product || !amount || !customer?.email) {
    throw { status: 400, message: "Données manquantes." };
  }

  const stripe = getStripe();
  const orderNumber = generateOrderNumber();

  await orderRepository.create({
    orderNumber,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    product,
    theme,
    delivery,
    amount,
    generatedImages,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customer.email,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product,
            description: `Thème : ${theme} — Livraison : ${delivery === "email" ? "par email" : "à domicile"}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      order_number: orderNumber,
      product,
      theme,
      delivery,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone || "",
      address: customer.address || "",
      city: customer.city || "",
      postal_code: customer.postalCode || "",
      country: customer.country || "France",
    },
    success_url: `${process.env.FRONTEND_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment`,
  });

  return { url: session.url, sessionId: session.id };
}

async function handlePaymentConfirmation(sessionId) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw { status: 400, message: "Paiement non confirmé." };
  }

  // Idempotence : commande déjà confirmée
  const existing = await orderRepository.findBySessionId(sessionId);
  if (existing) {
    return {
      orderNumber: existing.order_number,
      product: existing.product,
      theme: existing.theme,
      delivery: existing.delivery,
      amount: parseFloat(existing.amount),
      email: existing.email,
    };
  }

  const meta = session.metadata;
  const amount = session.amount_total / 100;

  await orderRepository.markAsPaid(meta.order_number, sessionId);

  // Enregistrer le paiement dans la table payment
  try {
    const order = await orderRepository.findByOrderNumber(meta.order_number);
    if (order) {
      const alreadyPaid = await paymentRepository.findByOrderId(order.id);
      if (!alreadyPaid) {
        await paymentRepository.create({
          orderId: order.id,
          amount,
          method: "stripe",
          transactionReference: sessionId,
        });
      }

      // Créer la livraison si livraison physique et adresse fournie dans metadata
      if (meta.delivery && meta.delivery !== "email" && meta.address) {
        const alreadyDelivery = await deliveryRepository.findByOrderId(order.id);
        if (!alreadyDelivery) {
          await deliveryRepository.create({
            orderId: order.id,
            address: meta.address,
            city: meta.city || "",
            postalCode: meta.postal_code || "",
            country: meta.country || "France",
            email: session.customer_email,
          });
        }
      }
    }
  } catch (err) {
    console.error("Erreur enregistrement payment/delivery:", err.message);
    // Non bloquant : le paiement Stripe est confirmé, seule la table interne échoue
  }

  await sendOrderConfirmation({
    email: session.customer_email,
    firstName: meta.firstName,
    orderNumber: meta.order_number,
    product: meta.product,
    theme: meta.theme,
    delivery: meta.delivery,
    amount,
  });

  return {
    orderNumber: meta.order_number,
    product: meta.product,
    theme: meta.theme,
    delivery: meta.delivery,
    amount,
    email: session.customer_email,
  };
}

module.exports = { createCheckoutSession, handlePaymentConfirmation };
