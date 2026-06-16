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
};

export default function SkillCard({ skill, charId }) {
  const [open, setOpen] = useState(false);
  const cfg = SKILL_TYPE_CONFIG[skill.type] || {
    label: skill.typeText || skill.type || "Aptitude",
    color: "#d8b467",
  };
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
            background: `${cfg.color}18`,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={getSkillIcon(charId, skill.type)}
            alt={skill.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p className="has-text-white is-size-6 has-text-weight-bold">
            {sanitizeName(skill.name)}
          </p>
          <span
            className="is-size-7 font-orbitron"
            style={{ color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>
        {hasDesc && <span style={{ color: "#666" }}>{open ? "▲" : "▼"}</span>}
      </div>

      {open && hasDesc && (
        <div
          style={{
            marginTop: "10px",
            paddingTop: "10px",
            borderTop: "1px dashed rgba(255,255,255,0.1)",
            fontSize: "0.75rem",
            color: "#c8c8c8",
          }}
        >
          {skill.isGrouped && skill.forms ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {skill.forms.map((form) => (
                <div key={form.id}>
                  <p style={{ color: cfg.color, fontWeight: "bold" }}>
                    {sanitizeName(form.name)}
                  </p>
                  <div>
                    {sanitizeAndFormatDescription(
                      form.description || form.simpleDesc,
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            sanitizeAndFormatDescription(skill.description || skill.simpleDesc)
          )}
        </div>
      )}
    </div>
  );
}
