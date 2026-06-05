const { StarRail } = require("starrail.js");
const path = require("path");

// Chemin vers le dossier cache local
const cachePath = path.join(__dirname, "../../cache");

const client = new StarRail({ cacheDirectory: cachePath });

// Initialisation du dossier
client.cachedAssetsManager.cacheDirectorySetup();

// Chargement des données
client.cachedAssetsManager
  .fetchAllContents()
  .then(() => {
    console.log("✅ Cache Star Rail prêt et chargé !");
  })
  .catch((err) => {
    console.error("❌ Erreur lors du chargement des assets :", err.message);
  });

module.exports = client;
