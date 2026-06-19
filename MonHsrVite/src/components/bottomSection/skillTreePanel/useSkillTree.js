import { useState } from "react";
import { PATH_LAYOUTS } from "../../pathComp/pathLayouts";
import {
  getTraceDetails,
  getSkillIcon,
} from "../../../imageMap/characterMap/imageMap";

export const getNodeStyle = (node) => {
  const icon = node.icon || "";
  if (icon.includes("basic_atk"))
    return { color: "#c76904", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("_skill."))
    return { color: "#22668b", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("ultimate"))
    return { color: "#916c99", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("_talent."))
    return { color: "#659279", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("technique") || icon.includes("maze"))
    return { color: "#634747", size: 44, ring: false, shape: "rounded" };
  if (icon.includes("skilltree"))
    return { color: "#74591e", size: 44, ring: false, shape: "rounded" };
  if (icon.includes("memosprite"))
    return { color: "#9b59b6", size: 48, ring: true, shape: "rounded" };
  if (icon.includes("elation") || icon.includes("_path_"))
    return { color: "#d8b467", size: 48, ring: false, shape: "rounded" };
  if (icon.includes("property") || icon.includes("Icon"))
    return { color: "#d8b467", size: 30, ring: false, shape: "circle" };
  return { color: "#d8b467", size: 36, ring: false, shape: "rounded" };
};

export const isStatNode = (node) =>
  (node.icon || "").includes("property") || (node.icon || "").includes("Icon");

export const isMainSkill = (node) => {
  const icon = node.icon || "";
  return (
    icon.includes("basic_atk") ||
    icon.includes("_skill.") ||
    icon.includes("ultimate") ||
    icon.includes("_talent.") ||
    icon.includes("memosprite") ||
    icon.includes("elation") ||
    icon.includes("technique") ||
    icon.includes("maze")
  );
};

export const getLocalIconPath = (charId, node) => {
  if (!charId || !node?.icon) return null;
  const iconStr = node.icon.toLowerCase();
  if (iconStr.includes("basic_atk")) return getSkillIcon(charId, "skill_basic");
  if (iconStr.includes("_skill.")) return getSkillIcon(charId, "skill_skill");
  if (iconStr.includes("ultimate")) return getSkillIcon(charId, "skill_ultra");
  if (iconStr.includes("_talent.")) return getSkillIcon(charId, "skill_talent");
  if (iconStr.includes("technique") || iconStr.includes("maze"))
    return getSkillIcon(charId, "skill_tech");
  if (iconStr.includes("skilltree")) {
    const idStr = String(node.id);
    if (idStr.endsWith("101")) return getSkillIcon(charId, "trace_a2");
    if (idStr.endsWith("102")) return getSkillIcon(charId, "trace_a4");
    if (idStr.endsWith("103")) return getSkillIcon(charId, "trace_a6");
  }
  if (iconStr.includes("elation")) return getSkillIcon(charId, "skill_elation");
  return null;
};

const ICON_TO_LABEL = {
  IconCriticalChance: "CRIT %",
  IconCriticalDamage: "CRIT DMG",
  IconMaxHP: "PV",
  IconAttack: "ATQ",
  IconDefence: "DÉF",
  IconSpeed: "VIT",
  IconBreakUp: "Rupt.",
  IconStatusProbability: "App.Eff",
  IconStatusResistance: "Rés.Eff",
  IconThunderAddedRatio: "⚡ DMG",
  IconQuantumAddedRatio: "⚛ DMG",
  IconJoy: "Allégr.",
  IconImaginaryAddedRatio: "✦ DMG",
  IconFireAddedRatio: "🔥 DMG",
  IconIceAddedRatio: "❄ DMG",
  IconWindAddedRatio: "💨 DMG",
  IconPhysicalAddedRatio: "Phy DMG",
};

export const getStatLabel = (node) => {
  const icon = node.icon || "";
  for (const [key, label] of Object.entries(ICON_TO_LABEL)) {
    if (icon.includes(key)) return label;
  }
  return node.propLabel || "✦";
};

// Map skill node icon patterns to raw skill types from the API
const ICON_TO_SKILL_TYPE = {
  basic_atk: "Normal",
  "_skill.": "BPSkill",
  ultimate: "Ultra",
  "_talent.": "Talent",
  technique: "Maze",
  maze: "Maze",
  memosprite_skill: "memo_skill",
  memosprite_talent: "memo_talent",
  elation: "ElationDamage",
};

// Given a skill tree node, return the raw skill type(s) to look up in allSkills
const getSkillTypeForNode = (node) => {
  const icon = (node.icon || "").toLowerCase();
  for (const [pattern, type] of Object.entries(ICON_TO_SKILL_TYPE)) {
    if (icon.includes(pattern)) return type;
  }
  return null;
};

// Build grouped skill forms for a selected node, matching against allSkills
const buildGroupedForms = (node, allSkills) => {
  if (!node || !allSkills?.length) return null;
  const targetType = getSkillTypeForNode(node);
  if (!targetType) return null;

  const matching = allSkills.filter((s) => s.type === targetType);
  if (matching.length === 0) return null;

  return {
    isGrouped: matching.length > 1,
    forms: matching,
    primarySkill: matching[0],
  };
};

const getLayout = (path) => {
  if (!path) return PATH_LAYOUTS["Destruction"];
  const id = typeof path === "object" ? path.id : path;
  const name = typeof path === "object" ? path.name : path;
  return (
    PATH_LAYOUTS[id] ||
    PATH_LAYOUTS[id?.toLowerCase()] ||
    PATH_LAYOUTS[name] ||
    PATH_LAYOUTS[name?.toLowerCase()] ||
    PATH_LAYOUTS["Destruction"]
  );
};

export default function useSkillTree({ skillTree, path, charId, allSkills }) {
  const [selected, setSelected] = useState(null);

  if (!skillTree?.length) return { hasData: false };

  const layout = getLayout(path);
  const { positions, rootConnections } = layout;

  const byAnchor = {};
  skillTree.forEach((n) => {
    byAnchor[n.anchor] = n;
  });

  const connections = [];
  rootConnections.forEach(([fromAnchor, toAnchor]) => {
    const from = positions[fromAnchor];
    const to = positions[toAnchor];
    if (!from || !to) return;

    const fromNode = byAnchor[fromAnchor];
    const toNode = byAnchor[toAnchor];
    const fromMax = fromNode?.maxLevel || fromNode?.max_level || 1;
    const toMax = toNode?.maxLevel || toNode?.max_level || 1;

    const maxed = fromNode?.level >= fromMax && toNode?.level >= toMax;
    connections.push({ from, to, maxed });
  });

  const total = skillTree.length;
  const unlocked = skillTree.filter(
    (n) => n.level >= (n.maxLevel || n.max_level || 1),
  ).length;
  const pct = Math.round((unlocked / total) * 100);

  const selectedNode = selected
    ? skillTree.find((n) => n.id === selected)
    : null;
  const selStyle = selectedNode ? getNodeStyle(selectedNode) : null;
  const isSelectedStat = selectedNode ? isStatNode(selectedNode) : false;
  const isSelectedMain = selectedNode ? isMainSkill(selectedNode) : false;

  const customDetails =
    selectedNode && !isSelectedStat ? getTraceDetails(selectedNode.id) : null;

  // Build grouped skill forms if this is a main skill node
  const groupedForms =
    selectedNode && isSelectedMain && !isSelectedStat
      ? buildGroupedForms(selectedNode, allSkills)
      : null;

  let traceName = "";
  let traceDesc = "";

  if (selectedNode) {
    if (isSelectedStat) {
      const statLabel = getStatLabel(selectedNode);
      traceName = `Bonus de Statistique : ${statLabel}`;
      traceDesc = `Nœud d'optimisation débloquant un bonus permanent de ${statLabel} pour ce personnage.`;
    } else if (groupedForms) {
      // For main skill nodes with grouped forms, use name from primary skill
      traceName =
        groupedForms.primarySkill.name ||
        selectedNode?.name ||
        selectedNode?.anchor;
      traceDesc = null; // rendered separately via groupedForms
    } else {
      traceName =
        customDetails?.name || selectedNode?.name || selectedNode?.anchor;
      traceDesc = customDetails?.description || selectedNode?.description;
    }
  }

  const traceIcon = getLocalIconPath(charId, selectedNode);
  const selectedMaxLevel = selectedNode
    ? selectedNode.maxLevel || selectedNode.max_level || 1
    : 1;

  return {
    hasData: true,
    positions,
    connections,
    pct,
    unlocked,
    total,
    selected,
    setSelected,
    selectedNode,
    selStyle,
    isSelectedStat,
    isSelectedMain,
    groupedForms,
    traceName,
    traceDesc,
    traceIcon,
    selectedMaxLevel,
  };
}
