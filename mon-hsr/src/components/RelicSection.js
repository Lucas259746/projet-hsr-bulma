import RelicCard from './RelicCard';

function RelicSection({ activeCharacter }) {
  if (!activeCharacter) {
    return null;
  }

  return (
    <div className="relic-section box mt-5">
      <h3 className="title is-5 font-orbitron text-gold mb-4">Reliques d'équipement</h3>
      {activeCharacter.relics?.length > 0 ? (
        <div className="relic-scroll-container">
          {activeCharacter.relics.map((relic) => (
            <RelicCard key={relic.id || relic.name} relic={relic} />
          ))}
        </div>
      ) : (
        <p className="has-text-grey-light">Aucune relique détectée en vitrine.</p>
      )}
    </div>
  );
}

export default RelicSection;
