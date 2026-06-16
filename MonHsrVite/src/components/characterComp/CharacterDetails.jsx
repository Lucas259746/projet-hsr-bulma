import LightConeCard from "../lightConeComp/LightConeCard";
import { getLightConeDetails } from "../../imageMap/imageMap";
import useCharacterDetails, {
  sanitizeName,
  sanitizeAndFormatDescription,
  STAT_ICONS,
  STAT_COLORS,
} from "./useCharacterDetails";

// Sous-composant compact générant la liste stylisée des attributs du personnage
function StatsPanel({ stats }) {
  if (!stats?.length) {
    return <p className="has-text-grey-light is-size-7">Aucune statistique.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {stats.map((stat) => {
        const color = STAT_COLORS[stat.key] || "#d8b467"; // Récupère la couleur associée ou applique du doré par défaut
        return (
          <div
            key={stat.key}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(255,255,255,0.07)`,
              borderLeft: `3px solid ${color}`, // Bordure gauche colorée distinctive, style Honkai UI
              borderRadius: "7px",
              padding: "7px 10px",
            }}
          >
            {/* Ligne : Icône + Nom de la Stat + Valeur totale cumulée */}
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>
                {STAT_ICONS[stat.key] || "📊"}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: "0.68rem",
                  color: "#b3b3b3",
                  fontFamily: "Orbitron,sans-serif",
                  textTransform: "uppercase",
                }}
              >
                {stat.name}
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  fontFamily: "Orbitron,sans-serif",
                  color,
                }}
              >
                {stat.total}
              </span>
            </div>

            {/* Sous-ligne facultative : Décortique la statistique (Valeur Native de Base VS Apports des Équipements) */}
            {stat.base && stat.bonus && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  fontSize: "0.63rem",
                  color: "#666",
                  paddingLeft: "24px",
                  marginTop: "2px",
                }}
              >
                <span>
                  base <span style={{ color: "#aaa" }}>{stat.base}</span>
                </span>
                <span style={{ color: "#555" }}>+</span>
                <span>
                  équip. <span style={{ color: "#d8b467" }}>{stat.bonus}</span>
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CharacterDetails({ activeCharacter }) {
  // Consomme le Hook de logique
  const { hasCharacter, charImages } = useCharacterDetails(activeCharacter);

  const lcDetails = activeCharacter.lightCone
    ? getLightConeDetails(activeCharacter.lightCone.id)
    : null;

  // Sécurité : Si aucun personnage n'a été cliqué à gauche, affiche un message d'attente neutre
  if (!hasCharacter) {
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
        {/* ── SECTION EN-TÊTE (Avatar + Badges) ── */}
        <div className="columns is-vcentered mb-4 has-border-bottom-hsr pb-4">
          <div className="column is-narrow">
            {charImages?.icon ? (
              <figure className="image is-64x64">
                <img
                  src={charImages.icon}
                  alt={activeCharacter.name}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    width: "64px",
                    height: "64px",
                  }}
                />
              </figure>
            ) : (
              /* Fallback visuel avec étoiles si l'icône image est introuvable */
              <div
                className={`character-avatar-frame rarity-${activeCharacter.rarity || 5}`}
              >
                <span className="is-size-3">✦</span>
              </div>
            )}
          </div>
          <div className="column">
            <h1 className="title is-3 font-orbitron has-text-gold mb-1">
              {sanitizeName(activeCharacter.name)}
            </h1>
            {/* Ligne d'étiquettes (Badges d'informations) */}
            <div className="tags">
              <span className="tag is-dark font-orbitron">
                Niv. {activeCharacter.level}
              </span>
              <span className="tag is-warning font-orbitron">
                Éidolon {activeCharacter.eidolons}
              </span>
              <span className="tag is-black font-orbitron has-text-gold">
                {activeCharacter.path}
              </span>
              <span className="tag is-light font-orbitron">
                {activeCharacter.combatType}
              </span>
            </div>
          </div>
        </div>

        {/* ── SECTION BASSE (Panneau de Statistiques VS Bloc Cône de Lumière) ── */}
        <div className="columns">
          {/* Colonne Gauche : Liste des statistiques */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">
              Statistiques
            </h4>
            <StatsPanel stats={activeCharacter.stats} />
            {/* Passif déplacé ici */}
            <div className="mt-5 p-3 rounded has-border-left-hsr">
              <h4 className="title is-5 font-orbitron has-text-gold mb-3">
                Passif lightCone
              </h4>
              <h5 className="title is-6 has-text-gold">{lcDetails.pName}</h5>
              <p className="is-size-7 has-text-grey-lighter">
                {sanitizeAndFormatDescription(lcDetails.pDescription)}
              </p>
            </div>
          </div>

          {/* Colonne Droite : Cône de lumière équipé */}
          <div className="column is-6">
            <h4 className="title is-5 font-orbitron has-text-gold mb-3">
              Cône de lumière
            </h4>
            <div className="box equipment-box">
              <LightConeCard lightCone={activeCharacter.lightCone} />

              {/* 2. Bloc Histoire (Toujours présent) */}
              {activeCharacter.lightCone?.storyDescription && (
                <div className="mt-4 is-italic has-text-grey is-size-7">
                  <hr />
                  {activeCharacter.lightCone.storyDescription}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
export { sanitizeName, sanitizeAndFormatDescription };
