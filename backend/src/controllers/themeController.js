const repo = require("../repositories/themeRepository");

async function list(req, res) {
  try {
    const rows = await repo.getAll();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function create(req, res) {
  try {
    const { name, description, category, status } = req.body;
    if (!name) return res.status(400).json({ message: "Le nom est obligatoire." });
    const result = await repo.create({
      name,
      description: description || "",
      category: category || "Fantaisie",
      status: status || "Actif",
    });
    return res.status(201).json({ id: result.insertId, message: "Thème créé." });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, description, category, status } = req.body;
    if (!name) return res.status(400).json({ message: "Le nom est obligatoire." });
    await repo.update(id, { name, description, category, status });
    return res.json({ message: "Thème mis à jour." });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await repo.remove(id);
    return res.json({ message: "Thème supprimé." });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

module.exports = { list, create, update, remove };
