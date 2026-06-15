import LightConeCard from "../lightConeComp/LightConeCard";
import { getCharacterImages } from "../../imageMap/imageMap";

const sanitizeName = (value) => {
  if (!value) return "";
  return String(value)
    .replace(/<\/?unbreak>/gi, "")
    .replace(/\{F#([^}]*)\}\{M#[^}]*\}/gi, "$1")
    .replace(/\{M#([^}]*)\}\{F#[^}]*\}/gi, "$1")
    .replace(/\{[FM]#([^}]*)\}/gi, "$1")
    .trim();
};

const sanitizeAndFormatDescription = (text) => {
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
    colorRegex.lastIndex = 0;
    while ((m = colorRegex.exec(line)) !== null) {
      if (m.index > last) parts.push(line.substring(last, m.index));
      parts.push(
        <span
          key={`c-${li}-${m.index}`}
          style={{ color: m[1].substring(0, 7), fontWeight: "bold" }}
        >
          {m[2]}
        </span>,
      );
      last = colorRegex.lastIndex;
    }
    if (last < line.length) parts.push(line.substring(last));
    return (
      <span key={`l-${li}`}>
        {parts.length ? parts : line}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
};

function CharacterDetails({ activeCharacter }) {
  if (!activeCharacter) {
    return (
      <div className="column is-8">
        <div className="notification is-info">
          Sélectionnez un membre de l'équipage pour l'inspecter.
        </div>
      </div>
    );
  }

  const charImages = getCharacterImages(activeCharacter.id);

  return (
    <div className="column is-8 animate__animated animate__fadeIn">
      <div className="box character-details-box">
        {/* ── En-tête ── */}
        <div className="columns is-vcentered mb-4 has-border-bottom-hsr pb-4">
          <div className="column is-narrow">
            {charImages?.icon ? (
              <figure className="image is-64x64">
                <img
                  src={charImages.icon}
                  alt={activeCharacter.name}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    width: "64px",
                    height: "64px",
                  }}
                />
              </figure>
            ) : (
              <div
                className={`character-avatar-frame rarity-${activeCharacter.rarity || 5}`}
              >
                <span className="is-size-3">✦</span>
              </div>
            )}
          </div>
          <div className="column">
            <h1 className="title is-3 font-orbitron has-text-gold mb-1">
              {sanitizeName(activeCharacter.name)}
            </h1>
            <div className="tags">
              <span className="tag is-dark font-orbitron">
                Niv. {activeCharacter.level}
              </span>
              <span className="tag is-warning font-orbitron">
                Éidolon {activeCharacter.eidolons}
              </span>
              <span className="tag is-black font-orbitron has-text-gold">
                {activeCharacter.path}
              </span>
              <span className="tag is-light font-orbitron">
                {activeCharacter.combatType}
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats + Light Cone ── */}
        <div className="columns">
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">
              Statistiques
            </h4>
            <StatsPanel stats={activeCharacter.stats} />
          </div>
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">
              Cône de lumière
            </h4>
            <div className="box equipment-box">
              <LightConeCard lightCone={activeCharacter.lightCone} />
              {activeCharacter.lightCone?.effectDescription && (
                <div className="mt-4 p-3 rounded has-background-black-bis has-border-left-hsr">
                  <h5 className="title is-6 has-text-gold mb-2">
                    {sanitizeName(activeCharacter.lightCone.name)}
                  </h5>
                  <p
                    className="is-size-7 has-text-grey-lighter"
                    style={{ lineHeight: "1.4" }}
                  >
                    {sanitizeAndFormatDescription(
                      activeCharacter.lightCone.effectDescription,
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini stats panel (compact) ── */
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
  fire_dmg: "🔥",
  ice_dmg: "❄️",
  thunder_dmg: "⚡",
  wind_dmg: "🌀",
  quantum_dmg: "🌌",
  imaginary_dmg: "✨",
  elation_dmg: "✨",
  physical_dmg: "👊",
};
const STAT_COLORS = {
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

function StatsPanel({ stats }) {
  if (!stats?.length)
    return <p className="has-text-grey-light is-size-7">Aucune statistique.</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {stats.map((stat) => {
        const color = STAT_COLORS[stat.key] || "#d8b467";
        return (
          <div
            key={stat.key}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(255,255,255,0.07)`,
              borderLeft: `3px solid ${color}`,
              borderRadius: "7px",
              padding: "7px 10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>
                {STAT_ICONS[stat.key] || "📊"}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: "0.68rem",
                  color: "#b3b3b3",
                  fontFamily: "Orbitron,sans-serif",
                  textTransform: "uppercase",
                }}
              >
                {stat.name}
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  fontFamily: "Orbitron,sans-serif",
                  color,
                }}
              >
                {stat.total}
              </span>
            </div>
            {stat.base && stat.bonus && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  fontSize: "0.63rem",
                  color: "#666",
                  paddingLeft: "24px",
                  marginTop: "2px",
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
      })}
    </div>
  );
}

export default CharacterDetails;
export { sanitizeName, sanitizeAndFormatDescription };
