const Stripe = require("stripe");
const db = require("../config/db");
const { sendOrderConfirmation } = require("../services/emailService");

function getStripe() {
  return Stripe(process.env.STRIPE_SECRET_KEY);
}

function generateOrderNumber() {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `PR-2026-${rand}`;
}

// Crée une session Stripe Checkout
async function createSession(req, res) {
  try {
    const { product, theme, delivery, amount, customer, generatedImages } = req.body;

    if (!product || !amount || !customer?.email) {
      return res.status(400).json({ message: "Données manquantes." });
    }

    const stripe = getStripe();

    // Sauvegarder les données en DB avant la redirection Stripe
    const tempOrderNumber = generateOrderNumber();
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO orders (order_number, first_name, last_name, email, phone, product, theme, delivery, amount, status, generated_images)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
        [
          tempOrderNumber,
          customer.firstName,
          customer.lastName,
          customer.email,
          customer.phone || "",
          product,
          theme,
          delivery,
          amount,
          JSON.stringify(generatedImages || []),
        ],
        (err, result) => { if (err) reject(err); else resolve(result); }
      );
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
        order_number: tempOrderNumber,
        product,
        theme,
        delivery,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone || "",
      },
      success_url: `${process.env.FRONTEND_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment`,
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return res.status(500).json({ message: "Erreur Stripe.", error: error.message });
  }
}

// Confirme le paiement, sauvegarde la commande et envoie l'email
async function confirmPayment(req, res) {
  try {
    const { sessionId } = req.params;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Paiement non confirmé." });
    }

    // Vérifier si la commande existe déjà (idempotence)
    const existing = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM orders WHERE stripe_session_id = ?", [sessionId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0] || null);
      });
    });

    if (existing) {
      return res.status(200).json({
        orderNumber: existing.order_number,
        product: existing.product,
        theme: existing.theme,
        delivery: existing.delivery,
        amount: parseFloat(existing.amount),
        email: existing.email,
      });
    }

    const meta = session.metadata;
    const amount = session.amount_total / 100;

    // Mettre à jour la commande existante avec le session_id et status paid
    const order = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE orders SET status = 'paid', stripe_session_id = ? WHERE order_number = ?`,
        [sessionId, meta.order_number],
        (err) => { if (err) reject(err); else resolve(); }
      );
    }).then(() => new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM orders WHERE order_number = ?`,
        [meta.order_number],
        (err, rows) => { if (err) reject(err); else resolve(rows[0]); }
      );
    }));

    // Envoyer l'email de confirmation
    await sendOrderConfirmation({
      email: session.customer_email,
      firstName: meta.firstName,
      orderNumber: meta.order_number,
      product: meta.product,
      theme: meta.theme,
      delivery: meta.delivery,
      amount,
      generatedImages: Array.isArray(order.generated_images)
        ? order.generated_images
        : JSON.parse(order.generated_images || "[]"),
    });

    return res.status(200).json({
      orderNumber: meta.order_number,
      product: meta.product,
      theme: meta.theme,
      delivery: meta.delivery,
      amount,
      email: session.customer_email,
    });
  } catch (error) {
    console.error("Confirm error:", error.message);
    return res.status(500).json({ message: "Erreur confirmation.", error: error.message });
  }
}

module.exports = { createSession, confirmPayment };
