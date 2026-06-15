import { useState } from "react";
import RelicCard from "../relicComp/RelicCard";
import SkillCard from "./SkillCard";
import SkillTreePanel from "./SkillTreePanel";

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

const MAIN_TYPES = new Set([
  "Normal",
  "BPSkill",
  "Ultra",
  "Talent",
  "Maze",
  "MazeNormal",
]);
const MEMO_TYPES = new Set(["memo_skill", "memo_talent"]);
const SPECIAL_TYPES = new Set(["ElationDamage"]);
const TYPE_ORDER = [
  "Normal",
  "BPSkill",
  "Ultra",
  "Talent",
  "Maze",
  "MazeNormal",
];

export default function BottomSection({ activeCharacter }) {
  const [activeTab, setActiveTab] = useState("skills");

  if (!activeCharacter) return null;

  const allSkills = activeCharacter.skills || [];
  const relics = activeCharacter.relics || [];
  const relicSets = activeCharacter.relicSets || [];
  const skillTree = activeCharacter.skillTree || [];

  const memoSkills = skillTree
    .filter((n) => MEMO_TYPES.has(n.type))
    .map((n) => ({
      id: n.id,
      name:
        n.name ||
        (n.type === "memo_skill"
          ? "Compétence mémo-sprite"
          : "Talent mémo-sprite"),
      type: n.type,
      typeText: n.type,
      effect: null,
      level: n.level,
      maxLevel: n.maxLevel,
      description: n.description || "",
      simpleDesc: "",
    }));

  const mainSkills = TYPE_ORDER.flatMap((t) =>
    allSkills.filter((s) => s.type === t),
  );
  const specialSkills = allSkills.filter(
    (s) =>
      SPECIAL_TYPES.has(s.type) ||
      (!MAIN_TYPES.has(s.type) && !SPECIAL_TYPES.has(s.type)),
  );

  const tabs = [
    { id: "skills", label: "Aptitudes" },
    { id: "relics", label: "Reliques" },
    { id: "tree", label: "Skill Tree" },
  ];

  return (
    <div className="box mt-4">
      <div className="bottom-tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-tab-btn${activeTab === tab.id ? " is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bottom-tab-content">
        {activeTab === "skills" && (
          <div className="columns is-multiline">
            {mainSkills.map((skill) => (
              <div
                key={skill.id}
                className="column is-half-tablet is-one-third-desktop"
              >
                <SkillCard skill={skill} charId={activeCharacter.id} />
              </div>
            ))}
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

        {activeTab === "relics" && (
          <div className="columns">
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
            <div className="column is-4">
              <RelicSetsPanel relicSets={relicSets} />
            </div>
          </div>
        )}

        {activeTab === "tree" && (
          <div className="columns">
            <div className="column is-8-desktop">
              {/* Correction ici : Envoi du path de l'activeCharacter */}
              <SkillTreePanel
                skillTree={skillTree}
                charId={activeCharacter.id}
                path={activeCharacter.path}
              />
            </div>
            <div className="column is-4-desktop">
              <div style={{
                background: "linear-gradient(180deg, rgba(8,12,20,0.97) 0%, rgba(5,8,15,0.99) 100%)",
                border: "1px solid rgba(216,180,103,0.15)",
                borderRadius: "14px",
                padding: "18px",
              }}>
                <p className="font-orbitron mb-4" style={{ fontSize: "0.62rem", color: "#d8b467", letterSpacing: "0.12em" }}>
                  LÉGENDE
                </p>
                {[
                  { color: "#e08c30", label: "Attaque de base",       shape: "square" },
                  { color: "#4fa3d1", label: "Compétence",            shape: "square" },
                  { color: "#d4a0e0", label: "Ultime",                shape: "square" },
                  { color: "#7ecba1", label: "Talent",                shape: "square" },
                  { color: "#aaaaaa", label: "Technique",             shape: "square" },
                  { color: "#d8b467", label: "Traces A2 / A4 / A6",  shape: "square" },
                  { color: "#9b59b6", label: "Mémo-sprite",           shape: "square" },
                  { color: "#d8b467", label: "Nœuds de statistiques", shape: "circle" },
                ].map(({ color, label, shape }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{
                      width: "11px", height: "11px", flexShrink: 0,
                      borderRadius: shape === "circle" ? "50%" : "3px",
                      background: color + "30",
                      border: `1.5px solid ${color}`,
                      boxShadow: `0 0 4px ${color}44`,
                    }} />
                    <span style={{ fontSize: "0.68rem", color: "#a0a0a0", fontFamily: "Inter, sans-serif" }}>
                      {label}
                    </span>
                  </div>
                ))}
                <div style={{
                  marginTop: "14px", paddingTop: "12px",
                  borderTop: "1px solid rgba(216,180,103,0.1)",
                }}>
                  <p style={{ fontSize: "0.58rem", color: "#444", fontStyle: "italic", lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
                    Nœuds transparents = non débloqués.<br />
                    Les connexions principales varient selon la Voie du personnage.
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
