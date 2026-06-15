import {
  CHARACTERS_1310,
  SKILLS_1310,
  LIGHT_CONES_1310,
} from "./1310-Firefly/firefly";

import {
  CHARACTERS_1308,
  SKILLS_1308,
  LIGHT_CONES_1308,
  TRACES_DETAILS_1308,
} from "./1308-Acheron/acheron";

import {
  CHARACTERS_1506,
  SKILLS_1506,
  LIGHT_CONES_1506,
  TRACES_DETAILS_1506,
} from "./1506-SW999/sw999";

// 1. On fusionne tous les personnages dans de grands objets globaux
const CHARACTERS = {
  ...CHARACTERS_1310,
  ...CHARACTERS_1308,
  ...CHARACTERS_1506,
};

const SKILLS = {
  ...SKILLS_1310,
  ...SKILLS_1308,
  ...SKILLS_1506,
};

const LIGHT_CONES = {
  ...LIGHT_CONES_1310,
  ...LIGHT_CONES_1308,
  ...LIGHT_CONES_1506,
};

const TRACES_DETAILS = {
  ...TRACES_DETAILS_1308,
  ...TRACES_DETAILS_1506,
};

// 2. Maintenant tes fonctions peuvent lire ces objets globaux !
export const getSkillIcon = (charId, type) =>
  charId && type ? (SKILLS[String(charId)]?.[type] ?? null) : null;

export const getLightConeImages = (lcId) =>
  lcId ? (LIGHT_CONES[String(lcId)] ?? null) : null;

export const getCharacterImages = (charId) =>
  charId ? (CHARACTERS[String(charId)] ?? null) : null;

// 3. Nouvelle fonction pour récupérer le nom et la description d'une trace
export const getTraceDetails = (traceId) => {
  return TRACES_DETAILS[String(traceId)] ?? null;
};
