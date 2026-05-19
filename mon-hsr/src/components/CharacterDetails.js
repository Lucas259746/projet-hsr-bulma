import LightConeCard from './LightConeCard';
import RelicCard from './RelicCard';

const sanitizeName = (value) => String(value || '').replace(/<\/?unbreak>/gi, '');

function CharacterDetails({ activeCharacter }) {
  if (!activeCharacter) {
    return (
      <div className="column is-8">
        <div className="notification is-info">Sélectionnez un membre de l'équipage pour l'inspecter.</div>
      </div>
    );
  }

  return (
    <div className="column is-8">
      <div className="box character-details-box">
        <div className="columns is-vcentered mb-4">
          <div className="column">
            <h2 className="title is-3 text-gold font-orbitron mb-2">{sanitizeName(activeCharacter.name)}</h2>
            <div className="tags">
              <span className="tag is-warning font-orbitron">{activeCharacter.rarity} ✦</span>
              <span className="tag is-light">{activeCharacter.path || 'Voie'}</span>
              <span className="tag is-light">{activeCharacter.combatType || 'Élément'}</span>
              <span className="tag is-light">Lvl {activeCharacter.level}</span>
              <span className="tag is-light">Ascension {activeCharacter.ascension}</span>
              <span className="tag is-light">Eidolons {(activeCharacter.eidolons ?? activeCharacter.superimposition) || 1}</span>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <h4 className="title is-6 mb-3 font-orbitron text-gold">Cône de lumière</h4>
            <div className="box detail-card p-4">
              <LightConeCard lightCone={activeCharacter.lightCone} />

              <div className="skill-section">
                <h5 className="title is-6 font-orbitron has-text-white">Compétences</h5>
                {activeCharacter.skills?.length ? (
                  <div className="skill-list">
                    {activeCharacter.skills.map((skill) => {
                      const skillName = sanitizeName(skill.name || skill.skillTypeText || 'Compétence');
                      const skillType = skill.skillTypeText || skill.skillType || 'Skill';
                      const skillLevel = skill.level || 1;
                      const iconSrc = skill.skillIcon || skill.ultraSkillIcon || null;

                      return (
                        <div key={skill.id || `${skillName}-${skillLevel}`} className="skill-card">
                          <div className="skill-icon">
                            {iconSrc ? (
                              <img src={iconSrc} alt={skillName} />
                            ) : (
                              <span>{skillType?.[0] || 'S'}</span>
                            )}
                          </div>
                          <div className="skill-meta">
                            <p className="has-text-white has-text-weight-semibold">{skillName}</p>
                            <p className="is-size-7 has-text-grey-light">
                              <span className="skill-type">{skillType}</span>
                              <span className="skill-level"> Niv. {skillLevel}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="has-text-grey-light is-size-7">Aucune compétence disponible.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
