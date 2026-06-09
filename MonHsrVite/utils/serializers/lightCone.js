// utils/serializers/lightCone.js
// Images gérées côté frontend via imageMap.js

const { getLightConeMeta } = require("../../config/lightConeCache");

const serializeLightCone = (lightCone) => {
  if (!lightCone) return null;

  const meta = getLightConeMeta(lightCone.id);

  return {
    id: lightCone.id ? String(lightCone.id) : null,
    name: lightCone.name || null,
    level: lightCone.level != null ? Number(lightCone.level) : null,
    ascension: lightCone.promotion != null ? Number(lightCone.promotion) : null,
    rarity: lightCone.rarity != null ? Number(lightCone.rarity) : null,
    path: lightCone.path?.name || null,
    superimposition: lightCone.rank != null ? Number(lightCone.rank) : null,
    description: meta?.desc || null,
    effectDescription: meta?.skillDesc || null,
  };
};

module.exports = serializeLightCone;
