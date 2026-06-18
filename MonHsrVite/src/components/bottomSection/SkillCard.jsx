import {
  getSkillIcon,
  getSkillIconForForm,
} from "../../imageMap/characterMap/imageMap";
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
  MazeNormal: { label: "Technique", color: "#aaaaaa" },
  memo_skill: { label: "Mémo-sprite", color: "#9b59b6" },
  memo_talent: { label: "Mémo-sprite", color: "#9b59b6" },
};

// ── Bloc de description d'une forme (réutilisé dans SkillTreePanel aussi) ──
export function SkillForm({ form, charId, color, isFirst, formIndex = 0 }) {
  const cfg = SKILL_TYPE_CONFIG[form.type] || {
    label: form.typeText || form.type,
    color,
  };
  const remoteIcon = form.icon ? `https://api.mihomo.me/${form.icon}` : null;
  const localIcon = getSkillIconForForm(charId, form.type, formIndex);
  const iconSrc = localIcon || remoteIcon;

  return (
    <div
      style={{
        paddingTop: isFirst ? 0 : "14px",
        marginTop: isFirst ? 0 : "14px",
        borderTop: isFirst ? "none" : "1px dashed rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        {iconSrc && (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "7px",
              background: `${cfg.color}18`,
              border: `1.5px solid ${cfg.color}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={iconSrc}
              alt={form.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: cfg.color,
                fontSize: "0.78rem",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {sanitizeName(form.name)}
            </span>
            {form.effect_text && (
              <span
                style={{
                  padding: "1px 6px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#888",
                  fontSize: "0.55rem",
                  fontFamily: "Orbitron, sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                {form.effect_text}
              </span>
            )}
          </div>
          <div
            style={{
              color: "#666",
              fontSize: "0.6rem",
              fontFamily: "Orbitron, sans-serif",
              marginTop: "2px",
            }}
          >
            Niv. {form.level} / {form.maxLevel}
          </div>
        </div>
      </div>
      {(() => {
        const desc = form.description || form.simpleDesc || "";
        const isHtml = /<[a-z][\s\S]*>/i.test(desc);
        return (
          <div
            style={{ fontSize: "0.72rem", lineHeight: "1.65", color: "#c0c0c0", fontFamily: "Inter, sans-serif" }}
            {...(isHtml ? { dangerouslySetInnerHTML: { __html: desc } } : {})}
          >
            {isHtml ? null : sanitizeAndFormatDescription(desc)}
          </div>
        );
      })()}
    </div>
  );
}

// ── Carte cliquable dans la colonne gauche ──
// Plus de dépliage inline : la sélection est gérée par le parent (BottomSection)
export default function SkillCard({ skill, charId, isSelected, onClick }) {
  const cfg = SKILL_TYPE_CONFIG[skill.type] || {
    label: skill.typeText || skill.type || "Aptitude",
    color: "#d8b467",
  };

  return (
    <div
      onClick={onClick}
      style={{
        borderLeft: `3px solid ${cfg.color}`,
        padding: "10px 12px",
        cursor: "pointer",
        marginBottom: "6px",
        borderRadius: "0 6px 6px 0",
        background: isSelected
          ? `linear-gradient(90deg, ${cfg.color}18 0%, rgba(0,0,0,0.2) 100%)`
          : "rgba(255,255,255,0.02)",
        outline: isSelected
          ? `1px solid ${cfg.color}44`
          : "1px solid transparent",
        transition: "background 0.15s, outline 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: `${cfg.color}18`,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={getSkillIcon(charId, skill.type)}
            alt={skill.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 700,
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {sanitizeName(skill.name)}
          </p>
          <span
            style={{
              color: cfg.color,
              fontSize: "0.6rem",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            {cfg.label}
          </span>
        </div>
        <span style={{ color: cfg.color, fontSize: "0.6rem", opacity: 0.6 }}>
          ›
        </span>
      </div>
    </div>
  );
}
