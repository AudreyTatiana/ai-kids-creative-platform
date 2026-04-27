const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const sharp = require("sharp");

// Génère plusieurs images en conservant le style de la photo (Stability AI SDXL img2img)
async function generateImages(imagePath, prompt, numImages = 3) {
  // Redimensionner l'image à 1024x1024 (requis par SDXL)
  const resizedBuffer = await sharp(imagePath)
    .resize(1024, 1024, { fit: "cover" })
    .jpeg()
    .toBuffer();

  const formData = new FormData();

  formData.append("init_image", resizedBuffer, {
    filename: "input.jpg",
    contentType: "image/jpeg",
  });
  formData.append("init_image_mode", "IMAGE_STRENGTH");
  formData.append("image_strength", "0.4"); // 0 = copie exacte, 1 = ignore l'image
  formData.append("text_prompts[0][text]", prompt);
  formData.append("text_prompts[0][weight]", "1");
  formData.append("text_prompts[1][text]", "blurry, bad quality, distorted face, ugly");
  formData.append("text_prompts[1][weight]", "-1");
  formData.append("cfg_scale", "7");
  formData.append("steps", "30");
  formData.append("samples", String(numImages));

  const response = await axios.post(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "application/json",
      },
    }
  ).catch((err) => {
    const detail = err.response?.data || err.message;
    console.error("Stability AI error:", JSON.stringify(detail, null, 2));
    throw new Error(JSON.stringify(detail));
  });

  // Retourner les images en base64
  return response.data.artifacts.map(
    (artifact) => `data:image/png;base64,${artifact.base64}`
  );
}

module.exports = { generateImages };
