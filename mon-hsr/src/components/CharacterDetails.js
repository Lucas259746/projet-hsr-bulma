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
          <div className="column is-5">
            <h4 className="title is-6 mb-3 font-orbitron text-gold">Cône de lumière</h4>
            <div className="box detail-card p-4">
              <LightConeCard lightCone={activeCharacter.lightCone} />
            </div>
          </div>

          <div className="column is-7">
            <h4 className="title is-6 mb-3 font-orbitron text-gold">Reliques d'équipement</h4>
            {activeCharacter.relics?.length > 0 ? (
              <div className="relic-scroll-container">
                {activeCharacter.relics.map((relic) => (
                  <RelicCard key={relic.id || relic.name} relic={relic} />
                ))}
              </div>
            ) : (
              <p className="has-text-grey-light mt-2">Aucune relique détectée en vitrine.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
