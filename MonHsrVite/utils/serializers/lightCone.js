// utils/serializers/lightCone.js

const { getLightConeMeta } = require("../../config/lightConeCache");

const MIHOMO_ASSET_BASE = "https://api.mihomo.me/";
const assetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${MIHOMO_ASSET_BASE}${path}`;
};

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

    // Descriptions depuis le cache Mar-7th (absent de Mihomo parsed)
    description: meta?.desc || null,
    effectDescription: meta?.skillDesc || null,

    // Images
    icon: assetUrl(lightCone.icon),
    preview: assetUrl(lightCone.preview),
    portrait: assetUrl(lightCone.portrait),
  };
};

module.exports = serializeLightCone;
