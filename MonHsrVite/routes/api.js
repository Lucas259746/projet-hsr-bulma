const express = require("express");
const router = express.Router();
const client = require("../config/starrail");
const { getUserData } = require("../utils/serializers");

// Route pour le profil sérialisé (votre application)
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

// NOUVELLE ROUTE : Pour inspecter les données brutes
router.get("/user/:userId/raw", async (req, res) => {
  try {
    const { userId } = req.params;
    const player = await client.fetchUser(userId);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/characters
 */
router.get("/characters", async (req, res) => {
  try {
    const { language = "en" } = req.query;
    // 🌟 CORRECTION : Utilisation de cachedAssetsManager
    const characters = client.cachedAssetsManager.getCharacters();

    const serialized = characters.map((char) => ({
      id: char.id,
      name: char.name?.get(language) || char.name?.get("en"),
      rarity: char.stars,
      path: char.path?.name?.get(language) || char.path?.name?.get("en"),
      combatType:
        char.combatType?.name?.get(language) ||
        char.combatType?.name?.get("en"),
    }));

    res.json(serialized);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/light-cones
 */
router.get("/light-cones", async (req, res) => {
  try {
    const { language = "en" } = req.query;
    // 🌟 CORRECTION : Utilisation de cachedAssetsManager
    const lightCones = client.cachedAssetsManager.getLightCones();

    const serialized = lightCones.map((lc) => ({
      id: lc.id,
      name: lc.name?.get(language) || lc.name?.get("en"),
      rarity: lc.stars,
      path: lc.path?.name?.get(language) || lc.path?.name?.get("en"),
    }));

    res.json(serialized);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/relics
 */
router.get("/relics", async (req, res) => {
  try {
    const { language = "en" } = req.query;
    // 🌟 CORRECTION : Utilisation de cachedAssetsManager
    const relics = client.cachedAssetsManager.getRelics();

    const serialized = relics.map((relic) => ({
      id: relic.id,
      name: relic.name?.get(language) || relic.name?.get("en"),
      rarity: relic.stars,
    }));

    res.json(serialized);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
