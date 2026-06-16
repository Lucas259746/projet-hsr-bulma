import { useState } from "react";
import { getSkillIcon } from "../../imageMap/imageMap";
import {
  sanitizeName,
  sanitizeAndFormatDescription,
} from "../characterComp/CharacterDetails";

// Configuration esthétique (label français + couleur distinctive) par mot-clé d'aptitude fourni par le serveur
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

// Configuration des badges d'effets secondaires (mécanique de ciblage)
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

// Fonction utilitaire corrigeant une anomalie d'identifiant pour le Pionnier (Trailblazer Harmony ID override)
const getCharIdFromSkillId = (skillId, fallback) => {
  if (!skillId) return fallback;
  const s = String(skillId);
  if (s.startsWith("113")) return "1310"; // Force l'ID de base de l'avatar du Pionnier Harmonie
  return s.substring(0, 4); // Par défaut, les 4 premiers chiffres d'un ID d'aptitude forment l'ID du personnage lié
};

export default function SkillCard({ skill, charId }) {
  // État local déterminant si l'accordéon de description est déplié (true) ou replié (false)
  const [open, setOpen] = useState(false);

  // Recherche la config ou applique un modèle neutre générique
  const cfg = SKILL_TYPE_CONFIG[skill.type] || {
    label: skill.typeText || skill.type || "Aptitude",
    color: "#d8b467",
  };
  const effectBadge = skill.effect ? EFFECT_BADGES[skill.effect] : null;
  const resolvedCharId = getCharIdFromSkillId(skill.id, charId);
  const iconSrc = getSkillIcon(resolvedCharId, skill.type);
  const hasDesc = !!(skill.description || skill.simpleDesc); // Vérifie s'il y a de la matière à lire

  return (
    <div
      className="skill-card mb-2"
      style={{
        borderLeft: `3px solid ${cfg.color}`,
        padding: "10px 12px",
        cursor: hasDesc ? "pointer" : "default", // Curseur main cliquable uniquement s'il y a un texte caché
      }}
      onClick={() => hasDesc && setOpen((o) => !o)} // Bascule l'état ouvert/fermé au clic
    >
      <div className="is-flex is-align-items-center" style={{ gap: "10px" }}>
        {/* Cadre d'icône d'aptitude */}
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

        {/* Textes descriptifs courts : Titre, Label de type, Badge d'effet et Niveaux */}
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
            {/* Badge optionnel (ex: "AoE") */}
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
            {/* Niveau actuel / Niveau maximum supporté */}
            <span className="is-size-7 has-text-grey">
              Niv. {skill.level}
              {skill.maxLevel && (
                <span className="has-text-grey-light"> / {skill.maxLevel}</span>
              )}
            </span>
          </div>
        </div>

        {/* Petite flèche d'indication d'ouverture */}
        {hasDesc && (
          <span style={{ color: "#666", fontSize: "0.8rem", flexShrink: 0 }}>
            {open ? "▲" : "▼"}
          </span>
        )}
      </div>

      {/* BLOC DESCRIPTION DÉPLIABLE (S'affiche uniquement si open === true) */}
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
