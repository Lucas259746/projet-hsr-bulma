const { normalizeImageAsset, getText, normalizeSkillType } = require('./helpers');

const serializeSkill = (skill, language = 'en') => {
  if (!skill) return null;
  const id = (skill.id || skill.skillData?.id) ? String(skill.id || skill.skillData?.id) : null;
  const name = getText(skill.name, language) || getText(skill.skillData?.name, language) || getText(skill.skillTypeText, language) || (typeof skill.skillType === 'string' ? skill.skillType : 'Compétence');
  const rawType = getText(skill.skillTypeText, language) || (skill.skillType && (skill.skillType.id || skill.skillType.name) ? skill.skillType : (typeof skill.skillType === 'string' ? skill.skillType : null));
  const type = normalizeSkillType(rawType, language) || 'skill';
  const level = (() => {
    if (skill.level == null) return 1;
    if (typeof skill.level === 'number') return skill.level;
    if (typeof skill.level === 'string') { const n = Number(skill.level); if (!Number.isNaN(n)) return n; }
    if (typeof skill.level === 'object') {
      if (skill.level.level != null) return Number(skill.level.level);
      if (skill.level.rank != null) return Number(skill.level.rank);
      if (skill.level.value != null) return Number(skill.level.value);
    }
    return 1;
  })();
  const description = getText(skill.simpleDescription, language) || getText(skill.description, language) || '';

  return {
    id,
    name,
    type,
    level,
    description,
    icon: normalizeImageAsset(skill.skillIcon) || normalizeImageAsset(skill.ultraSkillIcon) || normalizeImageAsset(skill.imageAssets) || null,
  };
};

module.exports = serializeSkill;
