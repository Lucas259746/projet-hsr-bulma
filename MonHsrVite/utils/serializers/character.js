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

// Extrait le type depuis le nom de l'icône du nœud skill_tree
const getNodeType = (iconPath) => {
  const icon = iconPath
    ? iconPath.split("/").pop().replace(".png", "").replace(".webp", "")
    : "";
  if (icon.includes("basic_atk")) return "skill_basic";
  if (icon.includes("_skill")) return "skill_skill";
  if (icon.includes("ultimate")) return "skill_ultra";
  if (icon.includes("talent")) return "skill_talent";
  if (icon.includes("technique")) return "skill_tech";
  if (icon.includes("skilltree1")) return "trace_a2";
  if (icon.includes("skilltree2")) return "trace_a4";
  if (icon.includes("skilltree3")) return "trace_a6";
  if (icon.includes("memosprite_skill")) return "memo_skill";
  if (icon.includes("memosprite_talent")) return "memo_talent";
  // Stat node
  return "stat_" + icon.replace("Icon", "").toLowerCase();
};

// Mappe le nom de propriété depuis l'icône
const PROP_LABELS = {
  IconAttack: "ATQ",
  IconMaxHP: "PV Max",
  IconDefence: "DÉF",
  IconSpeed: "VIT",
  IconCriticalChance: "Taux CRIT",
  IconCriticalDamage: "DGT CRIT",
  IconBreakUp: "Rupture",
  IconStatusProbability: "App. Effets",
  IconStatusResistance: "Rés. Effets",
  IconThunderAddedRatio: "Boost Foudre",
  IconQuantumAddedRatio: "Boost Quantum",
  IconJoy: "Boost Allégr.",
};

const serializeSkillTree = (skillTrees, skillsArray) => {
  if (!skillTrees || skillTrees.length === 0) return [];

  // Construit un index des descriptions de skills
  // skill_tree id 1308001 -> skill id 130801 (supprime le 3e chiffre '0')
  const skillIndex = {};
  for (const s of skillsArray || []) {
    skillIndex[String(s.id)] = s;
  }
  const getSkillDesc = (stId) => {
    const alt = stId.substring(0, 4) + stId.substring(5);
    return skillIndex[alt] || null;
  };

  return skillTrees.map((st) => {
    const stId = String(st.id);
    const icon = st.icon || "";
    const type = getNodeType(icon);
    const iconName = icon
      .split("/")
      .pop()
      .replace(".png", "")
      .replace(".webp", "");
    const skillRef = getSkillDesc(stId);
    const isStatNode = type.startsWith("stat_");
    const isTraceNode = type.startsWith("trace_");
    const propLabel = isStatNode
      ? PROP_LABELS[iconName] || iconName.replace("Icon", "")
      : null;

    return {
      id: stId,
      anchor: st.anchor,
      parent: st.parent ? String(st.parent) : null,
      type,
      level: st.level != null ? Number(st.level) : null,
      maxLevel: st.max_level != null ? Number(st.max_level) : null,
      icon: icon,
      // Pour les nœuds de stats : label de la propriété
      propLabel,
      // Pour les skills principaux et traces : description depuis skills[]
      name: skillRef ? sanitizeGenderTag(skillRef.name) : null,
      description: skillRef
        ? skillRef.desc || skillRef.simple_desc || ""
        : null,
    };
  });
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
    skillTree: serializeSkillTree(character.skill_trees, character.skills),
    stats: serializeStats(character),
  };
};

module.exports = serializeCharacter;
