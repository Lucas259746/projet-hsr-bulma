// utils/serializers/relic.js

// L'API identifie les emplacements d'artefacts par des numéros (1 à 6). On les traduit pour l'interface.
const RELIC_SLOT_LABELS = {
  1: "Tête",
  2: "Main",
  3: "Corps",
  4: "Pied",
  5: "Sphère",
  6: "Corde",
};

const sanitizeGenderTag = (text) => {
  if (!text) return null;
  return String(text)
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .trim();
};

// Formate une statistique individuelle de relique (Principale ou Secondaire)
const serializeStat = (stat) => {
  if (!stat) return null;
  return {
    property: sanitizeGenderTag(stat.name || stat.field || "Stat"),
    // 🛠️ ASTUCE MATHÉMATIQUE : L'API renvoie parfois les pourcentages sous forme décimale (ex: 0.154 pour 15.4%).
    // Si stat.percent est vrai, on multiplie par 100 et on garde 1 décimale.
    // Sinon, c'est une stat fixe (ex: PV bruts), on l'arrondit (Math.floor) et on met des espaces pour les milliers (toLocaleString).
    value:
      stat.display ||
      (stat.percent
        ? `${(stat.value * 100).toFixed(1)}%`
        : Math.floor(stat.value ?? 0).toLocaleString()),
    isPercent: stat.percent || false,
  };
};

// Construit l'objet propre d'une Relique
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
