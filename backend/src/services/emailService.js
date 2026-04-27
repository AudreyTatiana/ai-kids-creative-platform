const nodemailer = require("nodemailer");

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendOrderConfirmation({ email, firstName, orderNumber, product, theme, delivery, amount, generatedImages }) {
  const transporter = getTransporter();

  const fmt = (n) => n.toFixed(2).replace(".", ",") + "€";

  const imagesHtml = generatedImages.length > 0
    ? generatedImages.map((url, i) =>
        `<img src="${url}" alt="Image ${i + 1}" style="width:200px;height:200px;object-fit:cover;border-radius:12px;margin:6px;" />`
      ).join("")
    : "<p>Vos images seront disponibles très prochainement.</p>";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
      <div style="background:linear-gradient(135deg,#6f8fff,#9c8cff);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;">✨ PetitsRêves</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Votre commande est confirmée !</p>
      </div>

      <div style="padding:32px;">
        <p style="color:#3d3a6d;font-size:16px;">Bonjour <strong>${firstName}</strong>,</p>
        <p style="color:#7a7699;">Merci pour votre commande. Voici le récapitulatif :</p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr><td style="padding:10px;color:#7a7699;">Numéro de commande</td><td style="padding:10px;color:#3d3a6d;font-weight:700;">#${orderNumber}</td></tr>
          <tr style="background:#f8f5ff;"><td style="padding:10px;color:#7a7699;">Produit</td><td style="padding:10px;color:#3d3a6d;font-weight:700;">${product}</td></tr>
          <tr><td style="padding:10px;color:#7a7699;">Thème</td><td style="padding:10px;color:#3d3a6d;font-weight:700;">${theme}</td></tr>
          <tr style="background:#f8f5ff;"><td style="padding:10px;color:#7a7699;">Livraison</td><td style="padding:10px;color:#3d3a6d;font-weight:700;">${delivery === "email" ? "Version électronique" : "Livraison à domicile"}</td></tr>
          <tr><td style="padding:10px;color:#7a7699;">Montant payé</td><td style="padding:10px;color:#3d3a6d;font-weight:700;">${fmt(amount)}</td></tr>
        </table>

        ${delivery === "email" ? `
        <div style="margin:24px 0;">
          <h2 style="color:#3d3a6d;font-size:20px;">Vos créations</h2>
          <div style="text-align:center;">${imagesHtml}</div>
        </div>
        ` : `
        <div style="background:#fff8ef;border:1px solid #f3dfb6;border-radius:12px;padding:16px;margin:24px 0;">
          <p style="color:#7a7699;margin:0;">Votre commande physique sera préparée et expédiée sous 5 à 7 jours ouvrés.</p>
        </div>
        `}

        <div style="background:#faf8ff;border-radius:12px;padding:20px;margin-top:24px;">
          <p style="color:#7a7699;font-size:14px;margin:0;">Des questions ? Contactez-nous à <a href="mailto:${process.env.EMAIL_USER}" style="color:#6f8fff;">${process.env.EMAIL_USER}</a></p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"PetitsRêves" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✨ Votre commande PetitsRêves #${orderNumber} est confirmée`,
    html,
  });
}

module.exports = { sendOrderConfirmation };
