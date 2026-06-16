import { useState } from "react";

// Définition des sets de classification basés sur les catégories natives du jeu
const MAIN_TYPES = new Set([
  "Normal",
  "BPSkill",
  "Ultra",
  "Talent",
  "Maze",
  "MazeNormal",
]);
const MEMO_TYPES = new Set(["memo_skill", "memo_talent"]);
const SPECIAL_TYPES = new Set(["ElationDamage"]);

// Ordre d'affichage conventionnel en jeu : Attaque de base ➔ Compétence ➔ Ultime ➔ Talent ➔ Technique
const TYPE_ORDER = [
  "Normal",
  "BPSkill",
  "Ultra",
  "Talent",
  "Maze",
  "MazeNormal",
];

export default function useBottomSection(activeCharacter) {
  // État local suivant l'onglet actuellement affiché ('skills', 'relics' ou 'tree')
  const [activeTab, setActiveTab] = useState("skills");

  if (!activeCharacter) {
    return { activeCharacter: null };
  }

  // Extraction sécurisée des sous-structures du personnage sélectionné
  const allSkills = activeCharacter.skills || [];
  const relics = activeCharacter.relics || [];
  const relicSets = activeCharacter.relicSets || [];
  const skillTree = activeCharacter.skillTree || [];

  // 🛠️ TRAITEMENT DES MÉMO-SPRITES (Invocations spécifiques, ex: l'équipage de Lingsha ou Topaze)
  // On fouille l'arbre à la recherche d'aptitudes étiquetées 'memo_skill' ou 'memo_talent'
  const memoSkills = skillTree
    .filter((n) => MEMO_TYPES.has(n.type))
    .map((n) => ({
      id: n.id,
      name:
        n.name ||
        (n.type === "memo_skill"
          ? "Compétence mémo-sprite"
          : "Talent mémo-sprite"),
      type: n.type,
      typeText: n.type,
      effect: null,
      level: n.level,
      maxLevel: n.maxLevel,
      description: n.description || "",
      simpleDesc: "",
    }));

  // 🛠️ TRI DES APTITUDES PRINCIPALES
  // Utilise flatMap couplé à TYPE_ORDER pour s'assurer que les compétences sortent TOUJOURS dans le bon ordre logique
  const mainSkills = TYPE_ORDER.flatMap((t) =>
    allSkills.filter((s) => s.type === t),
  );

  // 🛠️ FILTRAGE DES APTITUDES SPÉCIALES (ex: Mécaniques d'Allégresse de l'Univers Simulé ou modes alternatifs)
  const specialSkills = allSkills.filter(
    (s) =>
      SPECIAL_TYPES.has(s.type) ||
      (!MAIN_TYPES.has(s.type) && !SPECIAL_TYPES.has(s.type)),
  );

  // Liste des configurations d'onglets exploitées par la barre de boutons de rendu
  const tabs = [
    { id: "skills", label: "Aptitudes" },
    { id: "relics", label: "Reliques" },
    { id: "tree", label: "Skill Tree" },
  ];

  return {
    activeCharacter,
    activeTab,
    setActiveTab,
    tabs,
    mainSkills,
    memoSkills,
    specialSkills,
    relics,
    relicSets,
    skillTree,
  };
}
