// Importations des bases de données locales d'assets multimédias pour chaque personnage implémenté
import {
  CHARACTERS_1310,
  SKILLS_1310,
  LIGHT_CONES_1310,
  TRACES_DETAILS_1310,
  LIGHT_CONES_PASSIVE_1310,
} from "./1310-Firefly/firefly";
import {
  CHARACTERS_1308,
  SKILLS_1308,
  LIGHT_CONES_1308,
  TRACES_DETAILS_1308,
  LIGHT_CONES_PASSIVE_1308,
} from "./1308-Acheron/acheron";
import {
  CHARACTERS_1506,
  SKILLS_1506,
  LIGHT_CONES_1506,
  TRACES_DETAILS_1506,
  LIGHT_CONES_PASSIVE_1506,
} from "./1506-SW999/sw999";
import {
  CHARACTERS_1211,
  SKILLS_1211,
  LIGHT_CONES_1211,
  TRACES_DETAILS_1211,
  LIGHT_CONES_PASSIVE_1211,
} from "./1211-Bailu/bailu";

import {
  CHARACTERS_1407,
  SKILLS_1407,
  LIGHT_CONES_1407,
  TRACES_DETAILS_1407,
  LIGHT_CONES_PASSIVE_1407,
} from "./1407-Castorice/castorice";

// ── 1. UNIFICATION DES DICTIONNAIRES (FUSION) ──
// L'opérateur de décomposition (...) extrait les clés/valeurs de chaque sous-objet pour construire
// un catalogue général unique. Cela évite d'avoir à faire des 'if' fastidieux selon le personnage.
const CHARACTERS = {
  ...CHARACTERS_1211,
  ...CHARACTERS_1308,
  ...CHARACTERS_1310,
  ...CHARACTERS_1407,
  ...CHARACTERS_1506,
};

const SKILLS = {
  ...SKILLS_1211,
  ...SKILLS_1310,
  ...SKILLS_1308,
  ...SKILLS_1407,
  ...SKILLS_1506,
};

const LIGHT_CONES = {
  ...LIGHT_CONES_1211,
  ...LIGHT_CONES_1310,
  ...LIGHT_CONES_1308,
  ...LIGHT_CONES_1407,
  ...LIGHT_CONES_1506,
};

const LIGHT_CONES_PASSIVE = {
  ...LIGHT_CONES_PASSIVE_1211,
  ...LIGHT_CONES_PASSIVE_1308,
  ...LIGHT_CONES_PASSIVE_1310,
  ...LIGHT_CONES_PASSIVE_1407,
  ...LIGHT_CONES_PASSIVE_1506,
};

const TRACES_DETAILS = {
  ...TRACES_DETAILS_1211,
  ...TRACES_DETAILS_1308,
  ...TRACES_DETAILS_1310,
  ...TRACES_DETAILS_1407,
  ...TRACES_DETAILS_1506,
};

// ── 2. FONCTIONS DE RECHERCHE ACCESSIBLES ET SÉCURISÉES (GETTERS) ──

/**
 * Récupère l'image d'une aptitude selon l'ID du personnage et le type d'attaque.
 * Le double point d'interrogation (?? Nullish Coalescing) est un opérateur de sécurité moderne :
 * si la recherche renvoie indéfini ou introuvable, il retourne proprement 'null' au lieu de faire planter l'application.
 */
export const getSkillIcon = (charId, type) =>
  charId && type ? (SKILLS[String(charId)]?.[type] ?? null) : null;

/**
 * Récupère le pack d'images (icône + portrait) d'un Cône de lumière via son ID.
 * Conversion forcée 'String(lcId)' car l'API renvoie des IDs sous forme de nombres (ex: 23015)
 * alors que les clés d'objets JavaScript se lisent plus sûrement sous forme de chaînes de caractères.
 */
export const getLightConeImages = (lcId) =>
  lcId ? (LIGHT_CONES[String(lcId)] ?? null) : null;

export const getLightConeDetails = (lcId) => {
  return LIGHT_CONES_PASSIVE[String(lcId)] ?? null;
};
/**
 * Récupère le catalogue d'images (miniature, icône ronde, splash art) d'un personnage.
 */
export const getCharacterImages = (charId) =>
  charId ? (CHARACTERS[String(charId)] ?? null) : null;

/**
 * Récupère les textes détaillés d'un nœud d'arbre de traces (Skill Tree) via son ID unique.
 * Utile pour afficher le nom propre et la description complète au clic sur un nœud du SVG.
 */
export const getTraceDetails = (traceId) => {
  return TRACES_DETAILS[String(traceId)] ?? null;
};
