import { getLightConeImages } from "../../imageMap/lightconeMap/imageMap";

function LightConeCard({ lightCone }) {
  // 🛡️ SÉCURITÉ API : Si le personnage n'a pas de cône équipé (cas rare mais possible),
  // on interrompt le rendu pour éviter que l'application ne plante (évite le crash "Cannot read properties of undefined")
  if (!lightCone) {
    return <p className="has-text-grey-light">Aucun cône de lumière équipé.</p>;
  }

  // 🔍 RÉCUPÉRATION DES ASSETS : On interroge notre dictionnaire d'images local avec l'ID unique du Cône.
  // Cela renvoie un objet contenant les liens vers l'icône carrée et le portrait vertical (Splash art).
  const images = getLightConeImages(lightCone.id);

  return (
    <div className="lightcone-container">
      {/* ── EN-TÊTE : Icône de rareté, Nom et Voie du Cône ── */}
      <div className="is-flex is-align-items-center mb-3">
        {/* Rareté dynamique : On injecte la rareté dans la classe CSS (ex: rarity-5, rarity-4).
            Le fallback "|| 3" garantit une classe par défaut si l'API omet de spécifier la rareté. */}
        <div className={`equipment-icon-frame rarity-${lightCone.rarity || 3}`}>
          {images?.icon ? (
            <img
              src={images.icon}
              alt={lightCone.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 'objectFit: cover' évite la distorsion de l'image
            />
          ) : (
            // Fallback textuel : si l'image locale est manquante, on affiche un symbole neutre pour ne pas laisser un carré vide
            <span>✦</span>
          )}
        </div>

        {/* Textes descriptifs adjacents à l'icône */}
        <div className="ml-3">
          <h5 className="title is-5 mb-1 has-text-gold">{lightCone.name}</h5>
          <p className="subtitle is-6 has-text-warning mb-0 mt-1 font-orbitron">
            {lightCone.path || "Voie"}{" "}
            {/* Fallback si la chaîne de caractères de la Voie est vide */}
          </p>
        </div>
      </div>

      {/* ── STATISTIQUES NUMÉRIQUES : Niveau & Rang de Superposition ── */}
      {/* 'is-mobile' force le maintien des deux colonnes même sur petit écran (évite le saut de ligne disgracieux) */}
      <div className="columns is-mobile is-multiline is-gapless mt-3 lightcone-meta-box">
        {/* Niveau actuel du Cône */}
        <div className="column is-6">
          <span className="has-text-grey-light is-size-7">NIVEAU</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Lv. <span className="has-text-gold">{lightCone.level || 1}</span>
          </p>
        </div>

        {/* Rang de Superposition (Superimposition de 1 à 5) */}
        <div className="column is-6 has-text-right">
          <span className="has-text-grey-light is-size-7">SUPERPOSITION</span>
          <p className="is-size-6 has-text-white font-orbitron">
            Rang{" "}
            <span className="has-text-warning">
              {lightCone.superimposition || 1}
            </span>
          </p>
        </div>
      </div>

      {/* ── SPLASH ART (PORTRAIT HD) ── */}
      {/* Utilisation du court-circuit logique (&&) : si 'images.portrait' n'existe pas dans notre 
          base locale, ce bloc HTML complet est purement ignoré plutôt que d'afficher une image brisée */}
      {images?.portrait && (
        <div className="lightcone-splash-box mt-4">
          <figure className="image">
            <img
              className="lightcone-splash-image"
              src={images.portrait}
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
