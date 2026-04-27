const mongoose = require("mongoose");

async function connectMongo() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/petitsreves";
  try {
    await mongoose.connect(uri);
    console.log("Connecté à MongoDB :", uri.replace(/:\/\/.*@/, "://<credentials>@"));
  } catch (err) {
    console.error("Erreur MongoDB :", err.message);
    console.error("URI utilisée (masquée) :", uri.replace(/:\/\/.*@/, "://<credentials>@"));
    console.error("→ Vérifiez MONGO_URI dans le fichier .env");
  }
}

module.exports = connectMongo;
