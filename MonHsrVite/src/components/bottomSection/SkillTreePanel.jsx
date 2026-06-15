import { useState } from "react";
import { PATH_LAYOUTS } from "../pathComp/pathLayouts";
import { sanitizeAndFormatDescription } from "../characterComp/CharacterDetails";

// ── Couleurs et tailles par type d'icône ─────────────────────
const getNodeStyle = (node) => {
  const icon = node.icon || "";
  if (icon.includes("basic_atk"))
    return { color: "#e08c30", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("_skill."))
    return { color: "#4fa3d1", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("ultimate"))
    return { color: "#d4a0e0", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("_talent."))
    return { color: "#7ecba1", size: 54, ring: true, shape: "rounded" };
  if (icon.includes("technique"))
    return { color: "#aaaaaa", size: 44, ring: false, shape: "rounded" };
  if (icon.includes("skilltree"))
    return { color: "#d8b467", size: 44, ring: false, shape: "rounded" };
  if (icon.includes("memosprite"))
    return { color: "#9b59b6", size: 48, ring: true, shape: "rounded" };
  if (icon.includes("elation") || icon.includes("_path_"))
    return { color: "#d8b467", size: 48, ring: false, shape: "rounded" };
  // stat nodes (property icons)
  if (icon.includes("property") || icon.includes("Icon"))
    return { color: "#d8b467", size: 30, ring: false, shape: "circle" };
  return { color: "#d8b467", size: 36, ring: false, shape: "rounded" };
};

const isStatNode = (node) =>
  (node.icon || "").includes("property") || (node.icon || "").includes("Icon");
const isMainSkill = (node) => {
  const icon = node.icon || "";
  return (
    icon.includes("basic_atk") ||
    icon.includes("_skill.") ||
    icon.includes("ultimate") ||
    icon.includes("_talent.") ||
    icon.includes("memosprite")
  );
};

// ── Label stat depuis l'icône ─────────────────────────────────
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

const getStatLabel = (node) => {
  const icon = node.icon || "";
  for (const [key, label] of Object.entries(ICON_TO_LABEL)) {
    if (icon.includes(key)) return label;
  }
  // Fallback depuis propLabel ou type
  return node.propLabel || "✦";
};

// ── Normalise le path ID de l'API ────────────────────────────
const getLayout = (path) => {
  console.log("getLayout called with path:", path);
  if (!path) {
    console.warn("Path non défini");
    return PATH_LAYOUTS["Destruction"];
  }

  const id = typeof path === "object" ? path.id : path;
  const name = typeof path === "object" ? path.name : path;
  console.log("getLayout resolved to:", PATH_LAYOUTS[id] || PATH_LAYOUTS[name]);

  return (
    PATH_LAYOUTS[id] ||
    PATH_LAYOUTS[id?.toLowerCase()] ||
    PATH_LAYOUTS[name] || // Vérifie le vrai nom (ex: "Abundance")
    PATH_LAYOUTS[name?.toLowerCase()] || // Vérifie "abundance"
    PATH_LAYOUTS["Destruction"] // Fallback final
  );
};

// ─────────────────────────────────────────────────────────────
// Composant nœud SVG
// ─────────────────────────────────────────────────────────────
function Node({ node, pos, isSelected, onClick }) {
  const style = getNodeStyle(node);
  const stat = isStatNode(node);
  const main = isMainSkill(node);
  const isMaxed = node.level >= node.max_level;
  const { color, size, ring, shape } = style;
  const half = size / 2;
  const r = shape === "circle" ? half : 0;
  const rx = shape === "circle" ? half : 9;

  const alpha = isMaxed ? "ff" : "28";
  const border = isSelected
    ? color
    : isMaxed
      ? color
      : "rgba(255,255,255,0.18)";
  const bWidth = isSelected ? 2.5 : 1.5;
  const glow = isSelected
    ? `drop-shadow(0 0 8px ${color})`
    : isMaxed && main
      ? `drop-shadow(0 0 5px ${color}88)`
      : "none";
  const opacity = isMaxed ? 1 : 0.35;
  const statLabel = stat ? getStatLabel(node) : null;

  return (
    <g
      onClick={() => onClick(node)}
      style={{ cursor: "pointer", filter: glow }}
      transform={`translate(${pos.x}, ${pos.y})`}
    >
      {/* Anneau extérieur pour skills principaux */}
      {ring && (
        <rect
          x={-(half + 7)}
          y={-(half + 7)}
          width={size + 14}
          height={size + 14}
          rx={rx + 4}
          fill="none"
          stroke={isMaxed ? color + "44" : "rgba(255,255,255,0.05)"}
          strokeWidth="1"
        />
      )}

      {/* Corps */}
      <rect
        x={-half}
        y={-half}
        width={size}
        height={size}
        rx={rx}
        fill={`${color}${alpha}`}
        stroke={border}
        strokeWidth={bWidth}
        opacity={opacity}
      />

      {/* Icône via foreignObject */}
      {node.icon && !stat && (
        <image
          href={`https://api.mihomo.me/${node.icon}`}
          x={-half + 3}
          y={-half + 3}
          width={size - 6}
          height={size - 6}
          style={{ opacity: isMaxed ? 1 : 0.5 }}
        />
      )}

      {/* Label stat */}
      {stat && (
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isMaxed ? color : "#555"}
          fontSize={statLabel && statLabel.length > 5 ? "7" : "8"}
          fontFamily="Orbitron, sans-serif"
          fontWeight="700"
          style={{ userSelect: "none" }}
        >
          {statLabel}
        </text>
      )}

      {/* Level badge (sous le nœud) */}
      <text
        y={half + 11}
        textAnchor="middle"
        fill={isMaxed ? (stat ? color : "#ddd") : "#444"}
        fontSize="8"
        fontFamily="Orbitron, sans-serif"
        style={{ userSelect: "none" }}
      >
        {stat ? statLabel : `${node.level}/${node.max_level}`}
      </text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// Panel principal
// ─────────────────────────────────────────────────────────────
export default function SkillTreePanel({ skillTree, path, charId }) {
  const [selected, setSelected] = useState(null);

  if (!skillTree?.length)
    return (
      <p className="has-text-grey-light is-size-7">Données indisponibles.</p>
    );

  const layout = getLayout(path);
  const { positions, rootConnections } = layout;

  // Index id → node
  const byId = {};
  const byAnchor = {};
  skillTree.forEach((n) => {
    byId[n.id] = n;
    byAnchor[n.anchor] = n;
  });

  // ── Construire toutes les connexions ──────────────────────
  const connections = [];

  // 1. Connexions ROOT depuis le layout (entre nœuds sans parent dans l'API)
  rootConnections.forEach(([fromAnchor, toAnchor]) => {
    const from = positions[fromAnchor];
    const to = positions[toAnchor];
    if (!from || !to) return;
    const fromNode = byAnchor[fromAnchor];
    const toNode = byAnchor[toAnchor];
    const maxed =
      fromNode?.level >= fromNode?.max_level &&
      toNode?.level >= toNode?.max_level;
    connections.push({ from, to, maxed });
  });

  // 2. Connexions stat nodes → parent depuis l'API
  skillTree.forEach((node) => {
    if (!node.parent) return;
    const parentNode = byId[String(node.parent)];
    if (!parentNode) return;
    const from = positions[parentNode.anchor];
    const to = positions[node.anchor];
    if (!from || !to) return;
    const maxed =
      parentNode.level >= parentNode.max_level && node.level >= node.max_level;
    connections.push({ from, to, maxed });
  });

  // ── Stats globales ────────────────────────────────────────
  const total = skillTree.length;
  const unlocked = skillTree.filter((n) => n.level >= n.max_level).length;
  const pct = Math.round((unlocked / total) * 100);

  const selectedNode = selected
    ? skillTree.find((n) => n.id === selected)
    : null;
  const selStyle = selectedNode ? getNodeStyle(selectedNode) : null;

  return (
    <div style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {/* ── Barre de progression ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            color: "#d8b467",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          TRACES
        </span>
        <div
          style={{
            flex: 1,
            height: "3px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "linear-gradient(90deg, #d8b467, #ece3c5)",
              transition: "width 0.4s ease",
              boxShadow: "0 0 6px rgba(216,180,103,0.5)",
            }}
          />
        </div>
        <span
          style={{ fontSize: "0.6rem", color: "#d8b467", whiteSpace: "nowrap" }}
        >
          {unlocked}/{total}
        </span>
      </div>

      {/* ── Canvas SVG ── */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,20,0.97) 0%, rgba(5,8,15,0.99) 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(216,180,103,0.12)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Grille de fond */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(216,180,103,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(216,180,103,0.02) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <svg viewBox="0 0 600 430" width="100%" style={{ display: "block" }}>
          <defs>
            <filter id="stp-glow">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lueur centrale ambiante */}
          <ellipse
            cx="300"
            cy="215"
            rx="180"
            ry="120"
            fill="rgba(216,180,103,0.025)"
          />

          {/* Lignes de connexion */}
          {connections.map(({ from, to, maxed }, i) => (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={
                maxed ? "rgba(216,180,103,0.5)" : "rgba(255,255,255,0.08)"
              }
              strokeWidth={maxed ? 1.8 : 1.2}
              strokeDasharray={maxed ? "none" : "4 4"}
              filter={maxed ? "url(#stp-glow)" : "none"}
            />
          ))}

          {/* Nœuds */}
          {skillTree.map((node) => {
            const pos = positions[node.anchor];
            if (!pos) return null;
            return (
              <Node
                key={node.id}
                node={node}
                pos={pos}
                isSelected={selected === node.id}
                onClick={(n) => setSelected((s) => (s === n.id ? null : n.id))}
              />
            );
          })}
        </svg>
      </div>

      {/* ── Panneau de détail ── */}
      {selectedNode && (
        <div
          style={{
            marginTop: "12px",
            padding: "16px 18px",
            background:
              "linear-gradient(135deg, rgba(216,180,103,0.06) 0%, rgba(0,0,0,0.4) 100%)",
            border: "1px solid rgba(216,180,103,0.25)",
            borderRadius: "12px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "10%",
              bottom: "10%",
              width: "3px",
              background: selStyle?.color || "#d8b467",
              borderRadius: "0 2px 2px 0",
            }}
          />

          {isStatNode(selectedNode) ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {selectedNode.icon && (
                <img
                  src={`https://api.mihomo.me/${selectedNode.icon}`}
                  alt=""
                  style={{ width: 32, height: 32, opacity: 0.85 }}
                />
              )}
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      color: "#d8b467",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    {getStatLabel(selectedNode)}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "10px",
                      background: "rgba(216,180,103,0.1)",
                      border: "1px solid rgba(216,180,103,0.25)",
                      color: "#d8b467",
                      fontSize: "0.58rem",
                    }}
                  >
                    NŒUD DE STAT
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "#777",
                    marginTop: "2px",
                    display: "block",
                  }}
                >
                  Niv. {selectedNode.level} / {selectedNode.max_level}
                </span>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                {selectedNode.icon && (
                  <img
                    src={`https://api.mihomo.me/${selectedNode.icon}`}
                    alt=""
                    style={{ width: 40, height: 40, borderRadius: "8px" }}
                  />
                )}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        color: selStyle?.color || "#d8b467",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                      }}
                    >
                      {selectedNode.name || selectedNode.anchor}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#777",
                        fontSize: "0.58rem",
                      }}
                    >
                      Niv. {selectedNode.level} / {selectedNode.max_level}
                    </span>
                  </div>
                </div>
              </div>
              {selectedNode.description ? (
                <p
                  style={{
                    fontSize: "0.73rem",
                    lineHeight: "1.65",
                    color: "#c0c0c0",
                    margin: 0,
                  }}
                >
                  {sanitizeAndFormatDescription(selectedNode.description)}
                </p>
              ) : (
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#555",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  Aucune description disponible pour cette trace.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
