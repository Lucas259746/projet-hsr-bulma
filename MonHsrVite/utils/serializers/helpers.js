// utils/serializers/helpers.js

/**
 * 📝 SÉCURITÉ DE TEXTE :
 * L'API peut parfois renvoyer des données sous différents formats (un nombre au lieu d'une chaîne de caractères, ou rien du tout).
 * Cette fonction s'assure qu'on récupère toujours une chaîne de texte propre ('String') ou 'null'.
 * L'API Mihomo retourne déjà des chaînes localisées, donc pas besoin de .get().
 */
const getText = (value) => {
  // Si la valeur est indéfinie, nulle ou vide, on coupe court.
  if (!value) return null;
  // Si c'est déjà du texte, on le garde tel quel[cite: 36].
  if (typeof value === "string") return value;
  // Si c'est un chiffre (ex: 42), on le convertit en texte (ex: "42") pour éviter les bugs d'affichage React[cite: 36].
  if (typeof value === "number") return String(value);

  return null; // Sécurité finale[cite: 36]
};

/**
 * 🖼️ RECONSTRUCTION DES LIENS D'IMAGES :
 * Mihomo fournit souvent des chemins relatifs partiels, ex: "icon/character/1008.png"[cite: 36].
 * Un navigateur ne peut pas afficher une image avec juste ça, il lui faut le lien complet commençant par "http".
 */
const MIHOMO_ASSET_BASE = "https://api.mihomo.me/"; // Le nom de domaine racine du serveur d'images[cite: 36]

const normalizeImageAsset = (path) => {
  if (!path) return null; // Sécurité de base[cite: 36]

  // Si le chemin commence déjà par "http" (l'API nous a donné un lien complet), on ne touche à rien[cite: 36].
  if (path.startsWith("http")) return path;

  // Sinon, on fusionne la racine et le chemin relatif pour créer une URL absolue (utilisable dans une balise <img>)[cite: 36].
  return `${MIHOMO_ASSET_BASE}${path}`;
};

/**
 * ⚔️ NORMALISATION DU VOCABULAIRE DU JEU :
 * En interne, le code source du jeu (et donc de l'API) utilise des termes très étranges pour désigner les attaques.
 * Par exemple, l'attaque Ultime s'appelle souvent "ultra", et la Technique s'appelle "maze" (car utilisée dans les labyrinthes/exploration).
 * Cette fonction traduit ce charabia technique en clés internes standardisées pour ton application[cite: 36].
 */
const normalizeSkillType = (type) => {
  if (!type) return "skill"; // Par défaut, on considère que c'est une compétence[cite: 36]

  // On passe tout en minuscules pour éviter les soucis de casse (ex: "Ultra" vs "ultra")[cite: 36].
  const s = String(type).toLowerCase();

  // ── Le Dictionnaire de Traduction ──
  // Si le serveur dit "ultra" ou un mot contenant "ult", c'est l'Ultime[cite: 36].
  if (s === "ultra" || s.includes("ult")) return "ultimate";

  // "skilladd" ou "skill" = La Compétence classique[cite: 36]
  if (s === "skilladd" || s === "skill") return "skill";

  // "normal" ou "attack" = L'Attaque de base[cite: 36]
  if (s === "normal" || s === "attack") return "normal";

  // "talent" = Le Talent (passif)[cite: 36]
  if (s === "talent") return "talent";

  // "technique" ou "maze" (exploration) = La Technique[cite: 36]
  if (s === "technique" || s === "maze") return "technique";

  // "buff" = Un effet de renforcement[cite: 36]
  if (s === "buff") return "buff";

  // Si c'est un mot qu'on ne connaît pas, on le renvoie tel quel au cas où[cite: 36].
  return s;
};

// On exporte ces trois outils pour qu'ils soient utilisables dans character.js, skill.js, etc[cite: 36].
module.exports = { getText, normalizeImageAsset, normalizeSkillType };
