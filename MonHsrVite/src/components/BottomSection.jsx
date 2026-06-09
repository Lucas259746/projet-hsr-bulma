import { useState } from "react";
import RelicCard from "./RelicCard";
import { getSkillIcon } from "../imageMap";
import { sanitizeName, sanitizeAndFormatDescription } from "./CharacterDetails";

// ── Config types de skills ────────────────────────────────────────────────────
const SKILL_TYPE_CONFIG = {
  Normal:        { label: "Attaque de base",       color: "#e08c30" },
  BPSkill:       { label: "Compétence",            color: "#4fa3d1" },
  Ultra:         { label: "Ultime",                color: "#d4a0e0" },
  Talent:        { label: "Talent",                color: "#7ecba1" },
  Maze:          { label: "Technique",             color: "#aaaaaa" },
  MazeNormal:    { label: "Attaque labyrinthe",    color: "#666666" },
  ElationDamage: { label: "Compétence Allégresse", color: "#f4d258" },
};

const EFFECT_BADGES = {
  Summon:       { label: "Invocation",   color: "#9b59b6" },
  Support:      { label: "Support",      color: "#27ae60" },
  Enhance:      { label: "Amélioration", color: "#e67e22" },
  Restore:      { label: "Restauration", color: "#1abc9c" },
  AoEAttack:    { label: "AoE",          color: "#e74c3c" },
  SingleAttack: { label: "Mono",         color: "#c0392b" },
  Blast:        { label: "Zone",         color: "#e74c3c" },
  Bounce:       { label: "Rebond",       color: "#e74c3c" },
  MazeAttack:   { label: "Attaque",      color: "#c0392b" },
  Defence:      { label: "Défense",      color: "#3498db" },
};

const getCharIdFromSkillId = (skillId, fallback) => {
  if (!skillId) return fallback;
  const s = String(skillId);
  if (s.startsWith("113")) return "1310";
  return s.substring(0, 4);
};

// ── Skill Card ────────────────────────────────────────────────────────────────
function SkillCard({ skill, charId }) {
  const cfg = SKILL_TYPE_CONFIG[skill.type] || { label: skill.typeText || skill.type || "Aptitude", color: "#d8b467" };
  const effectBadge = skill.effect ? EFFECT_BADGES[skill.effect] : null;
  const resolvedCharId = getCharIdFromSkillId(skill.id, charId);
  const iconSrc = getSkillIcon(resolvedCharId, skill.type);

  return (
    <div className="skill-card mb-2" style={{ borderLeft:`3px solid ${cfg.color}`, padding:"10px 12px" }}>
      <div className="is-flex is-align-items-center" style={{ gap:"10px" }}>
        <div style={{
          width:"40px", height:"40px", flexShrink:0,
          background:`${cfg.color}18`, borderRadius:"6px", border:`1px solid ${cfg.color}44`,
          display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
        }}>
          {iconSrc
            ? <img src={iconSrc} alt={skill.name} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
            : <span style={{ fontSize:"1.1rem", color:cfg.color }}>✦</span>
          }
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p className="has-text-white is-size-6 has-text-weight-bold" style={{ lineHeight:1.2 }}>
            {sanitizeName(skill.name)}
          </p>
          <div className="is-flex is-align-items-center mt-1" style={{ gap:"6px", flexWrap:"wrap" }}>
            <span className="is-size-7 font-orbitron" style={{ color:cfg.color }}>{cfg.label}</span>
            {effectBadge && (
              <span className="tag is-small" style={{
                background:`${effectBadge.color}22`, border:`1px solid ${effectBadge.color}66`,
                color:effectBadge.color, fontSize:"0.6rem", height:"18px", padding:"0 6px",
              }}>{effectBadge.label}</span>
            )}
            <span className="is-size-7 has-text-grey">
              Niv. {skill.level}
              {skill.maxLevel && <span className="has-text-grey-light"> / {skill.maxLevel}</span>}
            </span>
          </div>
        </div>
      </div>
      {(skill.description || skill.simpleDesc) && (
        <div className="skill-desc">
          {sanitizeAndFormatDescription(skill.description || skill.simpleDesc)}
        </div>
      )}
    </div>
  );
}

// ── Memosprite Card ───────────────────────────────────────────────────────────
const MEMO_CONFIG = {
  memosprite_skill:  { label: "Compétence mémo",   color: "#9b59b6" },
  memosprite_talent: { label: "Talent mémo",        color: "#c39bd3" },
  memosprite:        { label: "Mémo-sprite",        color: "#9b59b6" },
};

function MemosCard({ memo }) {
  const cfg = MEMO_CONFIG[memo.type] || MEMO_CONFIG.memosprite;
  const iconSrc = getSkillIcon(memo.charId, memo.type);

  return (
    <div className="skill-card mb-2" style={{ borderLeft:`3px solid ${cfg.color}`, padding:"10px 12px" }}>
      <div className="is-flex is-align-items-center" style={{ gap:"10px" }}>
        <div style={{
          width:"40px", height:"40px", flexShrink:0,
          background:`${cfg.color}18`, borderRadius:"6px", border:`1px solid ${cfg.color}44`,
          display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
        }}>
          {iconSrc
            ? <img src={iconSrc} alt={cfg.label} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
            : <span style={{ fontSize:"1.4rem", color:cfg.color }}>✦</span>
          }
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p className="has-text-white is-size-6 has-text-weight-bold" style={{ lineHeight:1.2 }}>{cfg.label}</p>
          <div className="is-flex is-align-items-center mt-1" style={{ gap:"6px" }}>
            <span className="memo-badge">mémo-sprite</span>
            <span className="is-size-7 has-text-grey">
              Niv. {memo.level}
              {memo.maxLevel && <span className="has-text-grey-light"> / {memo.maxLevel}</span>}
            </span>
          </div>
        </div>
      </div>
      <p className="is-size-7 has-text-grey mt-2" style={{ fontStyle:"italic" }}>
        Description non disponible via l'API Mihomo.
      </p>
    </div>
  );
}

// ── Section Bonus de Sets ─────────────────────────────────────────────────────
function RelicSetsPanel({ relicSets }) {
  if (!relicSets?.length) return null;
  return (
    <div className="mt-4">
      <h5 className="title is-6 font-orbitron has-text-gold mb-3">Bonus de Sets</h5>
      {relicSets.map(set => (
        <div key={`${set.id}-${set.num}`} className="box has-background-black-bis p-3 mb-2"
          style={{ borderLeft:"3px solid #f29e38" }}>
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-1">
            <span className="has-text-white is-size-7 has-text-weight-bold">{set.name}</span>
            <span className="tag is-warning is-small">{set.num} pcs</span>
          </div>
          <p className="is-size-7 has-text-grey-lighter" style={{ lineHeight:"1.3" }}>{set.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ── Section principale avec onglets ──────────────────────────────────────────
const MAIN_TYPES  = new Set(["Normal","BPSkill","Ultra","Talent","Maze","MazeNormal"]);
const SPECIAL_TYPES = new Set(["ElationDamage"]);
const TYPE_ORDER  = ["Normal","BPSkill","Ultra","Talent","Maze","MazeNormal"];

export default function BottomSection({ activeCharacter }) {
  const [activeTab, setActiveTab] = useState("skills");

  if (!activeCharacter) return null;

  const allSkills     = activeCharacter.skills     || [];
  const memosprites   = activeCharacter.memosprites || [];
  const relics        = activeCharacter.relics      || [];
  const relicSets     = activeCharacter.relicSets   || [];

  const mainSkills    = TYPE_ORDER.flatMap(t => allSkills.filter(s => s.type === t));
  const specialSkills = allSkills.filter(s => SPECIAL_TYPES.has(s.type) || (!MAIN_TYPES.has(s.type) && !SPECIAL_TYPES.has(s.type)));

  const hasMemo = memosprites.length > 0;

  const tabs = [
    { id: "skills",   label: "Aptitudes" },
    { id: "relics",   label: "Reliques" },
    ...(hasMemo ? [{ id: "memo", label: "Mémo-sprites" }] : []),
  ];

  return (
    <div className="box mt-4">
      {/* Navigation onglets */}
      <div className="bottom-tabs-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`bottom-tab-btn${activeTab === tab.id ? " is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === "memo" && (
              <span className="memo-badge ml-2" style={{ verticalAlign:"middle" }}>
                {memosprites.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="bottom-tab-content">

        {/* ── Aptitudes ── */}
        {activeTab === "skills" && (
          <div className="columns is-multiline">
            <div className="column is-12">
              <div className="columns is-multiline">
                {mainSkills.map(skill => (
                  <div key={skill.id} className="column is-half-tablet is-one-third-desktop">
                    <SkillCard skill={skill} charId={activeCharacter.id} />
                  </div>
                ))}
              </div>
              {specialSkills.length > 0 && (
                <>
                  <div className="is-size-7 font-orbitron has-text-grey mt-3 mb-2"
                    style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"10px", letterSpacing:"0.08em" }}>
                    APTITUDES SPÉCIALES
                  </div>
                  <div className="columns is-multiline">
                    {specialSkills.map(skill => (
                      <div key={skill.id} className="column is-half-tablet is-one-third-desktop">
                        <SkillCard skill={skill} charId={activeCharacter.id} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Reliques ── */}
        {activeTab === "relics" && (
          <div className="columns">
            <div className="column is-8">
              <div className="columns is-multiline">
                {relics.map(relic => (
                  <div key={relic.id || relic.name} className="column is-half-tablet is-one-third-widescreen">
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

        {/* ── Mémo-sprites ── */}
        {activeTab === "memo" && (
          <div>
            <p className="is-size-7 has-text-grey mb-4" style={{ fontStyle:"italic" }}>
              Les descriptions des mémo-sprites ne sont pas fournies par l'API Mihomo.
              Ajoute leurs icônes dans <code>imageMap.js</code> avec les types
              <code> memosprite_skill</code> et <code> memosprite_talent</code>.
            </p>
            <div className="columns is-multiline">
              {memosprites.map(memo => (
                <div key={memo.id} className="column is-half-tablet is-one-third-desktop">
                  <MemosCard memo={memo} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
