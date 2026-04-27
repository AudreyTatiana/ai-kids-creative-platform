const express = require("express");
const aiController = require("../controllers/aiController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// On accepte un tableau d'images (jusqu'à 4)
router.post("/generate", upload.array("images", 4), aiController.generate);

module.exports = router;