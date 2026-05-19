const serializeRelic = require('./relic');
const serializeLightCone = require('./lightCone');
const serializeSkill = require('./skill');

const serializeCharacter = (character, language = 'en') => {
  return {
    id: character.characterData?.id ? String(character.characterData?.id) : null,
    name: character.characterData?.name?.get(language) || character.characterData?.name?.get('en'),
    level: character.level != null ? Number(character.level) : null,
    ascension: character.ascension != null ? Number(character.ascension) : null,
    eidolons: character.eidolons != null ? Number(character.eidolons) : 0,
    promotion: character.ascension != null ? Number(character.ascension) : null,
    rarity: character.characterData?.stars != null ? Number(character.characterData?.stars) : null,
    path: character.characterData?.path?.name?.get(language) || character.characterData?.path?.name?.get('en'),
    combatType: character.characterData?.combatType?.name?.get(language) || character.characterData?.combatType?.name?.get('en'),
    lightCone: serializeLightCone(character.lightCone, language),
    relics: character.relics?.map(relic => serializeRelic(relic, language)) || [],
    skills: character.skills?.map(skill => serializeSkill(skill, language)) || [],
  };
};

module.exports = serializeCharacter;
