import { useState } from "react";
import { getSkillIcon } from "../../imageMap/imageMap";
import {
  sanitizeName,
  sanitizeAndFormatDescription,
} from "../characterComp/CharacterDetails";

const SKILL_TYPE_CONFIG = {
  Normal: { label: "Attaque de base", color: "#e08c30" },
  BPSkill: { label: "Compétence", color: "#4fa3d1" },
  Ultra: { label: "Ultime", color: "#d4a0e0" },
  Talent: { label: "Talent", color: "#7ecba1" },
  Maze: { label: "Technique", color: "#aaaaaa" },
  MazeNormal: { label: "Attaque labyrinthe", color: "#666666" },
  ElationDamage: { label: "Compétence Allégresse", color: "#f4d258" },
  memo_skill: { label: "Compétence mémo", color: "#9b59b6" },
  memo_talent: { label: "Talent mémo", color: "#c39bd3" },
};

const EFFECT_BADGES = {
  Summon: { label: "Invocation", color: "#9b59b6" },
  Support: { label: "Support", color: "#27ae60" },
  Enhance: { label: "Amélioration", color: "#e67e22" },
  Restore: { label: "Restauration", color: "#1abc9c" },
  AoEAttack: { label: "AoE", color: "#e74c3c" },
  SingleAttack: { label: "Mono", color: "#c0392b" },
  Blast: { label: "Zone", color: "#e74c3c" },
  Bounce: { label: "Rebond", color: "#e74c3c" },
  MazeAttack: { label: "Attaque", color: "#c0392b" },
  Defence: { label: "Défense", color: "#3498db" },
};

const getCharIdFromSkillId = (skillId, fallback) => {
  if (!skillId) return fallback;
  const s = String(skillId);
  if (s.startsWith("113")) return "1310";
  return s.substring(0, 4);
};

export default function SkillCard({ skill, charId }) {
  const [open, setOpen] = useState(false);
  const cfg = SKILL_TYPE_CONFIG[skill.type] || {
    label: skill.typeText || skill.type || "Aptitude",
    color: "#d8b467",
  };
  const effectBadge = skill.effect ? EFFECT_BADGES[skill.effect] : null;
  const resolvedCharId = getCharIdFromSkillId(skill.id, charId);
  const iconSrc = getSkillIcon(resolvedCharId, skill.type);
  const hasDesc = !!(skill.description || skill.simpleDesc);

  return (
    <div
      className="skill-card mb-2"
      style={{
        borderLeft: `3px solid ${cfg.color}`,
        padding: "10px 12px",
        cursor: hasDesc ? "pointer" : "default",
      }}
      onClick={() => hasDesc && setOpen((o) => !o)}
    >
      <div className="is-flex is-align-items-center" style={{ gap: "10px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            background: `${cfg.color}18`,
            borderRadius: "6px",
            border: `1px solid ${cfg.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {iconSrc ? (
            <img
              src={iconSrc}
              alt={skill.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontSize: "1.1rem", color: cfg.color }}>✦</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="has-text-white is-size-6 has-text-weight-bold"
            style={{ lineHeight: 1.2 }}
          >
            {sanitizeName(skill.name)}
          </p>
          <div
            className="is-flex is-align-items-center mt-1"
            style={{ gap: "6px", flexWrap: "wrap" }}
          >
            <span
              className="is-size-7 font-orbitron"
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </span>
            {effectBadge && (
              <span
                className="tag is-small"
                style={{
                  background: `${effectBadge.color}22`,
                  border: `1px solid ${effectBadge.color}66`,
                  color: effectBadge.color,
                  fontSize: "0.6rem",
                  height: "18px",
                  padding: "0 6px",
                }}
              >
                {effectBadge.label}
              </span>
            )}
            <span className="is-size-7 has-text-grey">
              Niv. {skill.level}
              {skill.maxLevel && (
                <span className="has-text-grey-light"> / {skill.maxLevel}</span>
              )}
            </span>
          </div>
        </div>
        {hasDesc && (
          <span style={{ color: "#666", fontSize: "0.8rem", flexShrink: 0 }}>
            {open ? "▲" : "▼"}
          </span>
        )}
      </div>

      {open && hasDesc && (
        <div
          style={{
            marginTop: "10px",
            paddingTop: "10px",
            borderTop: "1px dashed rgba(255,255,255,0.1)",
            fontSize: "0.75rem",
            lineHeight: "1.6",
            color: "#c8c8c8",
          }}
        >
          {sanitizeAndFormatDescription(skill.description || skill.simpleDesc)}
        </div>
      )}
    </div>
  );
}
