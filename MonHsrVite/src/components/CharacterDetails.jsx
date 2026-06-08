import LightConeCard from "./LightConeCard";

const sanitizeAndFormatDescription = (text) => {
  if (!text) return "Aucune description disponible.";

  const formattedText = String(text)
    .replace(/<\/?u>/gi, "")
    .replace(/<\/?unbreak>/gi, "")
    .replace(/<\/?i>/gi, "")
    .replace(/\s+/g, " ");

  const lines = formattedText.split(/\\n|\n/g);
  const colorRegex = /<color=([^>]+)>(.*?)<\/color>/gi;

  return lines.map((line, lineIdx) => {
    const lineElements = [];
    let lastIndex = 0;
    let match;
    colorRegex.lastIndex = 0;

    while ((match = colorRegex.exec(line)) !== null) {
      if (match.index > lastIndex) lineElements.push(line.substring(lastIndex, match.index));
      lineElements.push(
        <span key={`c-${lineIdx}-${match.index}`} style={{ color: match[1].substring(0, 7), fontWeight: "bold" }}>
          {match[2]}
        </span>
      );
      lastIndex = colorRegex.lastIndex;
    }
    if (lastIndex < line.length) lineElements.push(line.substring(lastIndex));

    return (
      <span key={`line-${lineIdx}`}>
        {lineElements.length > 0 ? lineElements : line}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
};

const sanitizeName = (value) => String(value || "").replace(/<\/?unbreak>/gi, "");

// Libellés et couleurs par type/effect de skill
const SKILL_TYPE_LABELS = {
  Normal:         "Attaque de base",
  BPSkill:        "Compétence",
  Ultra:          "Ultime",
  Talent:         "Talent",
  Technique:      "Technique",
  Maze:           "Technique",
  MazeNormal:     "Attaque labyrinthe",
  ElationDamage:  "Compétence Allégresse",
};

const SKILL_TYPE_COLORS = {
  Normal:        "#e08c30",
  BPSkill:       "#4fa3d1",
  Ultra:         "#d4a0e0",
  Talent:        "#7ecba1",
  Technique:     "#aaaaaa",
  Maze:          "#aaaaaa",
  ElationDamage: "#f4d258",
};

const EFFECT_BADGES = {
  Summon:  { label: "Invocation", color: "#9b59b6" },
  Support: { label: "Support",    color: "#27ae60" },
  Enhance: { label: "Amélioration", color: "#e67e22" },
  Restore: { label: "Restauration", color: "#1abc9c" },
  AoEAttack:    { label: "AoE",   color: "#e74c3c" },
  SingleAttack: { label: "Mono",  color: "#c0392b" },
  Blast:        { label: "Zone",  color: "#e74c3c" },
  Bounce:       { label: "Rebond",color: "#e74c3c" },
  MazeAttack:   { label: "Attaque", color: "#c0392b" },
};

function SkillCard({ skill, index }) {
  const typeLabel = SKILL_TYPE_LABELS[skill.typeText] || SKILL_TYPE_LABELS[skill.type] || skill.typeText || skill.type;
  const typeColor = SKILL_TYPE_COLORS[skill.typeText] || SKILL_TYPE_COLORS[skill.type] || "#d8b467";
  const effectBadge = skill.effect ? EFFECT_BADGES[skill.effect] : null;

  return (
    <div
      className="skill-card p-2 mb-3 tooltip-wrapper"
      style={{ borderLeft: `3px solid ${typeColor}` }}
    >
      <div className="is-flex is-align-items-center" style={{ gap: "10px" }}>
        {/* Icône du skill depuis l'API */}
        {skill.icon ? (
          <figure className="image is-40x40" style={{ flexShrink: 0 }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </figure>
        ) : (
          <div
            style={{
              width: "40px", height: "40px", flexShrink: 0,
              background: "rgba(255,255,255,0.05)", borderRadius: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            ✦
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="has-text-white is-size-6 has-text-weight-bold" style={{ lineHeight: 1.2 }}>
            {sanitizeName(skill.name)}
          </p>
          <div className="is-flex is-align-items-center mt-1" style={{ gap: "6px", flexWrap: "wrap" }}>
            <span
              className="is-size-7 font-orbitron"
              style={{ color: typeColor }}
            >
              {typeLabel}
            </span>
            {effectBadge && (
              <span
                className="tag is-small"
                style={{
                  background: `${effectBadge.color}22`,
                  border: `1px solid ${effectBadge.color}66`,
                  color: effectBadge.color,
                  fontSize: "0.6rem",
                  height: "18px",
                  padding: "0 6px",
                }}
              >
                {effectBadge.label}
              </span>
            )}
            <span className="is-size-7 has-text-grey">
              Niv. {skill.level}
              {skill.maxLevel && <span className="has-text-grey-light"> / {skill.maxLevel}</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Tooltip avec description */}
      <div className="tooltip-text">
        {sanitizeAndFormatDescription(skill.description || skill.simpleDesc)}
      </div>
    </div>
  );
}

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

  // Séparer les skills principaux des skills spéciaux (summon, elation, etc.)
  const mainSkillTypes = new Set(["Normal", "BPSkill", "Ultra", "Talent", "Maze"]);
  const mainSkills    = activeCharacter.skills?.filter(s => mainSkillTypes.has(s.typeText) || mainSkillTypes.has(s.type)) || [];
  const specialSkills = activeCharacter.skills?.filter(s => !mainSkillTypes.has(s.typeText) && !mainSkillTypes.has(s.type)) || [];

  return (
    <div className="column is-8 animate__animated animate__fadeIn">
      <div className="box character-details-box">

        {/* En-tête */}
        <div className="columns is-vcentered mb-4 has-border-bottom-hsr pb-4">
          <div className="column is-narrow">
            <div className={`character-avatar-frame rarity-${activeCharacter.rarity || 5}`}>
              <span className="is-size-3">✦</span>
            </div>
          </div>
          <div className="column">
            <h1 className="title is-3 font-orbitron has-text-gold mb-1">
              {sanitizeName(activeCharacter.name)}
            </h1>
            <div className="tags">
              <span className="tag is-dark font-orbitron">Niv. {activeCharacter.level}</span>
              <span className="tag is-warning font-orbitron">Éidolon {activeCharacter.eidolons}</span>
              <span className="tag is-black font-orbitron has-text-gold">{activeCharacter.path}</span>
              <span className="tag is-light font-orbitron">{activeCharacter.combatType}</span>
            </div>
          </div>
        </div>

        <div className="columns">
          {/* Cône de lumière */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">Cône de lumière</h4>
            <div className="box equipment-box">
              <LightConeCard lightCone={activeCharacter.lightCone} />
              {activeCharacter.lightCone?.effectDescription && (
                <div className="mt-4 p-3 rounded has-background-black-bis has-border-left-hsr">
                  <h5 className="title is-6 has-text-gold mb-2">
                    {sanitizeName(activeCharacter.lightCone.name)}
                  </h5>
                  <p className="is-size-7 has-text-grey-lighter" style={{ lineHeight: "1.4" }}>
                    {sanitizeAndFormatDescription(activeCharacter.lightCone.effectDescription)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Aptitudes */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">Aptitudes</h4>
            <div className="box equipment-box" style={{ maxHeight: "520px", overflowY: "auto" }}>

              {/* Skills principaux */}
              {mainSkills.map((skill, index) => (
                <SkillCard key={skill.id || index} skill={skill} index={index} />
              ))}

              {/* Skills spéciaux (Summon, Elation, etc.) */}
              {specialSkills.length > 0 && (
                <>
                  <div
                    className="is-size-7 font-orbitron has-text-grey mt-3 mb-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px", letterSpacing: "0.08em" }}
                  >
                    APTITUDES SPÉCIALES
                  </div>
                  {specialSkills.map((skill, index) => (
                    <SkillCard key={skill.id || index} skill={skill} index={index} />
                  ))}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
