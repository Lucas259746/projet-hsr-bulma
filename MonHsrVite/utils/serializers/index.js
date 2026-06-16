// utils/serializers/index.js

const { fetchUser: mihomoFetchUser } = require("../../config/mihomo");
const { loadCache } = require("../../config/lightConeCache");
const serializeCharacter = require("./character");

/**
 * Fonction principale : Récupère et nettoie le profil complet d'un joueur.
 */
const getUserData = async (userId, language = "en") => {
  try {
    // 1. Avant toute chose, on s'assure que le dictionnaire local des Cônes de Lumière est chargé.
    // Cela permet d'avoir accès aux descriptions complètes (qui ne sont pas toujours fournies par l'API de base).
    await loadCache(language);

    // 2. Appel à l'API distante (Mihomo) pour récupérer le gros JSON brut du joueur.
    const data = await mihomoFetchUser(userId, language);

    // 3. Extraction sécurisée des deux gros blocs : les infos du joueur et sa vitrine de personnages.
    const player = data.player || {};
    const characters = data.characters || [];

    // 4. Construction de l'objet propre qui sera renvoyé à ton frontend React.
    return {
      uid: String(player.uid || userId),
      nickname: player.nickname || "Joueur",
      level: player.level != null ? Number(player.level) : null,
      worldLevel:
        player.world_level != null ? Number(player.world_level) : null,

      // Sécurité : Si l'API ne donne pas le nombre exact de personnages possédés,
      // on compte simplement combien de personnages sont dans la vitrine (characters.length).
      characterCount:
        player.space_info?.avatar_count != null
          ? Number(player.space_info.avatar_count)
          : characters.length,
      lightConeCount:
        player.space_info?.light_cone_count != null
          ? Number(player.space_info.light_cone_count)
          : null,
      relicCount:
        player.space_info?.relic_count != null
          ? Number(player.space_info.relic_count)
          : null,

      // 5. La magie opère ici : On fait passer chaque personnage brut dans notre "moulinette" (serializeCharacter).
      // Le .filter(Boolean) supprime automatiquement les personnages qui auraient planté (renvoyés comme null).
      characterList: characters.map(serializeCharacter).filter(Boolean),
    };
  } catch (error) {
    // Interception des erreurs (ex: UID invalide, serveur Mihomo en panne) pour éviter que ton serveur Node ne crash.
    console.error(`❌ Error fetching user ${userId}:`, error.message);
    throw error; // On relance l'erreur pour que la route (server.js) puisse renvoyer un statut 404/500 au frontend.
  }
};

module.exports = { getUserData };
