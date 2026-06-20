/**
 * Générateur de prompts pour FLUX.1 Kontext Pro (image-to-image).
 *
 * buildPrompts(product, theme, childName) → retourne un tableau de 4 prompts distincts.
 * Chaque prompt génère UNE image différente pour donner 4 vrais aperçus au choix.
 */

// ════════════════════════════════════════════════════════════════════════════
// RÈGLE DE PRÉSERVATION DU VISAGE
// ════════════════════════════════════════════════════════════════════════════
const FACE =
  "CRITICAL: Reproduce the child's face from the reference photo with absolute fidelity. " +
  "Same hair color, same hair style, same eye color and shape, same skin tone, " +
  "same nose and lips, same facial structure and proportions. " +
  "The child must be instantly recognizable as the same person from the photo. " +
  "Do not add text, watermarks or extra limbs.";

// ════════════════════════════════════════════════════════════════════════════
// STYLE DE BASE — PACK D'IMAGES
// Portrait chibi digital illustration. L'enfant est le seul sujet.
// ════════════════════════════════════════════════════════════════════════════
const STYLE_PACK =
  "Art style: premium children's digital illustration, semi-realistic chibi cartoon rendering. " +
  "Slightly oversized expressive eyes, small rounded nose, soft rounded cheeks. " +
  "Smooth soft shading, warm vibrant colors, rich but not overwhelming saturation. " +
  "Background is richly detailed but depth-of-field blurred to keep full focus on the child. " +
  "Warm golden rim lighting wrapping around the character. Print-ready gift quality.";

// ════════════════════════════════════════════════════════════════════════════
// STYLE DE BASE — ALBUM PHOTO MAGIQUE
// Scène large illustrée. L'enfant dans un monde riche. Plusieurs personnages.
// ════════════════════════════════════════════════════════════════════════════
const STYLE_ALBUM =
  "Art style: premium children's illustrated storybook scene, wide landscape composition. " +
  "Rich painterly digital illustration with detailed environments. " +
  "The child is a chibi-cute cartoon character placed inside a fully realized illustrated world. " +
  "Multiple characters and story elements present. " +
  "Warm golden atmospheric lighting, detailed backgrounds extending to the edges. " +
  "Like a double-page spread from a luxury hardcover children's adventure book.";

// ════════════════════════════════════════════════════════════════════════════
// STYLE DE BASE — HISTOIRE PERSONNALISÉE
// Page de livre narratif. Scènes dramatiques. L'enfant au cœur d'une vraie histoire.
// ════════════════════════════════════════════════════════════════════════════
const STYLE_LIVRE =
  "Art style: full-page luxury children's book illustration, narrative digital painting. " +
  "The image looks like a single beautiful page from a premium hardcover personalized storybook for children. " +
  "Rich painterly textures, warm cinematic lighting, deep atmospheric backgrounds. " +
  "The child is a chibi-cute cartoon character, clearly the hero of the story. " +
  "Multiple characters present, dynamic storytelling composition filling the entire frame. " +
  "The overall mood should feel magical, cinematic and emotionally engaging — like a beloved classic fairy tale brought to life. " +
  "Luxurious color palette with warm golds, deep purples, rich greens, dramatic lighting contrasts.";

// ════════════════════════════════════════════════════════════════════════════
// PACK D'IMAGES — 4 variants (4 poses / attitudes / fonds différents)
// ════════════════════════════════════════════════════════════════════════════
function packVariants(theme, n) {
  switch (theme) {

    case "Super-héros":
      return [
        `Transform the child into a chibi superhero: ${n} flying forward through the sky, one fist punched ahead, red cape dramatically billowing behind, blue and gold superhero suit, city skyline at golden sunset below. Confident joyful expression. Portrait 3/4 composition, character filling the frame.`,
        `Transform the child into a chibi superhero: ${n} landing heroically on a rooftop, both fists on the ground, cape swirling around them, blue and gold suit, dramatic city behind lit by orange sunset light. Powerful triumphant expression.`,
        `Transform the child into a chibi superhero: ${n} standing tall on top of a skyscraper, hands on hips, wind blowing the red cape, full body portrait, golden hour light from behind creating a glowing silhouette against a dramatic sky.`,
        `Transform the child into a chibi superhero: ${n} close-up portrait, blue and gold suit, mask over the eyes, huge confident smile, red cape visible at the shoulders, blurred city and glowing sunset behind. Eyes sparkling with determination.`,
      ];

    case "Pirate":
      return [
        `Transform the child into a chibi pirate captain: ${n} standing proudly on a ship deck, tricorn hat, red-and-gold vest, cutlass held up high, colorful parrot on shoulder, ocean sunset behind. Adventurous grin. 3/4 portrait.`,
        `Transform the child into a chibi pirate captain: ${n} kneeling beside an open treasure chest overflowing with gold coins and gems, holding a golden compass, eyes wide with excitement. Ship rigging and tropical island in the blurred background.`,
        `Transform the child into a chibi pirate captain: ${n} at the ship's helm, both hands on the wheel, tricorn hat, coat billowing in the wind, dramatic stormy sky with rays of golden light breaking through, ocean waves below.`,
        `Transform the child into a chibi pirate captain: ${n} close-up portrait, tricorn hat, playful grin, parrot whispering in their ear, sparkling ocean and golden sunset softly blurred behind. Gleaming mischievous eyes.`,
      ];

    case "Univers féerique":
      return [
        `Transform the child into a chibi fairy-tale character: ${n} in a luminous silver-and-white magical gown, crown of stars in the hair, standing in a glowing enchanted garden with floating lanterns and bioluminescent flowers all around. Serene magical smile. Portrait composition.`,
        `Transform the child into a chibi fairy-tale character: ${n} floating gently in the air, arms outstretched, surrounded by magical sparkling golden dust and swirling stars, an enchanted castle visible on a cloud far behind, soft warm light wrapping around the figure.`,
        `Transform the child into a chibi fairy-tale character: ${n} holding a glowing crystal orb in both hands, silver gown and flower crown, standing in a mystical stone archway covered in climbing roses, moonlight and fireflies all around.`,
        `Transform the child into a chibi fairy-tale character: ${n} close-up portrait, silver crown, sparkling eyes full of magic, soft pink and lilac flower petals drifting around the face, glowing enchanted forest softly blurred behind. Warm magical atmosphere.`,
      ];

    case "Princesse":
      return [
        `Transform the child into a chibi princess: ${n} in a gorgeous rose-pink ballgown with golden embroidery, silver tiara in flowing hair, standing in a castle garden in full bloom, pink cherry blossoms drifting around, fountain behind. Warm gracious smile. Portrait composition.`,
        `Transform the child into a chibi princess: ${n} in a lavender and gold adventure princess outfit — shorter layered skirt, matching cape, holding a small glowing wand — walking confidently through a magical forest path lined with glowing flowers.`,
        `Transform the child into a chibi princess: ${n} in a deep midnight-blue royal gown with silver star embroidery, seated on an elegant white throne covered in climbing roses, golden crown, warm candlelight glow all around. Regal and confident expression.`,
        `Transform the child into a chibi princess: ${n} close-up portrait, silver tiara, soft warm smile, wearing a pale gold gown, pink petals floating gently around the face, a dreamy softly lit castle garden blurred behind. Eyes gentle and sparkling.`,
      ];

    case "Astronaute":
      return [
        `Transform the child into a chibi astronaut: ${n} floating in space in a white and gold spacesuit, glass helmet with face clearly visible, surrounded by colorful nebulae in purple and orange, a ringed planet behind. Eyes wide with wonder, huge smile.`,
        `Transform the child into a chibi astronaut: ${n} standing on the glowing surface of the moon, spacesuit with mission patches, one hand planted on a flag, Earth visible in the starry sky behind. Triumphant proud pose.`,
        `Transform the child into a chibi astronaut: ${n} piloting a small rocket ship, cockpit glass showing the child's face clearly, shooting through a galaxy of stars and colorful nebulae, jetpack flames glowing orange. Concentrated joyful expression.`,
        `Transform the child into a chibi astronaut: ${n} close-up portrait inside a glass helmet, huge excited smile, stars and a glowing nebula reflected in the visor, warm golden light from a nearby sun illuminating the face. Pure wonder in the eyes.`,
      ];

    case "Chevalier":
      return [
        `Transform the child into a chibi knight: ${n} in shining silver and gold plate armor, red cape, sword raised proudly, standing before a majestic stone castle with flying banners, dramatic golden light breaking through clouds. Brave heroic smile.`,
        `Transform the child into a chibi knight: ${n} in full armor riding a white horse through a wildflower meadow, castle on a hill behind, golden afternoon light, red cape flowing. Confident joyful expression.`,
        `Transform the child into a chibi knight: ${n} in armor kneeling before a glowing magical sword embedded in a stone, reaching out to grab it, enchanted forest around with glowing particles and soft mist.`,
        `Transform the child into a chibi knight: ${n} close-up portrait in helmet partially lifted, silver armor glinting, warm smile, castle towers and dramatic sunset sky softly blurred behind. Courageous and kind eyes.`,
      ];

    case "Animaux":
    case "Conte":
      return [
        `Transform the child into a chibi explorer: ${n} in khaki safari hat and linen shirt, kneeling beside a young fox in golden savanna grass, gently petting it, warm sunset light, acacia tree behind. Tender joyful smile. Portrait composition.`,
        `Transform the child into a chibi explorer: ${n} in a coral swimsuit and goggles at the ocean surface, both arms around a friendly dolphin that is leaping joyfully beside them. Sparkling turquoise water with light rays. Huge delighted grin.`,
        `Transform the child into a chibi explorer: ${n} in khaki explorer outfit, standing next to a baby elephant, reaching up to touch its curling trunk with one hand, lush green jungle behind. Eyes wide with awe and love.`,
        `Transform the child into a chibi explorer: ${n} close-up portrait in safari hat, warm smile, a small colorful parrot or butterfly perched on their shoulder, golden savanna light glowing softly behind. Happy and curious expression.`,
      ];

    default:
      return [
        `Transform the child into a chibi fantasy hero: ${n} in a colorful fantasy costume, standing in a magical world full of wonder. Joyful confident smile. Portrait composition. Warm lighting.`,
        `Transform the child into a chibi fantasy hero: ${n} in a fantasy costume, dynamic action pose in a spectacular illustrated world. Excited expression.`,
        `Transform the child into a chibi fantasy hero: ${n} in a fantasy costume, discovering a magical object or place. Wide-eyed wonder. Rich detailed background.`,
        `Transform the child into a chibi fantasy hero: ${n} close-up portrait in fantasy costume, sparkling expressive eyes, magical world softly blurred behind. Warm smile.`,
      ];
  }
}

// ════════════════════════════════════════════════════════════════════════════
// ALBUM PHOTO MAGIQUE — 4 scènes distinctes de l'aventure
// Large, plusieurs personnages, l'enfant dans un monde riche
// ════════════════════════════════════════════════════════════════════════════
function albumVariants(theme, n) {
  switch (theme) {

    case "Super-héros":
      return [
        `Wide illustrated scene: chibi ${n} as a superhero flying confidently over a golden-hour city skyline, cape billowing, civilians below looking up and cheering, colorful fireworks in the sky above. Full scene, landscape composition.`,
        `Wide illustrated scene: chibi ${n} as a superhero standing next to a friendly small robot companion, both discovering a glowing treasure chest in a forest clearing, mysterious portal glowing behind them. Multiple characters, rich environment.`,
        `Wide illustrated scene: chibi ${n} as a superhero confronting a giant cartoonish fluffy cloud monster in the sky, fist raised, rainbow appearing behind the hero, city safe below. Dynamic action composition.`,
        `Wide illustrated scene: chibi ${n} as a superhero receiving a glowing medal from a cheerful cartoon mayor in front of a cheering crowd, colorful city square, confetti raining down. Celebration scene with multiple characters.`,
      ];

    case "Pirate":
      return [
        `Wide illustrated scene: chibi ${n} as a pirate captain at the helm of a large galleon, crew of cartoon animal pirates around, tropical island with a glowing X on the horizon, sunset sky with dramatic clouds.`,
        `Wide illustrated scene: chibi ${n} as a pirate discovering a treasure cave, holding a lantern, a map in one hand, a friendly cartoon sea turtle guiding the way, stalactites glowing with gold light, treasure everywhere.`,
        `Wide illustrated scene: chibi ${n} as a pirate on a dock trading with a cheerful cartoon merchant, exotic birds and jungle behind, colorful market stalls, other cartoon characters around. Warm tropical atmosphere.`,
        `Wide illustrated scene: chibi ${n} as a pirate sitting on top of an enormous treasure chest on a tropical island, flag planted, ocean panorama behind, parrot and tiny crab companion beside them. Victory celebration scene.`,
      ];

    case "Univers féerique":
      return [
        `Wide illustrated scene: chibi ${n} as a fairy-tale character riding a white horse through an enchanted forest, magical creatures (tiny fairies, glowing deer, friendly dragons) watching from the trees, rainbow and castle ahead.`,
        `Wide illustrated scene: chibi ${n} as a fairy-tale hero arriving at the gates of a floating castle on a cloud, a wise old wizard greeting them with a warm smile, magical birds and glowing butterflies all around.`,
        `Wide illustrated scene: chibi ${n} as a fairy-tale character exploring a giant magical library with floating books and glowing orbs, a friendly dragon curled up reading a book nearby, warm golden light through tall arched windows.`,
        `Wide illustrated scene: chibi ${n} as a fairy-tale hero at a grand banquet in an enchanted castle hall, surrounded by friendly magical creatures celebrating, lanterns floating overhead, a sparkling magical fountain in the center.`,
      ];

    case "Princesse":
      return [
        `Wide illustrated scene: chibi ${n} as a princess in a breathtaking rose-gold ballgown with hundreds of layered tulle petals and gold star embroidery, riding a white unicorn with a flowing silver mane through a meadow of giant blooming roses and cherry blossoms, tiny woodland animals (rabbit, fawn, butterflies) running alongside, a glittering castle with pink towers on the hill ahead. Magical golden hour light.`,
        `Wide illustrated scene: chibi ${n} as a princess inside a magical enchanted wardrobe room in a castle tower, surrounded by impossibly gorgeous floating gowns — a midnight-blue gown covered in real stars, an emerald gown with peacock feathers, a blush-pink gown with a 10-foot train of rose petals — a tiny glowing fairy godmother waving a sparkling wand, the gowns swirling like living things around the child. Warm magical atmosphere.`,
        `Wide illustrated scene: chibi ${n} as a princess in a stunning lavender-and-gold structured princess gown with a dramatic ruffled skirt and butterfly sleeves, seated at a royal garden tea party, cartoon animal friends at the table — a white rabbit in a top hat, a tiny deer with flower crown, a baby dragon pouring tea — enchanted roses climbing the stone walls, magical lanterns floating overhead.`,
        `Wide illustrated scene: chibi ${n} as a princess descending a grand crystal staircase in the most magnificent royal ball gown — deep sapphire blue with silver constellation embroidery, a dramatic sweeping train of shimmering fabric, matching tiara — a prince waiting below with hand outstretched, chandeliers with thousands of candles above, the entire ballroom of elegant cartoon guests turning to watch in amazement. Cinematic moment.`,
      ];

    case "Astronaute":
      return [
        `Wide illustrated scene: chibi ${n} as an astronaut exploring a colorful alien planet surface, a friendly small round robot companion rolling alongside, exotic glowing plants and rock formations, ringed planets in the sky above.`,
        `Wide illustrated scene: chibi ${n} as an astronaut piloting a spacecraft through an asteroid field, co-pilot seat occupied by a friendly cartoon alien, colorful nebulae all around, a destination planet glowing ahead.`,
        `Wide illustrated scene: chibi ${n} as an astronaut discovering an ancient star map on a glowing asteroid, a small robot scanning the surroundings, shooting stars and swirling galaxies in the background.`,
        `Wide illustrated scene: chibi ${n} as an astronaut arriving at a friendly alien village on a moon, alien children waving and offering glowing fruits, the spacecraft parked behind, Earth visible in the sky above.`,
      ];

    case "Chevalier":
      return [
        `Wide illustrated scene: chibi ${n} as a knight riding a white horse through a lush medieval kingdom, a friendly cartoon dragon flying overhead, a wizard companion walking alongside, colorful castle banners in the wind.`,
        `Wide illustrated scene: chibi ${n} as a knight standing before a wise old king in a grand stone hall, receiving a glowing enchanted sword, royal court watching, torches and stained glass windows in the background.`,
        `Wide illustrated scene: chibi ${n} as a knight helping a trapped friendly dragon free its wing from a thorn bush in an enchanted forest, magical light filtering through ancient trees, woodland creatures watching.`,
        `Wide illustrated scene: chibi ${n} as a knight at a medieval tournament arena, jousting lance raised in victory, cheerful crowd waving flags around the arena, a princess watching from the decorated royal box above.`,
      ];

    case "Animaux":
    case "Conte":
      return [
        `Wide illustrated scene: chibi ${n} as an explorer in a safari jeep with animal friends — a giraffe poking its head in the window, an elephant walking alongside, zebras in the background, golden savanna, huge warm sunset sky.`,
        `Wide illustrated scene: chibi ${n} as an explorer at a watering hole, surrounded by friendly cartoon animals — lion cub, parrot, monkey, baby hippo — all gathering peacefully, lush African savanna, golden hour light.`,
        `Wide illustrated scene: chibi ${n} as an explorer in a jungle, following a friendly toucan through dense foliage, a baby jaguar trotting alongside, exotic flowers and butterflies everywhere, rays of warm light through the canopy.`,
        `Wide illustrated scene: chibi ${n} as an underwater explorer in a glass dome submarine, watching colorful fish, dolphins, a gentle sea turtle and a glowing jellyfish float past the window. Magical bioluminescent ocean.`,
      ];

    default:
      return [
        `Wide illustrated scene: chibi ${n} as a fantasy hero in a magical world, multiple friendly characters around, rich detailed environment. Warm joyful atmosphere.`,
        `Wide illustrated scene: chibi ${n} as a fantasy hero discovering a magical place, companion character alongside, detailed illustrated world extending to edges of frame.`,
        `Wide illustrated scene: chibi ${n} as a fantasy hero in an action scene, dynamic composition, multiple characters, dramatic lighting.`,
        `Wide illustrated scene: chibi ${n} as a fantasy hero at a celebration, surrounded by friends and magical creatures, warm festive atmosphere.`,
      ];
  }
}

// ════════════════════════════════════════════════════════════════════════════
// HISTOIRE PERSONNALISÉE — 4 moments narratifs distincts d'une histoire
// ════════════════════════════════════════════════════════════════════════════
function livreVariants(theme, n) {
  switch (theme) {

    case "Super-héros":
      return [
        `Storybook illustration — CHAPTER 1 THE AWAKENING: chibi ${n} as a regular child discovering a glowing superhero suit hidden in a secret trunk in their bedroom, eyes wide with amazement, golden light pouring from the open chest, bedroom messy and cozy around them.`,
        `Storybook illustration — CHAPTER 2 FIRST FLIGHT: chibi ${n} as a superhero floating a few feet off the ground for the first time, expression of pure disbelief and joy, best friend below pointing up with mouth open, sunny park setting with trees and flowers.`,
        `Storybook illustration — CHAPTER 3 THE CHALLENGE: chibi ${n} as a superhero confronting a cartoonish villain made of thunderclouds, standing firm on a rooftop, cape billowing dramatically, city at risk below, lightning cracking behind the villain.`,
        `Storybook illustration — CHAPTER 4 THE VICTORY: chibi ${n} as a superhero standing triumphantly with the city safe behind, cheering crowd below, colorful fireworks in the sky, best friend and a friendly robot companion beside them celebrating. Happy ending scene.`,
      ];

    case "Pirate":
      return [
        `Storybook illustration — CHAPTER 1 THE MAP: chibi ${n} as a child finding an old rolled treasure map in a dusty attic chest, candlelight illuminating the mysterious X marking, a parrot on the windowsill, rain outside. Beginning of the adventure.`,
        `Storybook illustration — CHAPTER 2 THE SEA: chibi ${n} as a pirate captain on the deck of a ship in a storm, holding the mast, waves crashing, crew of cartoon animals working the sails around them, lightning illuminating the scene dramatically.`,
        `Storybook illustration — CHAPTER 3 THE ISLAND: chibi ${n} as a pirate fighting playfully with cartoon skeleton guards using a wooden sword, treasure cave entrance behind, a small friend helping distract a guard. Exciting comedic battle.`,
        `Storybook illustration — CHAPTER 4 THE TREASURE: chibi ${n} as a pirate opening an enormous treasure chest on a tropical beach, gold coins and gems exploding out, parrot companion cheering, crew of animal pirates jumping for joy around them, sunset over the sea.`,
      ];

    case "Univers féerique":
      return [
        `Full-page storybook illustration — CHAPTER 1 "L'APPEL DE LA MAGIE": chibi ${n} as a child in a cozy bedroom at night, a mysterious glowing book floating up from a dusty old chest, magical golden light pouring out and forming a swirling portal in the air, a white rabbit wearing a tiny crown sitting on the windowsill watching. Moonlight through the window, stars outside, warm golden glow from the portal illuminating the child's wide-eyed wonder. Rich painterly atmosphere.`,
        `Full-page storybook illustration — CHAPTER 2 "LE SAGE DE LA FORÊT": chibi ${n} as a fairy-tale hero on a white horse in an ancient glowing forest, meeting a majestic old wizard with long silver beard emerging from swirling golden mist, the wizard projecting a glowing magical map in the air showing the path to a faraway floating castle, enchanted fireflies and glowing mushrooms all around. Dramatic warm lighting through ancient trees.`,
        `Full-page storybook illustration — CHAPTER 3 "L'ÉPREUVE DU DRAGON": chibi ${n} as a fairy-tale hero holding a glowing crystal sword, standing bravely on a stone bridge before an enormous friendly-looking dragon whose eyes show confusion and curiosity, enchanted waterfall behind the bridge glowing blue, magical forest at night, stars and aurora visible in the sky above. Tense but warm atmosphere, the dragon clearly not evil.`,
        `Full-page storybook illustration — CHAPTER 4 "LA VICTOIRE": chibi ${n} as a fairy-tale hero riding triumphantly through the gates of a radiant floating castle, the dragon now a friendly ally flying proudly above, grateful kingdom characters cheering from balconies and streets — fairies, elves, friendly creatures — magical golden fireworks and sparkling light filling the sky. Epic joyful celebration. The most spectacular scene in the book.`,
      ];

    case "Princesse":
      return [
        `Storybook illustration — CHAPTER 1 THE WISH: chibi ${n} as a princess making a wish on a falling star from her tower window at night, a tiny glowing fairy appearing in the starlight. Magical and tender opening scene.`,
        `Storybook illustration — CHAPTER 2 THE QUEST: chibi ${n} as a princess in an adventure outfit with cape, setting out through an enchanted forest, woodland animal friends gathering around to help — a rabbit, an owl, a deer. Setting off together.`,
        `Storybook illustration — CHAPTER 3 THE ENCHANTMENT: chibi ${n} as a princess breaking a magical curse by touching a glowing rose, dark castle beginning to light up around her, petals transforming into butterflies, a witch's shadow fleeing.`,
        `Storybook illustration — CHAPTER 4 THE BALL: chibi ${n} as a princess descending a grand staircase in a magnificent ball gown, chandelier above, prince and all the kingdom's characters below gasping in admiration, magical atmosphere.`,
      ];

    case "Astronaute":
      return [
        `Storybook illustration — CHAPTER 1 THE LAUNCH: chibi ${n} as a child in a backyard rocket made of cardboard boxes, pressing a glowing button, the rocket beginning to lift off with stars of light, parents waving from below with big smiles.`,
        `Storybook illustration — CHAPTER 2 LOST IN SPACE: chibi ${n} as an astronaut floating in open space, tethered to a spacecraft, a friendly glowing alien appearing and pointing toward a hidden planet. Sense of wonder and surprise.`,
        `Storybook illustration — CHAPTER 3 ALIEN WORLD: chibi ${n} as an astronaut surrounded by curious friendly alien children on a colorful planet, exchanging small gifts, round robot companion translating, exotic glowing plants all around.`,
        `Storybook illustration — CHAPTER 4 HOME: chibi ${n} as an astronaut arriving home, bursting through the front door with a suitcase full of star rocks and alien souvenirs, family hugging them, the backyard rocket parked behind, stars visible in the dusk sky.`,
      ];

    case "Chevalier":
      return [
        `Storybook illustration — CHAPTER 1 THE PROPHECY: chibi ${n} as a young child in a medieval village discovering a glowing sword embedded in a stone in the town square, villagers gathered around watching in amazement as only this child can touch it.`,
        `Storybook illustration — CHAPTER 2 THE TRAINING: chibi ${n} as a young knight in training armor, practicing sword moves with a wise old knight mentor in a castle courtyard, a friendly small dragon watching and cheering from the side.`,
        `Storybook illustration — CHAPTER 3 THE BATTLE: chibi ${n} as a knight charging forward on horseback across a drawbridge, a cartoonish army of silly goblins retreating in every direction, enchanted sword glowing, ally characters fighting alongside.`,
        `Storybook illustration — CHAPTER 4 THE CROWNING: chibi ${n} as a knight kneeling before a queen in a grand hall, receiving a golden crown, the friendly dragon companion beside them, all the kingdom's characters cheering, golden confetti falling.`,
      ];

    case "Animaux":
    case "Conte":
      return [
        `Storybook illustration — CHAPTER 1 THE DISCOVERY: chibi ${n} as a child finding a magical golden compass in their grandfather's attic that points toward wild animals, eyes wide with wonder, a parrot on a nearby box, afternoon light through dusty windows.`,
        `Storybook illustration — CHAPTER 2 THE SAVANNA: chibi ${n} as an explorer arriving in Africa at sunrise, jeep stopping as a majestic lion family crosses the road before them, guide pointing with excitement, golden light and savanna stretching to the horizon.`,
        `Storybook illustration — CHAPTER 3 THE RESCUE: chibi ${n} as an explorer helping free a baby elephant whose leg is caught in vines, mother elephant watching anxiously nearby, jungle around, warm dappled light.`,
        `Storybook illustration — CHAPTER 4 THE FAREWELL: chibi ${n} as an explorer saying goodbye to all the animal friends gathered around — elephant, giraffe, lion cub, parrot — magical golden compass glowing in hand, promising to return, warm sunset.`,
      ];

    default:
      return [
        `Storybook illustration — CHAPTER 1: chibi ${n} discovering the beginning of a magical adventure. Sense of wonder. Rich illustrated setting.`,
        `Storybook illustration — CHAPTER 2: chibi ${n} meeting a mentor or ally character who reveals the quest. Multiple characters interacting.`,
        `Storybook illustration — CHAPTER 3: chibi ${n} in the climax action scene, facing the challenge, dramatic and exciting composition.`,
        `Storybook illustration — CHAPTER 4: chibi ${n} triumphant, happy ending, surrounded by friends and celebration. Warm joyful resolution.`,
      ];
  }
}

// ════════════════════════════════════════════════════════════════════════════
// FONCTION PRINCIPALE — retourne un tableau de 4 prompts
// ════════════════════════════════════════════════════════════════════════════
function buildPrompts(product, theme, childName) {
  const n = childName || "the child";
  const resolvedTheme = theme || "Super-héros";

  let variants;
  let style;

  switch (product) {
    case "Album Photo Magique":
      variants = albumVariants(resolvedTheme, n);
      style = STYLE_ALBUM;
      break;
    case "Histoire personnalisée":
    case "Livre d'Aventure":
    case "Livre Personnalisé":
      variants = livreVariants(resolvedTheme, n);
      style = STYLE_LIVRE;
      break;
    case "Pack d'images":
    default:
      variants = packVariants(resolvedTheme, n);
      style = STYLE_PACK;
      break;
  }

  return variants.map((v) => `${v} ${style} ${FACE}`);
}

// Compatibilité rétrograde — retourne le premier prompt
function buildPrompt(product, theme, childName) {
  return buildPrompts(product, theme, childName)[0];
}

module.exports = { buildPrompt, buildPrompts };
