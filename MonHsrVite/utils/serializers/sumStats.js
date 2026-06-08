// utils/serializers/sumStats.js

const serializeStats = (character) => {
  if (!character) return [];

  const statistics = character.statistics || [];
  const attributes = character.attributes || [];
  const additions = character.additions || [];

  // Index base et bonus par field
  const attrMap = {};
  for (const a of attributes) {
    if (a.field) attrMap[a.field] = a;
  }
  const addMap = {};
  for (const a of additions) {
    if (a.field) addMap[a.field] = a;
  }

  if (statistics.length === 0) return [];

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
