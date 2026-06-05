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

const SKILL_TYPE_LABELS = {
  Normal:     "Attaque de base",
  BPSkill:    "Compétence",
  Ultra:      "Ultime",
  Talent:     "Talent",
  Technique:  "Technique",
  MazeNormal: "Attaque de labyrinthe",
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
            <div className="box equipment-box">
              {activeCharacter.skills?.map((skill, index) => (
                <div key={skill.id || index} className="skill-card p-2 mb-3 tooltip-wrapper">
                  <div className="is-flex is-align-items-center">
                    <div>
                      <p className="has-text-white is-size-6 has-text-weight-bold">
                        {sanitizeName(skill.name)}
                      </p>
                      <p className="is-size-7 has-text-grey">
                        {SKILL_TYPE_LABELS[skill.typeText] || skill.typeText || skill.type}
                        {" · "}Niv. {skill.level}
                        {skill.maxLevel && <span className="has-text-grey-light"> / {skill.maxLevel}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="tooltip-text">
                    {sanitizeAndFormatDescription(skill.description || skill.simpleDesc)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
