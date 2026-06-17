import { getCharacterImages } from "../../imageMap/characterMap/imageMap";

// Dictionnaire associant chaque clé de statistique serveur à un émoji visuel
export const STAT_ICONS = {
  hp: "❤️",
  atk: "⚔️",
  def: "🛡️",
  spd: "💨",
  crit_rate: "🎯",
  crit_dmg: "💥",
  break_dmg: "⚡",
  effect_hit: "🎲",
  effect_res: "🔮",
  heal_rate: "💚",
  fire_dmg: "🔥",
  ice_dmg: "❄️",
  thunder_dmg: "⚡",
  wind_dmg: "🌀",
  quantum_dmg: "🌌",
  imaginary_dmg: "✨",
  elation_dmg: "✨",
  physical_dmg: "👊",
};

// Répertoire des couleurs hexa utilisées pour surligner chaque type de statistique
export const STAT_COLORS = {
  hp: "#e05555",
  atk: "#e08c30",
  def: "#4fa3d1",
  spd: "#7ecba1",
  crit_rate: "#d4a0e0",
  crit_dmg: "#e060a0",
  break_dmg: "#e0c040",
  effect_hit: "#80b0e0",
  effect_res: "#9070d0",
  heal_rate: "#50c060",
};

// Nettoie les textes de l'API des balises de genre {F#...}{M#...} et d'espacements incohérents
export const sanitizeName = (value) => {
  if (!value) return "";
  return String(value)
    .replace(/<\/?unbreak>/gi, "")
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .trim();
};

// Moteur de rendu de description : prend un texte brut truffé de balises <color=#...>Texte</color>,
// le découpe par ligne, puis transforme les balises en véritables nœuds React <span> stylisés.
export const sanitizeAndFormatDescription = (text) => {
  if (!text) return "Aucune description disponible.";
  const cleaned = String(text)
    .replace(/<\/?u>/gi, "")
    .replace(/<\/?unbreak>/gi, "")
    .replace(/<\/?i>/gi, "")
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();

  const lines = cleaned.split(/\\n|\n/g);
  const colorRegex = /<color=([^>]+)>(.*?)<\/color>/gi;

  return lines.map((line, li) => {
    const parts = [];
    let last = 0;
    let m;
    colorRegex.lastIndex = 0; // Réinitialise l'index du regex pour chaque ligne

    // Boucle tant qu'une balise de couleur est détectée dans la ligne
    while ((m = colorRegex.exec(line)) !== null) {
      if (m.index > last) parts.push(line.substring(last, m.index)); // Ajoute le texte neutre avant la balise
      parts.push(
        <span
          key={`c-${li}-${m.index}`}
          style={{ color: m[1].substring(0, 7), fontWeight: "bold" }} // Applique la couleur extraite
        >
          {m[2]} {/* Contenu textuel coloré */}
        </span>,
      );
      last = colorRegex.lastIndex;
    }
    if (last < line.length) parts.push(line.substring(last)); // Ajoute le reste de la ligne après la dernière balise
    return (
      <span key={`l-${li}`}>
        {parts.length ? parts : line}
        {li < lines.length - 1 && <br />}{" "}
        {/* Saute une ligne s'il y a une ligne suivante */}
      </span>
    );
  });
};

// Hook personnalisé principal pour orchestrer les données de CharacterDetails
export default function useCharacterDetails(activeCharacter) {
  if (!activeCharacter) {
    return { hasCharacter: false };
  }

  // Interroge le mapper central d'assets pour trouver l'icône HD du personnage actif
  const charImages = getCharacterImages(activeCharacter.id);

  return {
    hasCharacter: true,
    charImages,
  };
}
