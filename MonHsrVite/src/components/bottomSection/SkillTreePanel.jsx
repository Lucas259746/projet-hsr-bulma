import { useState, useEffect } from "react";
import { getSkillIcon } from "../../imageMap";
import { sanitizeAndFormatDescription } from "../characterComp/CharacterDetails";

// Conservation stricte des couleurs d'origine
const NODE_CONFIG = {
  skill_basic: { label: "Attaque", color: "#e08c30", size: 44 },
  skill_skill: { label: "Compét.", color: "#4fa3d1", size: 44 },
  skill_ultra: { label: "Ultime", color: "#d4a0e0", size: 44 },
  skill_talent: { label: "Talent", color: "#7ecba1", size: 44 },
  skill_tech: { label: "Technique", color: "#aaaaaa", size: 38 },
  trace_a2: { label: "A2", color: "#d8b467", size: 36 },
  trace_a4: { label: "A4", color: "#d8b467", size: 36 },
  trace_a6: { label: "A6", color: "#d8b467", size: 36 },
  memo_skill: { label: "M.Skill", color: "#9b59b6", size: 38 },
  memo_talent: { label: "M.Talent", color: "#c39bd3", size: 38 },
};

// Layouts thématiques uniques par Path (Base 600x420)
const PATH_LAYOUTS = {
  destruction: {
    name: "Spine & Wings (Ligne brisée agressive)",
    coords: {
      basic: { x: 300, y: 50 },
      skill: { x: 300, y: 130 },
      ultra: { x: 300, y: 210 },
      talent: { x: 300, y: 290 },
      tech: { x: 300, y: 370 },
      a2: { x: 180, y: 130 },
      a4: { x: 180, y: 210 },
      a6: { x: 420, y: 170 },
      memo_0: { x: 420, y: 290 },
      ...generateStatCoords(150, 450, [90, 170, 250, 330, 390]),
    },
    connections: [
      ["basic", "skill"],
      ["skill", "ultra"],
      ["ultra", "talent"],
      ["talent", "tech"],
      ["skill", "a2"],
      ["ultra", "a4"],
      ["ultra", "a6"],
      ["talent", "memo_0"],
      ["a2", "stat_0"],
      ["a2", "stat_1"],
      ["a4", "stat_2"],
      ["a4", "stat_3"],
      ["a6", "stat_4"],
      ["a6", "stat_5"],
      ["tech", "stat_6"],
      ["tech", "stat_7"],
      ["stat_2", "stat_8"],
      ["stat_5", "stat_9"],
    ],
  },
  erudition: {
    name: "Hexagonal Cosmic Matrix (Matrice symétrique)",
    coords: {
      basic: { x: 300, y: 210 }, // Centre
      skill: { x: 300, y: 110 },
      ultra: { x: 390, y: 160 },
      talent: { x: 390, y: 260 },
      tech: { x: 300, y: 310 },
      a2: { x: 210, y: 260 },
      a4: { x: 210, y: 160 },
      a6: { x: 300, y: 40 },
      memo_0: { x: 480, y: 210 },
      ...generateStatCoords(100, 500, [60, 120, 180, 240, 300, 360]),
    },
    connections: [
      ["basic", "skill"],
      ["basic", "ultra"],
      ["basic", "talent"],
      ["basic", "tech"],
      ["basic", "a2"],
      ["basic", "a4"],
      ["skill", "a6"],
      ["talent", "memo_0"],
      ["skill", "stat_0"],
      ["ultra", "stat_1"],
      ["talent", "stat_2"],
      ["tech", "stat_3"],
      ["a2", "stat_4"],
      ["a4", "stat_5"],
      ["a6", "stat_6"],
      ["memo_0", "stat_7"],
      ["stat_0", "stat_8"],
      ["stat_3", "stat_9"],
    ],
  },
  the_hunt: {
    name: "Arrowhead Forward (Flèche dynamique vers l'avant)",
    coords: {
      basic: { x: 70, y: 210 },
      skill: { x: 170, y: 210 },
      ultra: { x: 270, y: 210 },
      talent: { x: 370, y: 210 },
      tech: { x: 470, y: 210 }, // Pointe
      a2: { x: 220, y: 110 },
      a4: { x: 320, y: 110 },
      a6: { x: 220, y: 310 },
      memo_0: { x: 320, y: 310 },
      ...generateStatCoords(120, 520, [50, 90, 150, 270, 330, 370]),
    },
    connections: [
      ["basic", "skill"],
      ["skill", "ultra"],
      ["ultra", "talent"],
      ["talent", "tech"],
      ["skill", "a2"],
      ["ultra", "a4"],
      ["ultra", "a6"],
      ["talent", "memo_0"],
      ["a2", "stat_0"],
      ["a4", "stat_2"],
      ["a6", "stat_4"],
      ["memo_0", "stat_5"],
      ["tech", "stat_1"],
      ["tech", "stat_3"],
      ["stat_0", "stat_6"],
      ["stat_4", "stat_7"],
      ["stat_2", "stat_8"],
      ["stat_5", "stat_9"],
    ],
  },
  harmony: {
    name: "Concentric Mandala (Cercles harmonieux)",
    coords: {
      basic: { x: 300, y: 210 },
      skill: { x: 210, y: 140 },
      ultra: { x: 390, y: 140 },
      talent: { x: 390, y: 280 },
      tech: { x: 210, y: 280 },
      a2: { x: 300, y: 70 },
      a4: { x: 480, y: 210 },
      a6: { x: 300, y: 350 },
      memo_0: { x: 120, y: 210 },
      ...generateStatCoords(150, 450, [40, 100, 180, 240, 320, 380]),
    },
    connections: [
      ["basic", "skill"],
      ["basic", "ultra"],
      ["basic", "talent"],
      ["basic", "tech"],
      ["skill", "a2"],
      ["ultra", "a4"],
      ["talent", "a6"],
      ["tech", "memo_0"],
      ["a2", "stat_0"],
      ["a4", "stat_2"],
      ["a6", "stat_4"],
      ["memo_0", "stat_5"],
      ["skill", "stat_1"],
      ["ultra", "stat_3"],
      ["talent", "stat_6"],
      ["tech", "stat_7"],
      ["stat_0", "stat_8"],
      ["stat_4", "stat_9"],
    ],
  },
  default: {
    name: "Standard Constellation Layout",
    coords: {
      basic: { x: 300, y: 60 },
      skill: { x: 200, y: 160 },
      ultra: { x: 400, y: 160 },
      talent: { x: 300, y: 260 },
      tech: { x: 300, y: 360 },
      a2: { x: 100, y: 160 },
      a4: { x: 500, y: 160 },
      a6: { x: 300, y: 160 },
      memo_0: { x: 400, y: 260 },
      ...generateStatCoords(120, 480, [100, 200, 300, 400]),
    },
    connections: [
      ["basic", "a6"],
      ["a6", "talent"],
      ["a6", "skill"],
      ["a6", "ultra"],
      ["talent", "tech"],
      ["skill", "a2"],
      ["ultra", "a4"],
      ["talent", "memo_0"],
      ["a2", "stat_0"],
      ["a2", "stat_1"],
      ["ultra", "stat_2"],
      ["ultra", "stat_3"],
      ["a4", "stat_4"],
      ["a4", "stat_5"],
      ["tech", "stat_6"],
      ["tech", "stat_7"],
      ["basic", "stat_8"],
      ["talent", "stat_9"],
    ],
  },
};

// Générateur automatique de coordonnées de secours pour les stats secondaires
function generateStatCoords(minX, maxX, yLevels) {
  const res = {};
  let idx = 0;
  for (let i = 0; i < yLevels.length; i++) {
    res[`stat_${idx++}`] = { x: minX, y: yLevels[i] };
    res[`stat_${idx++}`] = { x: maxX, y: yLevels[i] };
  }
  return res;
}

// Nettoyage et normalisation du nom du Path (ex: "Érudition" -> "erudition")
const getNormalizedPathKey = (pathName) => {
  if (!pathName) return "default";
  const clean = pathName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/^(la|le|l')\s+/i, "") // Enlève l'article éventuel
    .trim()
    .replace(/\s+/g, "_");

  return PATH_LAYOUTS[clean] ? clean : "default";
};

function SkillTreePanel({ skillTree, path }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const pathKey = getNormalizedPathKey(path);
  const layout = PATH_LAYOUTS[pathKey];

  // 1. Distribution prédictible des nœuds reçus de l'API dans les slots fixes
  const nodes = skillTree || [];
  const basicNode = nodes.find((n) => n.type === "skill_basic");
  const skillNode = nodes.find((n) => n.type === "skill_skill");
  const ultraNode = nodes.find((n) => n.type === "skill_ultra");
  const talentNode = nodes.find((n) => n.type === "skill_talent");
  const techNode = nodes.find((n) => n.type === "skill_tech");
  const a2Node = nodes.find((n) => n.type === "trace_a2");
  const a4Node = nodes.find((n) => n.type === "trace_a4");
  const a6Node = nodes.find((n) => n.type === "trace_a6");

  const memoNodes = nodes.filter(
    (n) => n.type === "memo_skill" || n.type === "memo_talent",
  );
  const statNodes = nodes.filter(
    (n) =>
      n.type?.startsWith("stat_") ||
      (!n.type?.startsWith("skill_") &&
        !n.type?.startsWith("trace_") &&
        !n.type?.startsWith("memo_")),
  );

  // Construction de la map finale SlotID -> Node de l'API
  const slotToNodeMap = {};
  if (basicNode) slotToNodeMap["basic"] = basicNode;
  if (skillNode) slotToNodeMap["skill"] = skillNode;
  if (ultraNode) slotToNodeMap["ultra"] = ultraNode;
  if (talentNode) slotToNodeMap["talent"] = talentNode;
  if (techNode) slotToNodeMap["tech"] = techNode;
  if (a2Node) slotToNodeMap["a2"] = a2Node;
  if (a4Node) slotToNodeMap["a4"] = a4Node;
  if (a6Node) slotToNodeMap["a6"] = a6Node;

  memoNodes.forEach((node, i) => {
    slotToNodeMap[`memo_${i}`] = node;
  });
  statNodes.forEach((node, i) => {
    slotToNodeMap[`stat_${i}`] = node;
  });

  // Sélection automatique du premier nœud disponible au chargement
  useEffect(() => {
    if (basicNode) {
      setSelectedNode(basicNode);
    } else if (nodes.length > 0) {
      setSelectedNode(nodes[0]);
    }
  }, [skillTree]);

  return (
    <div
      className="box has-background-black-ter p-4"
      style={{ border: "1px solid rgba(216, 180, 103, 0.2)" }}
    >
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <h5 className="title is-6 font-orbitron has-text-gold mb-0">
          Arbre des Traces
        </h5>
        <span
          className="tag is-dark is-small font-orbitron text-transform-uppercase"
          style={{ color: "#d8b467" }}
        >
          Design {path || "Standard"}
        </span>
      </div>

      {/* Zone du Skill Tree Interactif */}
      <div
        className="skill-tree-canvas-container mb-4"
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(20,26,38,0.4) 0%, rgba(11,14,20,0.8) 100%)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {/* Couche Arrière-plan SVG : Dessin strict des lignes valides */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(218,165,32,0.15)" />
              <stop offset="50%" stopColor="rgba(218,165,32,0.4)" />
              <stop offset="100%" stopColor="rgba(218,165,32,0.15)" />
            </linearGradient>
          </defs>
          {layout.connections.map(([fromSlot, toSlot], index) => {
            const fromPos = layout.coords[fromSlot];
            const toPos = layout.coords[toSlot];
            const hasFromNode = !!slotToNodeMap[fromSlot];
            const hasToNode = !!slotToNodeMap[toSlot];

            // Ne dessine la ligne QUE si les deux nœuds existent vraiment dans l'API
            if (fromPos && toPos && hasFromNode && hasToNode) {
              return (
                <line
                  key={`line-${index}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray={fromSlot.startsWith("stat") ? "3,3" : "none"}
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Couche Avant-plan : Boutons interactifs positionnés de manière absolue */}
        {Object.entries(slotToNodeMap).map(([slotId, node]) => {
          const pos = layout.coords[slotId];
          if (!pos) return null; // Sécurité si l'API renvoie plus de nœuds que prévu

          const isStat = slotId.startsWith("stat");
          const config = NODE_CONFIG[node.type] || {
            label: "Stat",
            color: "#d8b467",
            size: 26,
          };

          const size = isStat ? 26 : config.size;
          const isSelected = selectedNode?.id === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`is-flex is-align-items-center is-justify-content-center p-0 ${isSelected ? "is-selected" : ""}`}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                border: isSelected
                  ? `2px solid #ffffff`
                  : `1.5px solid ${config.color}`,
                background: isSelected
                  ? config.color
                  : "rgba(11, 14, 20, 0.95)",
                boxShadow: isSelected
                  ? `0 0 12px ${config.color}`
                  : "0 2px 5px rgba(0,0,0,0.5)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                zIndex: isSelected ? 10 : 5,
              }}
              title={node.name || config.label}
            >
              {isStat ? (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: isSelected ? "#fff" : config.color,
                  }}
                />
              ) : (
                <img
                  src={getSkillIcon(node.icon)}
                  alt={config.label}
                  style={{
                    width: "70%",
                    height: "70%",
                    objectFit: "contain",
                    filter: isSelected ? "brightness(1.5) invert(1)" : "none",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panneau inférieur : Détails du nœud sélectionné */}
      {selectedNode && (
        <div
          className="box has-background-black-bis p-3 mb-0"
          style={{
            borderLeft: `3px solid ${NODE_CONFIG[selectedNode.type]?.color || "#d8b467"}`,
          }}
        >
          {!selectedNode.type?.startsWith("stat_") ? (
            <>
              <div className="is-flex is-justify-content-space-between is-align-items-center mb-2">
                <div>
                  <h6 className="title is-6 has-text-white mb-0 font-orbitron">
                    {selectedNode.name || NODE_CONFIG[selectedNode.type]?.label}
                  </h6>
                  <span
                    className="tag is-small is-dark font-orbitron mt-1"
                    style={{ color: NODE_CONFIG[selectedNode.type]?.color }}
                  >
                    {NODE_CONFIG[selectedNode.type]?.label || "Trace"}
                  </span>
                </div>
                <span className="is-size-7 has-text-grey font-orbitron">
                  Niv. {selectedNode.level} / {selectedNode.maxLevel}
                </span>
              </div>
              {selectedNode.description ? (
                <p
                  style={{
                    fontSize: "0.75rem",
                    lineHeight: "1.5",
                    color: "#c8c8c8",
                  }}
                >
                  {sanitizeAndFormatDescription(selectedNode.description)}
                </p>
              ) : (
                <p className="is-size-7 has-text-grey style-italic">
                  Aucune description disponible pour ce nœud principal.
                </p>
              )}
            </>
          ) : (
            <div className="is-flex is-align-items-center is-justify-content-space-between">
              <div
                className="is-flex is-align-items-center"
                style={{ gap: "8px" }}
              >
                <span className="has-text-gold font-orbitron is-size-6">
                  {selectedNode.propLabel ||
                    selectedNode.type.replace("stat_", "").toUpperCase()}
                </span>
                <span
                  className="tag is-small is-dark font-orbitron"
                  style={{ color: "#d8b467" }}
                >
                  Nœud de stat
                </span>
              </div>
              <span className="is-size-7 has-text-grey font-orbitron">
                Niv. {selectedNode.level} / {selectedNode.maxLevel}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillTreePanel;
