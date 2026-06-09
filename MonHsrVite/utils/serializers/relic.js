// utils/serializers/relic.js

const RELIC_SLOT_LABELS = {
  1: "Tête",
  2: "Main",
  3: "Corps",
  4: "Pied",
  5: "Sphère",
  6: "Corde",
};

// Nettoie les tags genre {F#...}{M#...} présents dans les noms FR
const sanitizeGenderTag = (text) => {
  if (!text) return null;
  return String(text)
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .trim();
};

const serializeStat = (stat) => {
  if (!stat) return null;
  return {
    property: sanitizeGenderTag(stat.name || stat.field || "Stat"),
    value:
      stat.display ||
      (stat.percent
        ? `${(stat.value * 100).toFixed(1)}%`
        : Math.floor(stat.value ?? 0).toLocaleString()),
    isPercent: stat.percent || false,
  };
};

const serializeRelic = (relic) => {
  if (!relic) return null;

  return {
    id: relic.id ? String(relic.id) : null,
    name: sanitizeGenderTag(relic.name) || null,
    type: RELIC_SLOT_LABELS[relic.type] || relic.type || "Slot inconnu",
    setId: relic.set_id ? String(relic.set_id) : null,
    set: sanitizeGenderTag(relic.set_name) || null,
    level: relic.level != null ? Number(relic.level) : null,
    rarity: relic.rarity != null ? Number(relic.rarity) : null,
    mainStat: serializeStat(relic.main_affix),
    subStats: (relic.sub_affix || []).map(serializeStat).filter(Boolean),
  };
};

module.exports = serializeRelic;
