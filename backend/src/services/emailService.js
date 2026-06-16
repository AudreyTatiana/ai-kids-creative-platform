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

async function sendOrderConfirmation({ email, firstName, orderNumber, product, theme, delivery, amount }) {
  const transporter = getTransporter();

  const fmt = (n) => n.toFixed(2).replace(".", ",") + "€";
  const realisationLink = `${process.env.FRONTEND_URL}/realisation/${orderNumber}`;

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

        ${delivery !== "email" ? `
        <div style="background:#fff8ef;border:1px solid #f3dfb6;border-radius:12px;padding:16px;margin:24px 0;">
          <p style="color:#7a7699;margin:0;">📦 Votre commande physique sera préparée et expédiée sous 5 à 7 jours ouvrés.</p>
        </div>
        ` : ""}

        <div style="background:linear-gradient(135deg,#f3efff,#eef2ff);border:1px solid #ddd6fe;border-radius:16px;padding:28px;margin:28px 0;text-align:center;">
          <p style="color:#3d3a6d;font-size:18px;font-weight:800;margin:0 0 8px;">🎨 Vos réalisations sont prêtes !</p>
          <p style="color:#7a7699;font-size:15px;margin:0 0 24px;">
            Téléchargez vos créations personnalisées en vous connectant à votre espace PetitsRêves.
          </p>
          <a href="${realisationLink}"
             style="background:linear-gradient(135deg,#6f8fff,#9c8cff);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:16px;display:inline-block;">
            ⬇ Télécharger mes réalisations
          </a>
          <p style="color:#a89ec9;font-size:13px;margin:20px 0 0;">
            Vous devrez vous connecter avec votre compte PetitsRêves pour accéder à vos images.
          </p>
          <p style="color:#b0aac8;font-size:12px;margin:8px 0 0;word-break:break-all;">
            Ou copiez ce lien : <span style="color:#6f8fff;">${realisationLink}</span>
          </p>
        </div>

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

async function sendPasswordReset({ email, firstName, resetLink }) {
  const transporter = getTransporter();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
      <div style="background:linear-gradient(135deg,#6f8fff,#9c8cff);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;">✨ PetitsRêves</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Réinitialisation de mot de passe</p>
      </div>
      <div style="padding:32px;">
        <p style="color:#3d3a6d;font-size:16px;">Bonjour <strong>${firstName}</strong>,</p>
        <p style="color:#7a7699;">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous. Ce lien est valable <strong>1 heure</strong>.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${resetLink}" style="background:linear-gradient(135deg,#6f8fff,#9c8cff);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:16px;display:inline-block;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color:#8f89b2;font-size:13px;">Si vous n'avez pas fait cette demande, ignorez cet email. Votre mot de passe ne sera pas modifié.</p>
        <div style="background:#faf8ff;border-radius:12px;padding:16px;margin-top:24px;">
          <p style="color:#7a7699;font-size:13px;margin:0;">Ou copiez ce lien dans votre navigateur :<br/><span style="color:#6f8fff;word-break:break-all;">${resetLink}</span></p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"PetitsRêves" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Réinitialisation de votre mot de passe PetitsRêves",
    html,
  });
}

async function sendWelcomeEmail({ email, firstName }) {
  const transporter = getTransporter();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
      <div style="background:linear-gradient(135deg,#6f8fff,#9c8cff);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;">✨ PetitsRêves</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Bienvenue dans la magie !</p>
      </div>

      <div style="padding:32px;">
        <p style="color:#3d3a6d;font-size:16px;">Bonjour <strong>${firstName}</strong> 👋,</p>
        <p style="color:#7a7699;line-height:1.7;">
          Nous sommes ravis de vous accueillir sur <strong>PetitsRêves</strong> — la plateforme qui transforme les photos de vos enfants en créations magiques grâce à l'intelligence artificielle.
        </p>

        <div style="background:#f8f5ff;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #eef0fb;">
          <h2 style="color:#3d3a6d;font-size:18px;margin:0 0 16px;">Votre compte est prêt ✅</h2>
          <p style="color:#7a7699;margin:0 0 12px;">Vous pouvez dès maintenant :</p>
          <ul style="color:#7a7699;padding-left:20px;line-height:2;margin:0;">
            <li>Choisir un thème créatif (conte, super-héros, pirate…)</li>
            <li>Uploader les photos de votre enfant</li>
            <li>Générer des images personnalisées par IA</li>
            <li>Recevoir votre création par email ou en album physique</li>
          </ul>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a href="${process.env.FRONTEND_URL}" style="background:linear-gradient(135deg,#6f8fff,#9c8cff);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:16px;display:inline-block;">
            Commencer mon projet ✨
          </a>
        </div>

        <p style="color:#7a7699;font-size:15px;">À très bientôt,<br/>L'équipe PetitsRêves</p>

        <div style="background:#faf8ff;border-radius:12px;padding:16px;margin-top:24px;">
          <p style="color:#8f89b2;font-size:13px;margin:0;">
            Des questions ? Contactez-nous à <a href="mailto:${process.env.EMAIL_USER}" style="color:#6f8fff;">${process.env.EMAIL_USER}</a>
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"PetitsRêves" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✨ Bienvenue sur PetitsRêves !",
    html,
  });
}

async function sendContactConfirmation({ email, message }) {
  const transporter = getTransporter();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
      <div style="background:linear-gradient(135deg,#6f8fff,#9c8cff);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;">✨ PetitsRêves</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Nous avons bien reçu votre message</p>
      </div>

      <div style="padding:32px;">
        <p style="color:#3d3a6d;font-size:16px;">Bonjour,</p>
        <p style="color:#7a7699;">Merci de nous avoir contactés. Notre équipe a bien reçu votre message et reviendra vers vous dans les plus brefs délais.</p>

        <div style="background:#f8f5ff;border-radius:12px;padding:20px;margin:24px 0;border:1px solid #eef0fb;">
          <h3 style="color:#3d3a6d;margin:0 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Récapitulatif de votre message :</h3>
          <p style="color:#7a7699;font-style:italic;margin:0;line-height:1.6;">"${message}"</p>
        </div>

        <p style="color:#7a7699;font-size:15px;">À très bientôt,<br/>L'équipe PetitsRêves</p>

        <div style="background:#faf8ff;border-radius:12px;padding:20px;margin-top:24px;">
          <p style="color:#8f89b2;font-size:13px;margin:0;">Ceci est un message automatique, merci de ne pas y répondre directement.</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"PetitsRêves" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✨ Confirmation de réception - PetitsRêves",
    html,
  });
}

module.exports = { sendOrderConfirmation, sendPasswordReset, sendContactConfirmation, sendWelcomeEmail };
