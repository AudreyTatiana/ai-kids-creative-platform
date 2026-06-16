const { fal } = require("@fal-ai/client");
const { buildPrompt } = require("../utils/promptBuilder");
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
async function generateImage(theme, images) {
  if (!theme) throw new Error("Le thème est obligatoire.");
  if (!images || images.length === 0) throw new Error("Au moins une image est obligatoire.");

  const prompt = buildPrompt(theme);

  // MODE TEST si pas de clé API
  if (!process.env.FAL_KEY) {
    console.warn("[AI] FAL_KEY absent — mode test activé.");
    return {
      theme,
      prompt,
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

  // Appel FLUX.1 Kontext Pro
  console.log(`[AI] Génération FLUX.1 Kontext — thème : ${theme}`);
  const result = await fal.subscribe("fal-ai/flux-pro/kontext", {
    input: {
      prompt,
      image_url: imageUrl,
      num_images: 3,
      aspect_ratio: "1:1",
      output_format: "jpeg",
      safety_tolerance: "2",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS" && update.logs) {
        update.logs.forEach((log) => console.log("[FAL]", log.message));
      }
    },
  });

  const generatedImages = result.data.images.map((img) => img.url);
  console.log(`[AI] ${generatedImages.length} image(s) générée(s).`);

  // Nettoyage des fichiers temporaires uploadés
  images.forEach((img) => {
    try { fs.unlinkSync(img.path); } catch (_) {}
  });

  return {
    theme,
    prompt,
    inputImages: images.map((img) => ({
      originalName: img.originalname,
      fileName: img.filename,
      mimetype: img.mimetype,
    })),
    generatedImages,
  };
}

module.exports = { generateImage };
