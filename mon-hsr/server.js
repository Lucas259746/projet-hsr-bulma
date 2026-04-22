const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fonction helper pour faire les requêtes à l'API Mihomo
const fetchFromMihomo = async (endpoint, userId, language = 'en') => {
  try {
    // Normaliser la langue en minuscules
    const lang = language.toLowerCase();
    const url = `https://api.mihomo.me${endpoint}/${userId}?language=${lang}&lang=${lang}`;
    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log(`Response received with language: ${lang}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Route pour données brutes (raw)
app.get('/api/sr_info/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = 'en' } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const data = await fetchFromMihomo('/sr_info', userId, language);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour données parsées
app.get('/api/sr_info_parsed/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = 'en' } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const data = await fetchFromMihomo('/sr_info_parsed', userId, language);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour panel
app.get('/api/sr_panel/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = 'en' } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const data = await fetchFromMihomo('/sr_panel', userId, language);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/sr_info/:userId (raw data)`);
  console.log(`  GET /api/sr_info_parsed/:userId (parsed data)`);
  console.log(`  GET /api/sr_panel/:userId (panel)`);
});
