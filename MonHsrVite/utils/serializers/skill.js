// utils/serializers/skill.js

const { normalizeSkillType } = require("./helpers");

const serializeSkill = (skill) => {
  if (!skill) return null;

  return {
    id:          skill.id ? String(skill.id) : null,
    name:        skill.name        || "Compétence",
    type:        normalizeSkillType(skill.type),
    typeText:    skill.type_text   || null,
    level:       skill.level != null ? Number(skill.level) : 1,
    maxLevel:    skill.max_level   != null ? Number(skill.max_level) : null,
    description: skill.desc        || skill.simple_desc || "",
    simpleDesc:  skill.simple_desc || "",
    params:      [],
  };
};

module.exports = serializeSkill;
