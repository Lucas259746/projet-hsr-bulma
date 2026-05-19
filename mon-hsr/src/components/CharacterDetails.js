import LightConeCard from './LightConeCard';

// Nettoie toutes les balises système complexes (color, unbreak, u, \n, #3[i]) et applique les styles Bulma
const sanitizeAndFormatDescription = (text) => {
  if (!text) return 'Aucune description disponible.';

  let formattedText = String(text)
    // 1. Supprime les balises <u> et </u>
    .replace(/<\/?u>/gi, '')
    // 2. Supprime les balises <unbreak> et </unbreak>
    .replace(/<\/?unbreak>/gi, '')
    // 3. Supprime les marqueurs système du type #1[i], #3[i], etc.
    .replace(/#\d+\[i\]/gi, '')
    // 4. Supprime les espaces multiples résiduels
    .replace(/\s+/g, ' ');

  // 5. Gère les sauts de ligne \n ou \\n en découpant le texte
  const lines = formattedText.split(/\\n|\n/g);

  // Expression régulière pour capturer le contenu à l'intérieur des balises <color=...>Texte</color>
  const colorRegex = /<color=([^>]+)>(.*?)<\/color>/gi;

  // Parcourt chaque ligne pour formater les couleurs et réinjecter les sauts de ligne
  const finalContent = lines.map((line, lineIdx) => {
    const lineElements = [];
    let lastIndex = 0;
    let match;

    // Réinitialise l'index de recherche de la RegEx pour la ligne actuelle
    colorRegex.lastIndex = 0;

    while ((match = colorRegex.exec(line)) !== null) {
      // Ajoute le texte brut avant la balise de couleur
      if (match.index > lastIndex) {
        lineElements.push(line.substring(lastIndex, match.index));
      }

      const colorHex = match[1].substring(0, 7); // Garde le #RRGGBB et ignore l'alpha (ff)
      const textContent = match[2];

      // Ajoute le texte coloré avec style
      lineElements.push(
        <span key={`color-${lineIdx}-${match.index}`} style={{ color: colorHex, fontWeight: 'bold' }}>
          {textContent}
        </span>
      );

      lastIndex = colorRegex.lastIndex;
    }

    // Ajoute le reste de la ligne après la dernière balise de couleur
    if (lastIndex < line.length) {
      lineElements.push(line.substring(lastIndex));
    }

    // Retourne les éléments de la ligne, suivis d'un <br /> si ce n'est pas la dernière ligne
    return (
      <span key={`line-${lineIdx}`}>
        {lineElements.length > 0 ? lineElements : line}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });

  return finalContent;
};

// Garde ta fonction d'origine pour les titres simples
const sanitizeName = (value) => String(value || '').replace(/<\/?unbreak>/gi, '');

function CharacterDetails({ activeCharacter }) {
  if (!activeCharacter) {
    return (
      <div className="column is-8">
        <div className="notification is-info">Sélectionnez un membre de l'équipage pour l'inspecter.</div>
      </div>
    );
  }

  const lightconeImageMap = {
    "23024": {
      small: "PP_lightcone_acheron.webp",
      large: "lightcone_acheron.webp",
    },
  };
  const activeLightconeImages =
    activeCharacter.lightCone?.id && lightconeImageMap[activeCharacter.lightCone.id];

  // Mapping des noms de compétences restauré strictement à l'identique
  const skillImageMap = {
    "130804": "Ability_Atop_Rainleaf_Hangs_Oneness.webp",
    "130802": "Ability_Octobolt_Flash.webp",
    "130807": "Ability_Quadrivalent_Ascendance.webp",
    "130803": "Ability_Slashed_Dream_Cries_in_Red.webp",
    "130814": "Ability_Slashed_Dream_Cries_in_Red.webp",
    "130815": "Ability_Slashed_Dream_Cries_in_Red.webp",
    "130816": "Ability_Slashed_Dream_Cries_in_Red.webp",
    "130817": "Ability_Slashed_Dream_Cries_in_Red.webp",
    "130801": "Ability_Trilateral_Wiltcross.webp"
  };
  return (
    <div className="column is-8 animate__animated animate__fadeIn">
      <div className="box character-details-box">
        {/* --- EN-TÊTE DU PERSONNAGE --- */}
        <div className="columns is-vcentered mb-4 border-bottom-gold pb-4">
          <div className="column is-narrow">
            <div className={`character-avatar-frame rarity-${activeCharacter.rarity || 5}`}>
              <span className="is-size-3">✦</span>
            </div>
          </div>
          <div className="column">
            <h1 className="title is-3 font-orbitron text-gold mb-1">
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

        {/* --- GRILLE ÉQUIPEMENT & APTITUDES --- */}
        <div className="columns">
          {/* --- BLOC CÔNE DE LUMIÈRE --- */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron text-gold mb-3">Cône de lumière</h4>
            <div className="box equipment-box">
              <LightConeCard lightCone={activeCharacter.lightCone} />
              
              {activeCharacter.lightCone && (
                <div className="mt-4 p-3 rounded has-background-black-bis" style={{ borderLeft: '3px solid var(--hsr-gold)', borderRadius: '4px' }}>
                  <h5 className="title is-6 has-text-gold mb-2">
                    {sanitizeName(activeCharacter.lightCone.name)}
                  </h5>
                  <p className="is-size-7 has-text-grey-lighter" style={{ lineHeight: '1.4' }}>
                    {sanitizeAndFormatDescription(activeCharacter.lightCone.effectDescription || activeCharacter.lightCone.description)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- BLOC APTITUDES --- */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron text-gold mb-3">Aptitudes</h4>
            <div className="box equipment-box">
              {activeCharacter.skills?.map((skill, index) => {
                const imageName = skillImageMap[skill.id];
  
                return (
                  <div key={skill.id || index} className="skill-card mb-3 tooltip-wrapper">
                    <div className="is-flex is-align-items-center">
                      {imageName && (
                        <figure className="image is-48x48 mr-3">
                          <img src={`/skill-images/${imageName}`} alt={skill.name} />
                        </figure>
                      )}
                      <div>
                        <p className="has-text-white is-size-6 has-text-weight-bold">
                          {sanitizeName(skill.name)}
                        </p>
                        <p className="is-size-7 has-text-grey">Niv. {skill.level}</p>
                      </div>
                    </div>
                    <div className="tooltip-text">
                      {sanitizeAndFormatDescription(skill.description)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;