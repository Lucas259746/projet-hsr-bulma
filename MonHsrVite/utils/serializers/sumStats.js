// utils/serializers/sumStats.js
// Utilise "statistics" de Mihomo : totaux finaux déjà calculés.

const serializeStats = (character) => {
  if (!character) return [];

  const statistics = character.statistics || [];

  if (Array.isArray(statistics) && statistics.length > 0) {
    return statistics.map((stat) => ({
      key:       stat.field || "unknown",
      name:      stat.name  || (stat.field || "").toUpperCase(),
      total:     stat.display || String(stat.value ?? 0),
      isPercent: stat.percent || false,
    }));
  }

  // Fallback attributes+additions si statistics absent
  const attributes = character.attributes || [];
  const additions  = character.additions  || [];
  const addMap = {};
  for (const a of additions) { if (a.field) addMap[a.field] = a; }

  return attributes.map((attr) => {
    const bonus     = addMap[attr.field] || null;
    const total     = (attr.value ?? 0) + (bonus?.value ?? 0);
    const isPercent = attr.percent || false;
    const fmt = (v) => {
      if (!v) return "0";
      if (isPercent) return `${(v * 100).toFixed(1)}%`;
      if (attr.field.includes("spd")) return v.toFixed(1);
      return Math.floor(v).toLocaleString();
    };
    return {
      key:       attr.field || "unknown",
      name:      attr.name  || (attr.field || "").toUpperCase(),
      total:     fmt(total),
      isPercent,
    };
  }).filter((s) => s.total !== "0");
};

module.exports = serializeStats;
