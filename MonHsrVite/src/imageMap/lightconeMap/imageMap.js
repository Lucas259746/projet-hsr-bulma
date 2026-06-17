// Importations des bases de données locales d'assets multimédias pour chaque personnage implémenté
import {
  LIGHT_CONES_23013,
  LIGHT_CONES_PASSIVE_23013,
} from "./23013_time-waits-for-no-one/23013";
import {
  LIGHT_CONES_23024,
  LIGHT_CONES_PASSIVE_23024,
} from "./23024_along-the-passing-shore/23024";
import {
  LIGHT_CONES_23025,
  LIGHT_CONES_PASSIVE_23025,
} from "./23025_whereabouts-should-dreams-rest/23025";
import {
  LIGHT_CONES_23040,
  LIGHT_CONES_PASSIVE_23040,
} from "./23040_make-farewells-more-beautiful/23040";

import {
  LIGHT_CONES_23042,
  LIGHT_CONES_PASSIVE_23042,
} from "./23042_long-may-rainbows-adorn-the-sky/23042";
import {
  LIGHT_CONES_23043,
  LIGHT_CONES_PASSIVE_23043,
} from "./23043_lies-dance-on-the-breeze/23043";
import {
  LIGHT_CONES_23049,
  LIGHT_CONES_PASSIVE_23049,
} from "./23049_to-evernights-stars/23049";
import {
  LIGHT_CONES_23052,
  LIGHT_CONES_PASSIVE_23052,
} from "./23052_this-love-forever/23052";
import {
  LIGHT_CONES_23057,
  LIGHT_CONES_PASSIVE_23057,
} from "./23057_welcome-to-the-cosmic-city/23057";

// ── 1. UNIFICATION DES DICTIONNAIRES (FUSION) ──
// L'opérateur de décomposition (...) extrait les clés/valeurs de chaque sous-objet pour construire
// un catalogue général unique. Cela évite d'avoir à faire des 'if' fastidieux selon le personnage.

const LIGHT_CONES = {
  ...LIGHT_CONES_23013,
  ...LIGHT_CONES_23024,
  ...LIGHT_CONES_23025,
  ...LIGHT_CONES_23040,
  ...LIGHT_CONES_23042,
  ...LIGHT_CONES_23043,
  ...LIGHT_CONES_23049,
  ...LIGHT_CONES_23052,
  ...LIGHT_CONES_23057,
};

const LIGHT_CONES_PASSIVE = {
  ...LIGHT_CONES_PASSIVE_23013,
  ...LIGHT_CONES_PASSIVE_23024,
  ...LIGHT_CONES_PASSIVE_23025,
  ...LIGHT_CONES_PASSIVE_23040,
  ...LIGHT_CONES_PASSIVE_23042,
  ...LIGHT_CONES_PASSIVE_23043,
  ...LIGHT_CONES_PASSIVE_23049,
  ...LIGHT_CONES_PASSIVE_23052,
  ...LIGHT_CONES_PASSIVE_23057,
};

// ── 2. FONCTIONS DE RECHERCHE ACCESSIBLES ET SÉCURISÉES (GETTERS) ──

export const getLightConeImages = (lcId) =>
  lcId ? (LIGHT_CONES[String(lcId)] ?? null) : null;

export const getLightConeDetails = (lcId) => {
  return LIGHT_CONES_PASSIVE[String(lcId)] ?? null;
};
