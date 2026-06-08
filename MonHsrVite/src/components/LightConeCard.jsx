function LightConeCard({ lightCone }) {
  if (!lightCone) {
    return <p className="has-text-grey-light">Aucun cône de lumière équipé.</p>;
  }

  return (
    <div className="lightcone-container">
      <div className="is-flex is-align-items-center mb-3">
        {/* Icône petite format */}
        <div className={`equipment-icon-frame rarity-${lightCone.rarity || 3}`}>
          {lightCone.icon ? (
            <img
              src={lightCone.icon}
              alt={lightCone.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>✦</span>
          )}
        </div>
        <div className="ml-3">
          <h5 className="title is-5 mb-1 has-text-gold">{lightCone.name}</h5>
          <p className="subtitle is-6 has-text-warning mb-0 mt-1 font-orbitron">
            {lightCone.path || "Voie"}
          </p>
        </div>
      </div>

      <div className="columns is-mobile is-multiline is-gapless mt-3 lightcone-meta-box">
        <div className="column is-6">
          <span className="has-text-grey-light is-size-7">NIVEAU</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Lv. <span className="has-text-gold">{lightCone.level || 1}</span>
          </p>
        </div>
        <div className="column is-6 has-text-right">
          <span className="has-text-grey-light is-size-7">SUPERPOSITION</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Rang <span className="has-text-warning">{lightCone.superimposition || 1}</span>
          </p>
        </div>
      </div>

      {/* Portrait grand format */}
      {lightCone.portrait && (
        <div className="lightcone-splash-box mt-4">
          <figure className="image">
            <img
              className="lightcone-splash-image"
              src={lightCone.portrait}
              alt={`Splash ${lightCone.name}`}
              style={{ borderRadius: "8px", width: "100%", objectFit: "cover" }}
            />
          </figure>
        </div>
      )}
    </div>
  );
}

export default LightConeCard;
