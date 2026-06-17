// utils/serializers/sumStats.js

/**
 * Cette fonction est cruciale. L'API donne les stats en trois morceaux :
 * - attributes (Les stats nues du personnage niveau 80)
 * - additions (Les bonus donnés par les reliques et le cône)
 * - statistics (Le total affiché en jeu)
 * Ce script les fusionne pour que le frontend puisse afficher : "Base + Équipement = Total".
 */
const serializeStats = (character) => {
  if (!character) return [];

  const statistics = character.statistics || [];
  const attributes = character.attributes || [];
  const additions = character.additions || [];

  // 1. On crée des dictionnaires rapides basés sur la clé 'field' (ex: "attack", "hp")
  const attrMap = {};
  for (const a of attributes) {
    if (a.field) attrMap[a.field] = a;
  }

  const addMap = {};
  for (const a of additions) {
    if (a.field) addMap[a.field] = a;
  }

  if (statistics.length === 0) return [];

  // 2. Pour chaque stat finale, on retrouve sa base et son bonus additionnel correspondant.
  return statistics.map((stat) => {
    const base = attrMap[stat.field] || null;
    const bonus = addMap[stat.field] || null;

    return {
      key: stat.field || "unknown",
      name: stat.name || stat.field,
      total: stat.display || String(stat.value ?? 0),
      base: base?.display || null,
      bonus: bonus?.display || null,
      isPercent: stat.percent || false,
    };
  });
};

module.exports = serializeStats;
