// utils/serializers/character.js

const serializeRelic = require("./relic");
const serializeLightCone = require("./lightCone");
const serializeSkill = require("./skill");
const serializeStats = require("./sumStats");

const sanitizeGenderTag = (text) => {
  if (!text) return null;
  return String(text)
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .trim();
};

const serializeRelicSet = (set) => {
  if (!set) return null;
  return {
    id: set.id ? String(set.id) : null,
    name: sanitizeGenderTag(set.name) || null,
    num: set.num != null ? Number(set.num) : null,
    desc: sanitizeGenderTag(set.desc) || null,
    properties: (set.properties || []).map((p) => ({
      name: sanitizeGenderTag(p.name) || null,
      display: p.display || null,
    })),
  };
};

// Extrait les skill_trees de mémo-sprites (icon contient "memosprite")
const serializeMemosprites = (skillTrees, charId) => {
  if (!skillTrees) return [];
  return skillTrees
    .filter((st) => st.icon && st.icon.includes("memosprite"))
    .map((st) => ({
      id: String(st.id),
      charId: charId ? String(charId) : null,
      level: st.level != null ? Number(st.level) : null,
      maxLevel: st.max_level != null ? Number(st.max_level) : null,
      // Type déduit depuis le nom de l'icône : memosprite_skill / memosprite_talent
      type: st.icon.includes("memosprite_skill")
        ? "memosprite_skill"
        : st.icon.includes("memosprite_talent")
          ? "memosprite_talent"
          : "memosprite",
    }));
};

const serializeCharacter = (character) => {
  if (!character) return null;

  const charId = character.id ? String(character.id) : null;

  return {
    id: charId,
    name: sanitizeGenderTag(character.name) || null,
    level: character.level != null ? Number(character.level) : null,
    ascension: character.promotion != null ? Number(character.promotion) : null,
    eidolons: character.rank != null ? Number(character.rank) : 0,
    rarity: character.rarity != null ? Number(character.rarity) : null,
    path: character.path?.name || null,
    combatType: character.element?.name || null,

    lightCone: serializeLightCone(character.light_cone),
    relics: (character.relics || []).map(serializeRelic).filter(Boolean),
    relicSets: (character.relic_sets || [])
      .map(serializeRelicSet)
      .filter(Boolean),
    skills: (character.skills || []).map(serializeSkill).filter(Boolean),
    memosprites: serializeMemosprites(character.skill_trees, charId),
    stats: serializeStats(character),
  };
};

module.exports = serializeCharacter;
