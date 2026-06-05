// routes/api.js
const express = require("express");
const router = express.Router();

const { fetchUser } = require("../config/mihomo");
const { getUserData } = require("../utils/serializers");

// ──────────────────────────────────────────────
// GET /api/user/:userId
// Profil sérialisé complet (utilisé par le frontend)
// ──────────────────────────────────────────────
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = "en" } = req.query;
    const user = await getUserData(userId, language);
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ──────────────────────────────────────────────
// GET /api/user/:userId/raw
// Données brutes Mihomo (debug)
// ──────────────────────────────────────────────
router.get("/user/:userId/raw", async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = "en" } = req.query;
    const data = await fetchUser(userId, language);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ──────────────────────────────────────────────
// Les routes /characters, /light-cones, /relics
// ne sont plus nécessaires car Mihomo ne fournit
// pas de catalogue global — elles sont retirées.
// Si tu en as besoin, utilise l'API Enka.Network
// ou le fichier statique de starrail.js assets.
// ──────────────────────────────────────────────

module.exports = router;
