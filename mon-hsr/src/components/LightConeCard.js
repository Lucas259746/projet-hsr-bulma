function LightConeCard({ lightCone }) {
  if (!lightCone) {
    return <p className="has-text-grey-light">Aucun cône de lumière équipé.</p>;
  }

  const lightconeImageMap = {
    "23024": {
      small: "PP_lightcone_acheron.webp",
      large: "lightcone_acheron.webp",
    },
  };
  const activeLightconeImages = lightconeImageMap[lightCone.id];

  return (
    <div className="lightcone-container">
      <div className="equipment-header mb-3">
        <div className={`equipment-icon-frame rarity-${lightCone.rarity || 3}`}>
          {activeLightconeImages?.small ? (
            <img
              src={`/lightcone-images/${activeLightconeImages.small}`}
              alt={`Icône ${lightCone.name}`}
            />
          ) : (
            <span>✦</span>
          )}
        </div>
        <div className="equipment-title-block">
          <h5 className="title is-5 mb-1 text-gold">{lightCone.name}</h5>
          <p className="subtitle is-6 has-text-warning mb-0 font-orbitron">{lightCone.path || 'Voie'}</p>
        </div>
      </div>

      <div className="columns is-mobile is-multiline is-gapless mt-3 lightcone-meta-box">
        <div className="column is-6">
          <span className="has-text-grey-light is-size-7">NIVEAU</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Lv. <span className="text-gold">{lightCone.level || 1}</span>
          </p>
        </div>
        <div className="column is-6 has-text-right">
          <span className="has-text-grey-light is-size-7">SUPERPOSITION</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Rang <span className="has-text-warning">{lightCone.superimposition || 1}</span>
          </p>
        </div>
      </div>
      {activeLightconeImages?.large && (
        <div className="lightcone-splash-box mt-4">
          <figure className="image">
            <img
              className="lightcone-splash-image"
              src={`/lightcone-images/${activeLightconeImages.large}`}
              alt={`Splash ${lightCone.name}`}
            />
          </figure>
        </div>
      )}
    </div>
  );
}

export default LightConeCard;
