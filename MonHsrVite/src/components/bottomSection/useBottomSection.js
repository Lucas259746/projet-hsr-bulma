import { useState } from "react";

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
const TYPE_ORDER = [
  "Normal",
  "BPSkill",
  "Ultra",
  "Talent",
  "Maze",
  "MazeNormal",
];

export default function useBottomSection(activeCharacter) {
  const [activeTab, setActiveTab] = useState("skills");
  if (!activeCharacter) return { activeCharacter: null };

  const allSkills = activeCharacter.skills || [];
  const relics = activeCharacter.relics || [];
  const relicSets = activeCharacter.relicSets || [];
  const skillTree = activeCharacter.skillTree || [];

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

  const mainSkills = TYPE_ORDER.map((t) => {
    const skillsOfType = allSkills.filter((s) => s.type === t);
    if (skillsOfType.length === 0) return null;
    return {
      ...skillsOfType[0],
      isGrouped: skillsOfType.length > 1,
      forms: skillsOfType,
    };
  }).filter(Boolean);

  const specialSkills = allSkills.filter(
    (s) =>
      SPECIAL_TYPES.has(s.type) ||
      (!MAIN_TYPES.has(s.type) && !SPECIAL_TYPES.has(s.type)),
  );

  return {
    activeCharacter,
    activeTab,
    setActiveTab,
    tabs: [
      { id: "skills", label: "Aptitudes" },
      { id: "relics", label: "Reliques" },
      { id: "tree", label: "Trace" },
    ],
    mainSkills,
    memoSkills,
    specialSkills,
    relics,
    relicSets,
    skillTree,
  };
}
