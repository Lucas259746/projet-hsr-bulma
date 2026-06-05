// utils/serializers/index.js

const { fetchUser: mihomoFetchUser } = require("../../config/mihomo");
const { loadCache } = require("../../config/lightConeCache");
const serializeCharacter = require("./character");

/**
 * Récupère et sérialise le profil complet d'un joueur.
 * Charge le cache des light cones avant la sérialisation si nécessaire.
 */
const getUserData = async (userId, language = "en") => {
  try {
    // Charge (ou rafraîchit) le cache des descriptions de light cones
    await loadCache(language);

    const data = await mihomoFetchUser(userId, language);

    const player = data.player || {};
    const characters = data.characters || [];

    return {
      uid: String(player.uid || userId),
      nickname: player.nickname || "Joueur",
      level: player.level != null ? Number(player.level) : null,
      worldLevel:
        player.world_level != null ? Number(player.world_level) : null,
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
      characterList: characters.map(serializeCharacter).filter(Boolean),
    };
  } catch (error) {
    console.error(`❌ Error fetching user ${userId}:`, error.message);
    throw error;
  }
};

module.exports = { getUserData };
