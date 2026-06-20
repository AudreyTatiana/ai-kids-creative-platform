const { fal } = require("@fal-ai/client");
const { buildPrompts } = require("../utils/promptBuilder");
const fs = require("fs");

// Configuration fal.ai (FAL_KEY dans le .env)
fal.config({ credentials: process.env.FAL_KEY });

/**
 * Uploade une image locale vers le stockage fal.ai
 * et retourne l'URL publique temporaire.
 */
async function uploadImageToFal(imagePath, mimetype, filename) {
  const fileContent = fs.readFileSync(imagePath);
  const blob = new Blob([fileContent], { type: mimetype });
  const file = new File([blob], filename, { type: mimetype });
  return await fal.storage.upload(file);
}

/**
 * Génère 3 images avec FLUX.1 Kontext Pro via fal.ai.
 * Si FAL_KEY est absent → retourne des placeholders (mode test).
 */
async function generateImage(theme, images, product = null, childName = null) {
  if (!theme) throw new Error("Le thème est obligatoire.");
  if (!images || images.length === 0) throw new Error("Au moins une image est obligatoire.");

  const prompts = buildPrompts(product, theme, childName);

  // MODE TEST si pas de clé API
  if (!process.env.FAL_KEY) {
    console.warn("[AI] FAL_KEY absent — mode test activé.");
    return {
      theme,
      inputImages: images.map((img) => ({
        originalName: img.originalname,
        fileName: img.filename,
        path: img.path,
        mimetype: img.mimetype,
      })),
      generatedImages: [
        "https://placehold.co/512x512/d9ccff/3d3a6d?text=Apercu+1",
        "https://placehold.co/512x512/c6e4ff/3d3a6d?text=Apercu+2",
        "https://placehold.co/512x512/ffe8f7/3d3a6d?text=Apercu+3",
        "https://placehold.co/512x512/fff0cc/3d3a6d?text=Apercu+4",
      ],
    };
  }

  // Upload de la première image vers fal.ai
  const firstImage = images[0];
  console.log(`[AI] Upload image vers fal.ai : ${firstImage.originalname}`);
  const imageUrl = await uploadImageToFal(
    firstImage.path,
    firstImage.mimetype,
    firstImage.originalname
  );
  console.log(`[AI] Image uploadée : ${imageUrl}`);

  // 4 appels parallèles — un prompt distinct par aperçu
  console.log(`[AI] Génération FLUX.1 Kontext — 4 variants pour thème : ${theme}, produit : ${product}`);
  const results = await Promise.all(
    prompts.map((prompt, i) =>
      fal.subscribe("fal-ai/flux-pro/kontext", {
        input: {
          prompt,
          image_url: imageUrl,
          num_images: 1,
          aspect_ratio: "1:1",
          output_format: "jpeg",
          safety_tolerance: "3",
        },
        logs: false,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            console.log(`[FAL] Variant ${i + 1} en cours...`);
          }
        },
      }).catch((err) => {
        console.warn(`[FAL] Variant ${i + 1} échoué : ${err.message}`);
        return null;
      })
    )
  );

  const generatedImages = results.map((r, i) => {
    if (!r || !r.data?.images?.[0]?.url) {
      console.warn(`[FAL] Variant ${i + 1} sans image valide — placeholder utilisé.`);
      return `https://placehold.co/512x512/e8e0f7/3d3a6d?text=Apercu+${i + 1}`;
    }
    return r.data.images[0].url;
  });
  console.log(`[AI] ${generatedImages.length} image(s) générée(s).`);

  // Nettoyage des fichiers temporaires uploadés
  images.forEach((img) => {
    try { fs.unlinkSync(img.path); } catch (_) {}
  });

  return {
    theme,
    inputImages: images.map((img) => ({
      originalName: img.originalname,
      fileName: img.filename,
      mimetype: img.mimetype,
    })),
    generatedImages,
  };
}

module.exports = { generateImage };
