const aiService = require("../services/aiService");

async function generate(req, res) {
  try {
    const { theme } = req.body;
    const images = req.files; // req.files pour plusieurs images
    
    console.log("BODY :", req.body);
    console.log("FILES :", req.files);

    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "Au moins une image est obligatoire (2 à 4 recommandées).",
      });
    }

    if (!theme) {
      return res.status(400).json({
        message: "Le thème est obligatoire.",
      });
    }

    // On passe le tableau d'images au service
    const result = await aiService.generateImage(theme, images);

    return res.status(200).json({
      message: "Génération lancée avec succès.",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la génération IA.",
      error: error.message,
    });
  }
}

module.exports = {
  generate,
};