// utils/serializers/skill.js

// Skills à exclure : ceux dont le nom == l'id (skills internes sans texte)
const shouldExclude = (skill) => {
  if (!skill) return true;
  const name = String(skill.name || "");
  const id = String(skill.id || "");
  return name === id;
};

const serializeSkill = (skill) => {
  if (!skill) return null;
  if (shouldExclude(skill)) return null;

  return {
    id: skill.id ? String(skill.id) : null,
    name: skill.name || "Compétence",
    type: skill.type || "Normal", // valeur brute conservée (Normal/BPSkill/Ultra/Talent/Maze/MazeNormal/ElationDamage)
    typeText: skill.type_text || null,
    effect: skill.effect || null,
    level: skill.level != null ? Number(skill.level) : 1,
    maxLevel: skill.max_level != null ? Number(skill.max_level) : null,
    description: skill.desc || skill.simple_desc || "",
    simpleDesc: skill.simple_desc || "",
    params: [],
  };
};

module.exports = serializeSkill;
