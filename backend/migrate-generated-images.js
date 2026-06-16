/**
 * Script de migration one-shot
 * Migre orders.generated_images (JSON) → tables ai_request + generated_image
 * Usage : node migrate-generated-images.js
 * Supprimer ce fichier après exécution réussie.
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

async function migrate() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Connecté à MySQL");

  // Récupère toutes les commandes avec des images générées
  const [orders] = await db.query(
    `SELECT id, order_number, generated_images, created_at
     FROM orders
     WHERE generated_images IS NOT NULL AND generated_images != '[]' AND generated_images != 'null'`
  );

  console.log(`📦 ${orders.length} commande(s) avec des images à migrer`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const order of orders) {
    try {
      // Vérifier si une ai_request existe déjà pour cette commande
      const [existing] = await db.query(
        "SELECT id FROM ai_request WHERE order_id = ?",
        [order.id]
      );

      if (existing.length > 0) {
        console.log(`⏭️  Commande ${order.order_number} : ai_request déjà existante, on passe`);
        skipCount++;
        continue;
      }

      // Parser le JSON
      let images = [];
      try {
        images = typeof order.generated_images === "string"
          ? JSON.parse(order.generated_images)
          : order.generated_images;
      } catch {
        console.warn(`⚠️  Commande ${order.order_number} : JSON invalide, ignorée`);
        errorCount++;
        continue;
      }

      if (!Array.isArray(images) || images.length === 0) {
        skipCount++;
        continue;
      }

      // Créer la ligne ai_request
      const [aiResult] = await db.query(
        `INSERT INTO ai_request (order_id, prompt, status, created_at)
         VALUES (?, NULL, 'completed', ?)`,
        [order.id, order.created_at]
      );
      const aiRequestId = aiResult.insertId;

      // Créer une ligne generated_image par URL
      for (const url of images) {
        if (!url || typeof url !== "string") continue;
        await db.query(
          `INSERT INTO generated_image (ai_request_id, image_url, created_at)
           VALUES (?, ?, ?)`,
          [aiRequestId, url, order.created_at]
        );
      }

      console.log(`✅ Commande ${order.order_number} : ${images.length} image(s) migrée(s)`);
      successCount++;
    } catch (err) {
      console.error(`❌ Commande ${order.order_number} erreur :`, err.message);
      errorCount++;
    }
  }

  console.log("\n========== RÉSUMÉ ==========");
  console.log(`✅ Migrées    : ${successCount}`);
  console.log(`⏭️  Ignorées   : ${skipCount}`);
  console.log(`❌ Erreurs    : ${errorCount}`);
  console.log("============================\n");

  await db.end();
  console.log("Migration terminée. Tu peux supprimer ce fichier.");
}

migrate().catch((err) => {
  console.error("Erreur fatale :", err.message);
  process.exit(1);
});
