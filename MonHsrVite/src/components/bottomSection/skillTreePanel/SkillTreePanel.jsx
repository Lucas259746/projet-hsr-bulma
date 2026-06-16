import { sanitizeAndFormatDescription } from "../../characterComp/CharacterDetails";
import useSkillTree, {
  getNodeStyle,
  isStatNode,
  isMainSkill,
  getLocalIconPath,
  getStatLabel,
} from "./useSkillTree";

// SOUS-COMPOSANT : Un nœud interactif autonome de l'arbre SVG
function Node({ node, pos, isSelected, onClick, charId }) {
  const style = getNodeStyle(node);
  const stat = isStatNode(node);
  const main = isMainSkill(node);
  const nodeMaxLevel = node.maxLevel || node.max_level || 1;
  const isMaxed = node.level >= nodeMaxLevel; // Nœud complété au maximum ?

  const { color, size, ring, shape } = style;
  const half = size / 2;
  const rx = shape === "circle" ? half : 9; // Calcule l'arrondi (cercle parfait vs carré émoussé)
  const alpha = isMaxed ? "ff" : "55"; // Opacité de couleur de fond (opaque si débloqué, translucide si bloqué)
  const border = isSelected ? color : isMaxed ? color : "rgba(255,255,255,0.3)";
  const bWidth = isSelected ? 2.5 : 1.5;

  // Applique une ombre de lueur néon intense (glow) uniquement si sélectionné ou s'il s'agit d'une aptitude majeure activée
  const glow = isSelected
    ? `drop-shadow(0 0 8px ${color})`
    : isMaxed && main
      ? `drop-shadow(0 0 5px ${color}88)`
      : "none";
  const statLabel = stat ? getStatLabel(node) : null;
  const localIcon = getLocalIconPath(charId, node);

  return (
    <g
      onClick={() => onClick(node)}
      style={{ cursor: "pointer", filter: glow }}
      transform={`translate(${pos.x}, ${pos.y})`} // Positionne le repère SVG aux coordonnées exactes calculées
    >
      {/* 1. Anneau extérieur décoratif optionnel */}
      {ring && (
        <rect
          x={-(half + 7)}
          y={-(half + 7)}
          width={size + 14}
          height={size + 14}
          rx={rx + 4}
          fill="none"
          stroke={isMaxed ? color + "44" : "rgba(255,255,255,0.1)"}
          strokeWidth="1"
        />
      )}

      {/* 2. Corps du bouton du nœud */}
      <rect
        x={-half}
        y={-half}
        width={size}
        height={size}
        rx={rx}
        fill={`${color}${alpha}`}
        stroke={border}
        strokeWidth={bWidth}
        opacity={isMaxed ? 1 : 0.65}
      />

      {/* 3. Intégration de l'image de l'aptitude au centre du nœud */}
      {!stat &&
        (localIcon ? (
          <image
            href={localIcon}
            x={-half + 4}
            y={-half + 4}
            width={size - 8}
            height={size - 8}
            style={{ opacity: isMaxed ? 1 : 0.6 }}
          />
        ) : (
          /* Fallback petit carré blanc si icône absente */
          <rect
            x={-half + 6}
            y={-half + 6}
            width={size - 12}
            height={size - 12}
            rx={shape === "circle" ? (size - 12) / 2 : 4}
            fill="#ffffff"
            opacity={isMaxed ? 0.9 : 0.5}
          />
        ))}

      {/* 4. Texte inférieur indiquant le niveau actuel (ex: "10/10") ou l'abréviation de la stat */}
      <text
        y={half + 13}
        textAnchor="middle"
        fill={isMaxed ? "#ffffff" : "#999999"}
        fontSize="8.5"
        fontFamily="Orbitron, sans-serif"
        style={{ userSelect: "none", fontWeight: isMaxed ? "600" : "400" }}
      >
        {stat ? statLabel : `${node.level}/${nodeMaxLevel}`}
      </text>
    </g>
  );
}

// COMPOSANT COMPLÈT PRINCIPAL DE L'ARBRE
export default function SkillTreePanel({ skillTree, path, charId }) {
  const {
    hasData,
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
    traceName,
    traceDesc,
    traceIcon,
    selectedMaxLevel,
  } = useSkillTree({ skillTree, path, charId });

  if (!hasData)
    return (
      <p className="has-text-grey-light is-size-7 p-4">
        Données de l'arbre indisponibles.
      </p>
    );

  return (
    <div style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {/* BARRE DE PROGRESSION REPRÉSENTANT LE NOMBRE DE TRACES ACQUISES */}
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

      {/* CANVAS GRAPHIQUE SVG (La carte stellaire) */}
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
        <svg viewBox="0 0 640 520" width="100%" style={{ display: "block" }}>
          <defs>
            {/* Définition du filtre SVG de halo néon réutilisable pour illuminer les liens actifs */}
            <filter id="stp-glow" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ellipse de fond simulant une nébuleuse discrète au centre du repère */}
          <ellipse
            cx="320"
            cy="260"
            rx="210"
            ry="160"
            fill="rgba(216,180,103,0.025)"
          />

          {/* Dessin des lignes physiques de liaison de l'arbre */}
          {connections.map(({ from, to, maxed }, i) => (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={
                maxed ? "rgba(216,180,103,0.75)" : "rgba(255,255,255,0.38)"
              } // S'allume en doré si complété, gris pointillé si bloqué
              strokeWidth={maxed ? 2 : 1.4}
              strokeDasharray={maxed ? "none" : "4 4"}
              filter={maxed ? "url(#stp-glow)" : "none"}
            />
          ))}

          {/* Boucle finale dessinant chaque nœud par-dessus les lignes */}
          {skillTree.map((node) => {
            const pos = positions[node.anchor];
            if (!pos) return null;
            return (
              <Node
                key={node.id}
                node={node}
                pos={pos}
                charId={charId}
                isSelected={selected === node.id}
                onClick={(n) => setSelected((s) => (s === n.id ? null : n.id))}
              />
            );
          })}
        </svg>
      </div>

      {/* MODALE INFERIEURE S'OUVRANT AU CLIC D'UN NŒUD (Détails de la Trace) */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            {/* Bulle d'aperçu d'icône */}
            {isSelectedStat ? (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(216,180,103,0.1)",
                  border: "1.5px solid #d8b467",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d8b467",
                  fontSize: "0.6rem",
                  fontWeight: "700",
                }}
              >
                {getStatLabel(selectedNode)}
              </div>
            ) : traceIcon ? (
              <img
                src={traceIcon}
                alt=""
                style={{ width: 40, height: 40, borderRadius: "8px" }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              />
            )}
            {/* Intitulé et niveau maximal */}
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    color: selStyle?.color || "#d8b467",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                  }}
                >
                  {traceName}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#aaa",
                    fontSize: "0.58rem",
                  }}
                >
                  Niv. {selectedNode.level} / {selectedMaxLevel}
                </span>
              </div>
            </div>
          </div>
          {/* Formatage HTML de la description longue de la compétence */}
          {traceDesc ? (
            <p
              style={{
                fontSize: "0.73rem",
                lineHeight: "1.65",
                color: "#c0c0c0",
                margin: 0,
              }}
            >
              {sanitizeAndFormatDescription(traceDesc)}
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
              Aucune description disponible.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
