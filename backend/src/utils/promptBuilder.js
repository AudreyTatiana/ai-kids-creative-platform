/**
 * Prompts optimisés pour FLUX.1 Kontext Pro.
 * Kontext est un modèle image-to-image : il transforme la photo d'entrée
 * en conservant le visage et l'identité du sujet.
 * Les prompts doivent être directifs et référencer le sujet ("the child").
 */
function buildPrompt(theme) {
  switch (theme) {

    case "Conte":
    case "Univers féerique":
      return (
        "Transform the child in this photo into a magical fairy tale princess. " +
        "Keep the child's face, skin tone and identity perfectly recognizable. " +
        "Dress them in a stunning royal gown with flowing fabric, golden embroidery and soft sparkles. " +
        "Place them in an enchanted fairy tale world with a glowing castle, magical forest, " +
        "floating lights and pastel dreamy colors. " +
        "Style: high quality children's book illustration, cinematic lighting, no distortion, no extra limbs."
      );

    case "Super-héros":
      return (
        "Transform the child in this photo into a modern superhero. " +
        "Keep the child's face and features completely intact and recognizable. " +
        "Give them a colorful stylized superhero costume with a cape and emblem. " +
        "Place them in a dynamic cityscape with dramatic lighting, comic book energy and vivid colors. " +
        "Style: cinematic superhero illustration for children, bold colors, heroic pose, no distortion."
      );

    case "Pirate":
      return (
        "Transform the child in this photo into a brave pirate adventurer. " +
        "Preserve the child's face and natural features exactly. " +
        "Dress them in a classic pirate outfit with a hat, coat and bandana. " +
        "Place them on a pirate ship or tropical island with treasure chests, ocean waves and a sunset sky. " +
        "Style: warm illustrated children's storybook style, adventurous atmosphere, no distortion."
      );

    case "Princesse":
      return (
        "Transform the child in this photo into an elegant princess in a magical kingdom. " +
        "Keep the child's face perfectly recognizable and naturally blended. " +
        "Dress them in a beautiful princess gown with soft pastel colors, flowers and sparkling details. " +
        "Place them in a dreamy castle with rose gardens and soft golden light. " +
        "Style: soft watercolor children's illustration, elegant and magical, no distortion."
      );

    case "Astronaute":
      return (
        "Transform the child in this photo into a little astronaut exploring space. " +
        "Preserve the child's face and identity completely. " +
        "Dress them in a colorful space suit with a helmet visor reflecting the cosmos. " +
        "Surround them with planets, colorful nebulas, stars and a rocket ship in the background. " +
        "Style: vibrant children's space illustration, playful and dreamy, no distortion."
      );

    default:
      return (
        "Transform the child in this photo into a beautiful creative illustration character. " +
        "Keep the child's face, expression and identity perfectly recognizable. " +
        "Apply a magical artistic style with soft colors, dreamy lighting and a whimsical fantasy background. " +
        "Style: high quality children's book illustration, warm and joyful atmosphere, no distortion."
      );
  }
}

module.exports = { buildPrompt };
