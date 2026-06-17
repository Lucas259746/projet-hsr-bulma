// Importations des bases de données locales d'assets multimédias pour chaque personnage implémenté
import {
  CHARACTERS_1310,
  SKILLS_1310,
  TRACES_DETAILS_1310,
} from "./1310-Firefly/firefly";
import {
  CHARACTERS_1308,
  SKILLS_1308,
  TRACES_DETAILS_1308,
} from "./1308-Acheron/acheron";
import {
  CHARACTERS_1506,
  SKILLS_1506,
  TRACES_DETAILS_1506,
} from "./1506-SW999/sw999";
import {
  CHARACTERS_1211,
  SKILLS_1211,
  TRACES_DETAILS_1211,
} from "./1211-Bailu/bailu";

import {
  CHARACTERS_1407,
  SKILLS_1407,
  TRACES_DETAILS_1407,
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
 * Récupère l'icône locale d'une forme de skill en tenant compte de son index dans le groupe.
 * Convention : la 1ère forme utilise la clé "Type" (ex: "Normal"), la 2ème "Type2", la 3ème "Type3", etc.
 * Cela permet à n'importe quel personnage futur d'avoir des variantes d'icônes sans modifier ce fichier :
 * il suffit d'ajouter Normal2, BPSkill2, Ultra2... dans son fichier de données local.
 * Si la clé variante n'existe pas, on retombe sur la clé de base (fallback).
 */
export const getSkillIconForForm = (charId, type, formIndex = 0) => {
  if (!charId || !type) return null;
  const charSkills = SKILLS[String(charId)];
  if (!charSkills) return null;
  // Index 0 = clé de base, index 1+ = clé avec suffixe numérique (ex: Normal2, BPSkill3...)
  if (formIndex > 0) {
    const variantKey = `${type}${formIndex + 1}`;
    if (charSkills[variantKey]) return charSkills[variantKey];
  }
  return charSkills[type] ?? null;
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
