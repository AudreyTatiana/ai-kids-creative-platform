function buildPrompt(theme) {
  switch (theme) {
    case "Conte":
      return "Create a high quality magical portrait based on the uploaded face of a child The generated image should show the full body of the child while preserving the facial features and natural identity The child should appear as a beautiful fantasy princess wearing an elegant magical royal gown with glowing fabric delicate embroidery soft sparkles and graceful flowing hair The scene should take place in an enchanted fairy tale world with a magical castle or dreamy garden soft golden light floating particles pastel colors and a cinematic atmosphere The face should remain realistic recognizable and naturally blended with the generated body The final result should be detailed immersive dreamy joyful and visually enchanting with natural proportions and no distortion no extra limbs no artifacts and a smooth realistic fantasy finish";

    case "Super-héros":
      return "Transform this child's photo into a modern superhero, heroic pose, stylized costume, dynamic background, colorful and cinematic render, comic book style.";

    case "Pirate":
      return "Transform this child's photo into a pirate adventurer, ship and treasure decor, exploration atmosphere, illustrated style for children, warm colors.";

    case "Univers féerique":
      return "Transform this child's photo into an enchanted fairy world, magical forest, luminous dust, soft colors, poetic and dreamy render, fantasy children's illustration.";

    case "Princesse":
      return "Transform this child's photo into an elegant princess in a magical universe, refined dress, soft lighting, fairy-tale castle, children's illustration style.";

    case "Astronaute":
      return "Transform this child's photo into a little astronaut in space, dreamy atmosphere, stars and planets, soft light, children's illustration style, colorful cosmos.";

    default:
      return "Transform this child's photo into a creative and personalized illustration, adapted to a soft, magical and artistic visual universe, children's book style.";
  }
}

module.exports = {
  buildPrompt,
};
