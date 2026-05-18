const express = require('express');
const router = express.Router();
const client = require('../config/starrail');
const { getUserData } = require('../utils/serializers');

/**
 * GET /api/user/:userId
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = 'en' } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await getUserData(userId, language);
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/characters
 */
router.get('/characters', async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const characters = client.getAllCharacters();
    
    const serialized = characters.map(char => ({
      id: char.id,
      name: char.name?.get(language) || char.name?.get('en'),
      rarity: char.stars,
      path: char.path?.name?.get(language) || char.path?.name?.get('en'),
      combatType: char.combatType?.name?.get(language) || char.combatType?.name?.get('en'),
    }));
    
    res.json(serialized);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/light-cones
 */
router.get('/light-cones', async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const lightCones = client.getAllLightCones();
    
    const serialized = lightCones.map(lc => ({
      id: lc.id,
      name: lc.name?.get(language) || lc.name?.get('en'),
      rarity: lc.stars,
      path: lc.path?.name?.get(language) || lc.path?.name?.get('en'),
    }));
    
    res.json(serialized);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/relics
 */
router.get('/relics', async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const relics = client.getAllRelics();
    
    const serialized = relics.map(relic => ({
      id: relic.id,
      name: relic.name?.get(language) || relic.name?.get('en'),
      type: relic.type?.name?.get(language) || relic.type?.name?.get('en'),
      set: relic.set?.name?.get(language) || relic.set?.name?.get('en'),
      rarity: relic.stars,
    }));
    
    res.json(serialized);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;