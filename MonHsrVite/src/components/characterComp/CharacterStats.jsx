// Icône emoji par type de stat
const STAT_ICONS = {
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
  // Éléments
  fire_dmg: "🔥",
  ice_dmg: "❄️",
  thunder_dmg: "⚡",
  wind_dmg: "🌀",
  quantum_dmg: "🌌",
  imaginary_dmg: "✨",
  elation_dmg: "✨",
  physical_dmg: "👊",
  nihility_dmg: "🕳️",
};

// Noms FR plus courts pour l'affichage dans les cards
const STAT_SHORT_NAMES = {
  hp: "PV",
  atk: "ATQ",
  def: "DÉF",
  spd: "VIT",
  crit_rate: "Crit. Rate",
  crit_dmg: "Crit. DMG",
  break_dmg: "Rupture",
  effect_hit: "App. Effets",
  effect_res: "Rés. Effets",
  heal_rate: "Soin sortant",
  fire_dmg: "Boost Feu",
  ice_dmg: "Boost Glace",
  thunder_dmg: "Boost Foudre",
  wind_dmg: "Boost Vent",
  quantum_dmg: "Boost Quantum",
  imaginary_dmg: "Boost Imag.",
  elation_dmg: "Boost Allégr.",
  physical_dmg: "Boost Phys.",
  nihility_dmg: "Boost Néant",
};

// Couleur d'accent par stat
const STAT_COLOR = {
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
const DEFAULT_COLOR = "#d8b467";

function StatCard({ stat }) {
  const icon = STAT_ICONS[stat.key] || "📊";
  const short = STAT_SHORT_NAMES[stat.key] || stat.name;
  const color = STAT_COLOR[stat.key] || DEFAULT_COLOR;
  const hasBreakdown = stat.base && stat.bonus;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.07)`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "8px",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {/* Ligne principale : icône + nom + total */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{icon}</span>
        <span
          style={{
            flex: 1,
            fontSize: "0.72rem",
            color: "#b3b3b3",
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {short}
        </span>
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            fontFamily: "Orbitron, sans-serif",
            color: color,
          }}
        >
          {stat.total}
        </span>
      </div>

      {/* Ligne base + bonus si disponible */}
      {hasBreakdown && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            fontSize: "0.68rem",
            color: "#777",
            paddingLeft: "28px",
          }}
        >
          <span>
            base <span style={{ color: "#aaa" }}>{stat.base}</span>
          </span>
          <span style={{ color: "#555" }}>+</span>
          <span>
            équip. <span style={{ color: "#d8b467" }}>{stat.bonus}</span>
          </span>
        </div>
      )}
    </div>
  );
}

function CharacterStats({ stats }) {
  if (!stats || stats.length === 0) {
    return (
      <p className="has-text-grey-light is-size-7">
        Aucune statistique disponible.
      </p>
    );
  }

  return (
    <div
      className="box has-background-black-bis p-4"
      style={{ borderLeft: "3px solid #d8b467" }}
    >
      <h3 className="title is-5 font-orbitron has-text-gold mb-4">
        Statistiques
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default CharacterStats;
