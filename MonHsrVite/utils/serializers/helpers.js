// utils/serializers/helpers.js

/**
 * Retourne une chaîne de texte depuis n'importe quelle valeur brute Mihomo.
 * L'API Mihomo retourne déjà des chaînes localisées, donc pas besoin de .get().
 */
const getText = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return null;
};

/**
 * Retourne l'URL d'un asset image depuis Mihomo.
 * Mihomo fournit des chemins relatifs, ex: "icon/character/1008.png"
 */
const MIHOMO_ASSET_BASE = "https://api.mihomo.me/"; // ou ton propre proxy
const normalizeImageAsset = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${MIHOMO_ASSET_BASE}${path}`;
};

/**
 * Normalise le type de compétence vers une clé interne cohérente.
 */
const normalizeSkillType = (type) => {
  if (!type) return "skill";
  const s = String(type).toLowerCase();
  if (s === "ultra" || s.includes("ult")) return "ultimate";
  if (s === "skilladd" || s === "skill") return "skill";
  if (s === "normal" || s === "attack") return "normal";
  if (s === "talent") return "talent";
  if (s === "technique" || s === "maze") return "technique";
  if (s === "buff") return "buff";
  return s;
};

module.exports = { getText, normalizeImageAsset, normalizeSkillType };
