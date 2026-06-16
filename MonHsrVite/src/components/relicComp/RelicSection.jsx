import RelicCard from "./RelicCard";
import CharacterStats from "../characterComp/CharacterStats";

function RelicSection({ activeCharacter }) {
  // 🛡️ SÉCURITÉ : Interrompt le rendu si aucun personnage n'est sélectionné dans l'état global
  if (!activeCharacter) return null;

  // Extraction sécurisée des bonus d'ensemble de panoplies (ex: Set 4 pièces "Mousquetaire")
  const relicSets = activeCharacter.relicSets || [];

  return (
    <div className="relic-section box mt-5">
      <div className="columns is-desktop">
        {/* ── COLONNE GAUCHE (Étroite - 1/3) : Statistiques cumuleés & Bonus d'ensembles ── */}
        <div className="column is-4-desktop">
          {/* Rendu du composant tiers affichant le grand tableau récapitulatif des stats */}
          <CharacterStats stats={activeCharacter.stats} />

          {/* Affichage conditionnel des lignes de bonus de set d'artefacts */}
          {relicSets.length > 0 && (
            <div className="mt-4">
              <h4 className="title is-6 font-orbitron has-text-gold mb-3">
                Bonus de Sets
              </h4>
              {relicSets.map((set) => (
                <div
                  key={`${set.id}-${set.num}`} // Combinaison ID + Nombre de pièces pour garantir l'unicité de la clé React
                  className="box has-background-black-bis p-3 mb-2"
                  style={{ borderLeft: "3px solid #f29e38" }} // Rappel visuel orange (style UI officielle de Star Rail)
                >
                  <div className="is-flex is-justify-content-space-between is-align-items-center mb-1">
                    <span className="has-text-white is-size-7 has-text-weight-bold">
                      {set.name}
                    </span>
                    <span className="tag is-warning is-small">
                      {set.num} pcs{" "}
                      {/* Affiche s'il s'agit du palier 2 pièces ou 4 pièces */}
                    </span>
                  </div>
                  <p
                    className="is-size-7 has-text-grey-lighter"
                    style={{ lineHeight: "1.3" }}
                  >
                    {set.desc}{" "}
                    {/* Descriptif complet des effets bonus octroyés */}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── COLONNE DROITE (Large - 2/3) : La Grille de Cartes d'Artefacts ── */}
        <div className="column is-8-desktop">
          <h3 className="title is-5 font-orbitron has-text-gold mb-4">
            Reliques d'équipement
          </h3>
          {/* 'is-multiline' permet aux cartes de passer à la ligne suivante selon la taille de l'écran */}
          <div className="columns is-multiline">
            {activeCharacter.relics?.map((relic) => (
              <div
                key={relic.id || relic.name}
                // Gestion fine du responsive (1 carte par ligne sur mobile, 2 sur tablette, 3 sur grand écran)
                className="column is-half-tablet is-one-third-widescreen"
              >
                {/* Injection de la structure de donnée propre de la relique dans sa carte d'affichage */}
                <RelicCard relic={relic} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelicSection;
