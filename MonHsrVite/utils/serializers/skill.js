const {
  normalizeImageAsset,
  getText,
  normalizeSkillType,
} = require("./helpers");

const serializeSkill = (skill, language = "en") => {
  if (!skill) return null;

  // NE PAS faire de JSON.stringify sur 'skill' ici.
  // Accède directement aux propriétés.

  const id =
    skill.id || skill.skillData?.id
      ? String(skill.id || skill.skillData?.id)
      : null;

  const name =
    getText(skill.name, language) ||
    getText(skill.skillData?.name, language) ||
    getText(skill.skillTypeText, language) ||
    "Compétence";

  const rawType =
    getText(skill.skillTypeText, language) ||
    (skill.skillType && (skill.skillType.id || skill.skillType.name)
      ? skill.skillType
      : null);
  const type = normalizeSkillType(rawType, language) || "skill";

  // Logique de niveau sécurisée (sans JSON.stringify)
  const level = (() => {
    if (typeof skill.level === "number") return skill.level;
    if (skill.level && typeof skill.level === "object") {
      return Number(
        skill.level.level || skill.level.rank || skill.level.value || 1,
      );
    }
    return 1;
  })();

  const desc =
    getText(skill.simpleDescription, language) ||
    getText(skill.description, language) ||
    "";

  const icon = normalizeImageAsset(
    skill.icon || skill.skillIcon || skill.skillData?.icon,
  );

  return {
    id,
    name,
    type,
    level,
    description: desc,
    icon,
  };
};

module.exports = serializeSkill;
