// Importation des fichiers de disposition géométrique (coordonnées X/Y absolues de chaque point de l'arbre SVG)
import Destruction from "./Destruction";
import Nihility from "./Nihility";
import Abundance from "./Abundance";
import Preservation from "./Preservation";
import Harmony from "./Harmony";
import Hunt from "./Hunt";
import Erudition from "./Erudition";
import Elation from "./Elation";
import Remembrance from "./Remembrance";

export const PATH_LAYOUTS = {
  // ── 1. Mapping standard par clé capitalisée (Format natif de l'application) ──
  Destruction: Destruction,
  Nihility: Nihility,
  Abundance: Abundance,
  Preservation: Preservation,
  Harmony: Harmony,
  Hunt: Hunt,
  Erudition: Erudition,
  Elation: Elation,
  Remembrance: Remembrance,

  // ── 2. Mapping tolérant aux minuscules (Évite les crashs si l'API renvoie des chaînes non nettoyées) ──
  destruction: Destruction,
  nihility: Nihility,
  abundance: Abundance,
  preservation: Preservation,
  harmony: Harmony,
  hunt: Hunt,
  the_hunt: Hunt, // Variantes de nommage courantes dans certaines API tierces
  erudition: Erudition,
  elation: Elation,
  remembrance: Remembrance,

  // ── 3. Mapping tolérant aux libellés de traduction français de ton application ──
  "La Destruction": Destruction,
  "La Nihilité": Nihility,
  "L'Abondance": Abundance,
  "La Préservation": Preservation,
  "L'Harmonie": Harmony,
  "La Chasse": Hunt,
  "L'Érudition": Erudition,
  "L'Allégresse": Elation,
  "Le Souvenir": Remembrance,

  // ── 4. Mapping des clés techniques internes de l'API Mihomo ──
  // L'API n'utilise pas "Destruction" ou "Nihility" en interne, mais des rôles de type RPG classique.
  // Ce dictionnaire fait le pont entre ces termes serveur et tes composants d'arbres graphiques.
  Warrior: Destruction, // Warrior = Destruction
  Warlock: Nihility, // Warlock = Nihilité
  Priest: Abundance, // Priest  = Abondance
  Knight: Preservation, // Knight  = Préservation
  Shaman: Harmony, // Shaman  = Harmonie
  Rogue: Hunt, // Rogue   = La Chasse
  Mage: Erudition, // Mage    = L'Érudition
  Unknown: Remembrance, // Mode spécifique / Événement / Souvenir
};
