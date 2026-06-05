// utils/serializers/character.js

const serializeRelic     = require("./relic");
const serializeLightCone = require("./lightCone");
const serializeSkill     = require("./skill");
const serializeStats     = require("./sumStats");

const serializeRelicSet = (set) => {
  if (!set) return null;
  return {
    id:   set.id   ? String(set.id) : null,
    name: set.name || null,
    num:  set.num  != null ? Number(set.num) : null,
    desc: set.desc || null,
    properties: (set.properties || []).map((p) => ({
      name:    p.name    || null,
      display: p.display || null,
    })),
  };
};

const serializeCharacter = (character) => {
  if (!character) return null;

  return {
    id:         character.id    ? String(character.id) : null,
    name:       character.name  || null,
    level:      character.level     != null ? Number(character.level)     : null,
    ascension:  character.promotion != null ? Number(character.promotion) : null,
    eidolons:   character.rank      != null ? Number(character.rank)      : 0,
    rarity:     character.rarity    != null ? Number(character.rarity)    : null,
    path:       character.path?.name    || null,
    combatType: character.element?.name || null,

    lightCone: serializeLightCone(character.light_cone),
    relics:    (character.relics     || []).map(serializeRelic).filter(Boolean),
    relicSets: (character.relic_sets || []).map(serializeRelicSet).filter(Boolean),
    skills:    (character.skills     || []).map(serializeSkill).filter(Boolean),
    stats:     serializeStats(character),
  };
};

module.exports = serializeCharacter;
