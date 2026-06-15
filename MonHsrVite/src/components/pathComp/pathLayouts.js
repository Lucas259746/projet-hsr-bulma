// Attention : assure-toi que la casse ici correspond EXACTEMENT aux noms de tes fichiers
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
  // --- Noms classiques (Anglais) ---
  Destruction: Destruction,
  Nihility: Nihility,
  Abundance: Abundance,
  Preservation: Preservation,
  Harmony: Harmony,
  Hunt: Hunt,
  Erudition: Erudition,
  Elation: Elation,
  Remembrance: Remembrance,

  // --- Noms minuscules ---
  destruction: Destruction,
  nihility: Nihility,
  abundance: Abundance,
  preservation: Preservation,
  harmony: Harmony,
  hunt: Hunt,
  the_hunt: Hunt,
  erudition: Erudition,
  elation: Elation,
  remembrance: Remembrance,

  // Versions françaises sans article (au cas où)
  "La Destruction": Destruction,
  "La Nihilité": Nihility,
  "L'Abondance": Abundance,
  "La Préservation": Preservation,
  "L'Harmonie": Harmony,
  "La Chasse": Hunt,
  "L'Érudition": Erudition,
  "L'Allégresse": Elation,
  "Le Souvenir": Remembrance,

  // --- Mapping des ID internes (Mihomo API) ---
  Warrior: Destruction,
  Warlock: Nihility,
  Priest: Abundance,
  Knight: Preservation,
  Shaman: Harmony,
  Rogue: Hunt,
  Mage: Erudition,
  Unknown: Remembrance, // Ou Elation, selon le personnage
};
