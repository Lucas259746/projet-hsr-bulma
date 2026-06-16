function RelicCard({ relic }) {
  // 🛡️ SÉCURITÉ : Si la variable d'entrée est indéfinie, on retourne 'null' pour que React ignore ce slot
  if (!relic) return null;

  return (
    <div className="box relic-box p-3 h-100">
      {/* ── LIGNE SUPÉRIEURE : Nom de l'artefact et niveau d'amélioration ── */}
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-1">
        <h5 className="title is-6 mb-0 has-text-gold">{relic.name}</h5>
        {/* Affichage du niveau de la relique précédé d'un '+' (ex: +15) */}
        <span className="tag is-warning is-small">+{relic.level}</span>
      </div>

      {/* Type de pièce (ex: Tête, Mains, Torse, Pieds, Sphère, Corde) */}
      <p className="is-size-7 has-text-grey-light mb-2">{relic.type}</p>

      {/* ── BLOC 1 : STATISTIQUE PRINCIPALE (MAIN STAT) ── */}
      {relic.mainStat && (
        <div className="relic-mainstat mb-2">
          <span className="has-text-grey-light is-size-7">
            Stat Principale :
          </span>
          <p className="is-size-6 has-text-white font-orbitron">
            {relic.mainStat.property} :{" "}
            <span className="has-text-gold">+{relic.mainStat.value}</span>
          </p>
        </div>
      )}

      {/* ── BLOC 2 : STATISTIQUES SECONDAIRES (SUBSTATS) ── */}
      {/* Le chaînage optionnel (?.) et la vérification '.length > 0' s'assurent qu'il y a des lignes à dessiner */}
      {relic.subStats?.length > 0 && (
        <div className="relic-substats pl-3 mt-3">
          {/* On itère sur le tableau des sous-statistiques. 'idx' sert de clé unique temporaire pour le moteur de rendu React */}
          {relic.subStats.map((sub, idx) => (
            <div
              key={idx}
              className="is-flex is-justify-content-space-between is-size-7 mb-1"
            >
              <span className="has-text-grey-light">{sub.property}</span>
              <span className="has-text-white font-orbitron">+{sub.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RelicCard;
