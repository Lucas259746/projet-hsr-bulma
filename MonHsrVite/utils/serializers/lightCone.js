// utils/serializers/lightCone.js
const { getLightConeMeta } = require("../../config/lightConeCache");

const serializeLightCone = (lightCone) => {
  if (!lightCone) return null;

  const meta = getLightConeMeta(lightCone.id);

  return {
    id: String(lightCone.id),
    name: lightCone.name,
    level: lightCone.level,
    rarity: lightCone.rarity,
    superimposition: lightCone.rank,
    // On renvoie les deux séparément pour pouvoir les afficher tous les deux
    storyDescription: meta ? meta.desc : "",
    passiveName: meta ? meta.skillName : "",
    passiveDescription: meta ? meta.skillDesc : "",
  };
};

module.exports = serializeLightCone;
