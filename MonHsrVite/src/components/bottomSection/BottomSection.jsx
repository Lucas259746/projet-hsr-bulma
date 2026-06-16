import RelicCard from "../relicComp/RelicCard";
import SkillCard from "./SkillCard";
import SkillTreePanel from "./skillTreePanel/SkillTreePanel";
import useBottomSection from "./useBottomSection";

// Mini-composant affichant à droite les bonus d'ensemble activés (ex: Set 2 pièces, Set 4 pièces)
function RelicSetsPanel({ relicSets }) {
  if (!relicSets?.length) return null;
  return (
    <div className="mt-0">
      <h5 className="title is-6 font-orbitron has-text-gold mb-3">
        Bonus de Sets
      </h5>
      {relicSets.map((set) => (
        <div
          key={`${set.id}-${set.num}`}
          className="box has-background-black-bis p-3 mb-2"
          style={{ borderLeft: "3px solid #f29e38" }}
        >
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-1">
            <span className="has-text-white is-size-7 has-text-weight-bold">
              {set.name}
            </span>
            <span className="tag is-warning is-small">{set.num} pcs</span>
          </div>
          <p
            className="is-size-7 has-text-grey-lighter"
            style={{ lineHeight: "1.3" }}
          >
            {set.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BottomSection({ activeCharacter }) {
  // Déstructuration des variables et listes préparées par le Hook de logique useBottomSection
  const {
    activeTab,
    setActiveTab,
    tabs,
    mainSkills,
    memoSkills,
    specialSkills,
    relics,
    relicSets,
    skillTree,
  } = useBottomSection(activeCharacter);

  if (!activeCharacter) return null;

  return (
    <div className="box mt-4">
      {/* ── BARRE DE NAVIGATION DES ONGLETS ── */}
      <div className="bottom-tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-tab-btn${activeTab === tab.id ? " is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)} // Change l'onglet actif au clic
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── ZONE DE CONTENU DES ONGLETS ── */}
      <div className="bottom-tab-content">
        {/* ONGLET 1 : LES APTITUDES */}
        {activeTab === "skills" && (
          <div className="columns is-multiline">
            {/* 1. Compétences classiques */}
            {mainSkills.map((skill) => (
              <div
                key={skill.id}
                className="column is-half-tablet is-one-third-desktop"
              >
                <SkillCard skill={skill} charId={activeCharacter.id} />
              </div>
            ))}

            {/* 2. Invocations Mémo-sprites (S'il y en a) */}
            {memoSkills.length > 0 && (
              <>
                <div className="column is-12">
                  <div
                    className="is-size-7 font-orbitron has-text-grey my-1"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "10px",
                    }}
                  >
                    MÉMO-SPRITES
                  </div>
                </div>
                {memoSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="column is-half-tablet is-one-third-desktop"
                  >
                    <SkillCard skill={skill} charId={activeCharacter.id} />
                  </div>
                ))}
              </>
            )}

            {/* 3. Aptitudes spéciales de combat (S'il y en a) */}
            {specialSkills.length > 0 && (
              <>
                <div className="column is-12">
                  <div
                    className="is-size-7 font-orbitron has-text-grey my-1"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "10px",
                    }}
                  >
                    APTITUDES SPÉCIALES
                  </div>
                </div>
                {specialSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="column is-half-tablet is-one-third-desktop"
                  >
                    <SkillCard skill={skill} charId={activeCharacter.id} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ONGLET 2 : LES RELIQUES */}
        {activeTab === "relics" && (
          <div className="columns">
            {/* Grille principale listant les pièces d'équipement (Tête, Mains, Torse, Pieds...) */}
            <div className="column is-8">
              <div className="columns is-multiline">
                {relics.map((relic) => (
                  <div
                    key={relic.id || relic.name}
                    className="column is-half-tablet is-one-third-widescreen"
                  >
                    <RelicCard relic={relic} />
                  </div>
                ))}
              </div>
            </div>
            {/* Barre latérale droite compilant les bonus de panoplie */}
            <div className="column is-4">
              <RelicSetsPanel relicSets={relicSets} />
            </div>
          </div>
        )}

        {/* ONGLET 3 : L'ARBRE DES TRACES (SKILL TREE) */}
        {activeTab === "tree" && (
          <div className="columns">
            {/* L'Arbre SVG interactif complexe */}
            <div className="column is-8-desktop">
              <SkillTreePanel
                skillTree={skillTree}
                charId={activeCharacter.id}
                path={activeCharacter.path}
              />
            </div>
            {/* Légende explicative fixe sur le côté droit */}
            <div className="column is-4-desktop">
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,12,20,0.97) 0%, rgba(5,8,15,0.99) 100%)",
                  border: "1px solid rgba(216,180,103,0.15)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <p
                  className="font-orbitron mb-4"
                  style={{
                    fontSize: "0.62rem",
                    color: "#d8b467",
                    letterSpacing: "0.12em",
                  }}
                >
                  LÉGENDE
                </p>
                {[
                  {
                    color: "#e08c30",
                    label: "Attaque de base",
                    shape: "square",
                  },
                  { color: "#4fa3d1", label: "Compétence", shape: "square" },
                  { color: "#d4a0e0", label: "Ultime", shape: "square" },
                  { color: "#7ecba1", label: "Talent", shape: "square" },
                  { color: "#aaaaaa", label: "Technique", shape: "square" },
                  {
                    color: "#d8b467",
                    label: "Traces A2 / A4 / A6",
                    shape: "square",
                  },
                  { color: "#9b59b6", label: "Mémo-sprite", shape: "square" },
                  {
                    color: "#d8b467",
                    label: "Nœuds de statistiques",
                    shape: "circle",
                  },
                ].map(({ color, label, shape }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        flexShrink: 0,
                        borderRadius: shape === "circle" ? "50%" : "3px",
                        background: color + "30",
                        border: `1.5px solid ${color}`,
                        boxShadow: `0 0 4px ${color}44`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: "#a0a0a0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(216,180,103,0.1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.58rem",
                      color: "#444",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Nœuds transparents = non débloqués.
                    <br />
                    Les connexions principales varient selon la Voie du
                    personnage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
