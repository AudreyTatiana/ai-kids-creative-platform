const { buildPrompt } = require("../utils/promptBuilder");
const { generateImages } = require("../utils/comfyClient");

async function generateImage(theme, images) {
  if (!theme) throw new Error("Le thème est obligatoire.");
  if (!images || images.length === 0) throw new Error("Au moins une image est obligatoire.");

  const prompt = buildPrompt(theme);

  // On utilise la première image uploadée comme image de référence
  const firstImagePath = images[0].path;

  // MODE TEST : images fictives pour tester sans crédits IA
  // Supprimer cette ligne et décommenter la suivante quand les crédits sont disponibles
  const generatedUrls = [
    "https://placehold.co/512x512/d9ccff/3d3a6d?text=Apercu+1",
    "https://placehold.co/512x512/c6e4ff/3d3a6d?text=Apercu+2",
    "https://placehold.co/512x512/ffe8f7/3d3a6d?text=Apercu+3",
  ];
  // const generatedUrls = await generateImages(firstImagePath, prompt, 3);

  const inputImages = images.map((image) => ({
    originalName: image.originalname,
    fileName: image.filename,
    path: image.path,
    mimetype: image.mimetype,
  }));

  return {
    theme,
    prompt,
    inputImages,
    generatedImages: generatedUrls,
  };
}

module.exports = { generateImage };
