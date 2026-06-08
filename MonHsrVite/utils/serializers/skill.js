// utils/serializers/skill.js

const { normalizeSkillType } = require("./helpers");

const MIHOMO_ASSET_BASE = "https://api.mihomo.me/";
const assetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${MIHOMO_ASSET_BASE}${path}`;
};

// Skills à exclure : MazeNormal sans nom propre (leur name = leur id)
const shouldExcludeSkill = (skill) => {
  if (!skill) return true;
  // Exclure les skills dont le nom est identique à l'id (skills internes sans affichage)
  if (skill.name === skill.id || skill.name === String(skill.id)) return true;
  // Exclure MazeNormal (attaques de labyrinthe internes, pas affichées en combat)
  if (skill.type === "MazeNormal") return true;
  return false;
};

const serializeSkill = (skill) => {
  if (!skill) return null;
  if (shouldExcludeSkill(skill)) return null;

  return {
    id: skill.id ? String(skill.id) : null,
    name: skill.name || "Compétence",
    type: normalizeSkillType(skill.type),
    typeText: skill.type_text || null,
    effect: skill.effect || null,
    effectText: skill.effect_text || null,
    level: skill.level != null ? Number(skill.level) : 1,
    maxLevel: skill.max_level != null ? Number(skill.max_level) : null,
    description: skill.desc || skill.simple_desc || "",
    simpleDesc: skill.simple_desc || "",
    params: [],
    icon: assetUrl(skill.icon),
  };
};

module.exports = serializeSkill;
