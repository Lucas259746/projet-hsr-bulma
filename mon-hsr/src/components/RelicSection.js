import RelicCard from './RelicCard';

function RelicSection({ activeCharacter }) {
  if (!activeCharacter) {
    return null;
  }

  return (
    <div className="relic-section box mt-5">
      <h3 className="title is-5 font-orbitron has-text-gold mb-4">Reliques d'équipement</h3>
      {activeCharacter.relics?.length > 0 ? (
        <div className="columns is-multiline">
          {activeCharacter.relics.map((relic) => (
            <div key={relic.id || relic.name} className="column is-half-tablet is-one-third-desktop">
              <RelicCard relic={relic} />
            </div>
          ))}
        </div>
      ) : (
        <p className="has-text-grey-light">Aucune relique détectée en vitrine.</p>
      )}
    </div>
  );
}

export default RelicSection;