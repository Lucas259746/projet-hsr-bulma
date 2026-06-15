// src/imageMap.js
// Centralise tous les chemins d'images — ajoute tes fichiers sous /public/images/
// puis renseigne les IDs ici.
//
// ── ARBORESCENCE ATTENDUE ──────────────────────────────────────────────────
// public/images/
//   characters/{id}/icon.webp        → petit avatar (liste / en-tête)
//   characters/{id}/splash.webp      → grand art
//   skills/{id}/basic_atk.webp
//   skills/{id}/skill.webp
//   skills/{id}/ultimate.webp
//   skills/{id}/talent.webp
//   skills/{id}/technique.webp
//   skills/{id}/skilltree1.webp      → trace A2
//   skills/{id}/skilltree2.webp      → trace A4
//   skills/{id}/skilltree3.webp      → trace A6
//   skills/{id}/memosprite_skill.webp   (si le perso a un mémo-sprite)
//   skills/{id}/memosprite_talent.webp
//   lightcones/{lcId}_icon.webp
//   lightcones/{lcId}_portrait.webp
// ──────────────────────────────────────────────────────────────────────────

export const CHARACTERS = {
  1308: {
    icon: "/images/characters/1308/icon.webp",
    splash: "/images/characters/1308/splash.webp",
  },
  1310: {
    icon: "./public/images/characters/1310-Firefly/icon.webp",
    splash: "./public/images/characters/1310-Firefly/splash.webp",
  },
  1406: {
    icon: "/images/characters/1406/icon.webp",
    splash: "/images/characters/1406/splash.webp",
  },
  1407: {
    icon: "/images/characters/1407/icon.webp",
    splash: "/images/characters/1407/splash.webp",
  },
  1409: {
    icon: "/images/characters/1409/icon.webp",
    splash: "/images/characters/1409/splash.webp",
  },
  1413: {
    icon: "/images/characters/1413/icon.webp",
    splash: "/images/characters/1413/splash.webp",
  },
  1415: {
    icon: "/images/characters/1415/icon.webp",
    splash: "/images/characters/1415/splash.webp",
  },
  //silver Wolf lvl999
  1506: {
    icon: "./public/images/characters/1506-SW999/icon.webp",
    splash: "./public/images/characters/1506-SW999/splash.webp",
  },
};

// Clés = type renvoyé par le serializer skill.js (skill.type brut)
// + types skill_tree : skill_basic, skill_skill, skill_ultra, skill_talent, skill_tech,
//                      trace_a2, trace_a4, trace_a6,
//                      memo_skill, memo_talent
export const SKILLS = {
  1308: {
    Normal: "/images/skills/1308/basic_atk.webp",
    BPSkill: "/images/skills/1308/skill.webp",
    Ultra: "/images/skills/1308/ultimate.webp",
    Talent: "/images/skills/1308/talent.webp",
    Maze: "/images/skills/1308/technique.webp",
    MazeNormal: "/images/skills/1308/basic_atk.webp",
    skill_basic: "/images/skills/1308/basic_atk.webp",
    skill_skill: "/images/skills/1308/skill.webp",
    skill_ultra: "/images/skills/1308/ultimate.webp",
    skill_talent: "/images/skills/1308/talent.webp",
    skill_tech: "/images/skills/1308/technique.webp",
    trace_a2: "/images/skills/1308/skilltree1.webp",
    trace_a4: "/images/skills/1308/skilltree2.webp",
    trace_a6: "/images/skills/1308/skilltree3.webp",
  },
  1310: {
    Normal: "/images/skills/1310/basic_atk.webp",
    BPSkill: "/images/skills/1310/skill.webp",
    Ultra: "/images/skills/1310/ultimate.webp",
    Talent: "/images/skills/1310/talent.webp",
    Maze: "/images/skills/1310/technique.webp",
    MazeNormal: "/images/skills/1310/basic_atk.webp",
    skill_basic: "/images/skills/1310/basic_atk.webp",
    skill_skill: "/images/skills/1310/skill.webp",
    skill_ultra: "/images/skills/1310/ultimate.webp",
    skill_talent: "/images/skills/1310/talent.webp",
    skill_tech: "/images/skills/1310/technique.webp",
    trace_a2: "/images/skills/1310/skilltree1.webp",
    trace_a4: "/images/skills/1310/skilltree2.webp",
    trace_a6: "/images/skills/1310/skilltree3.webp",
  },
  1406: {
    Normal: "/images/skills/1406/basic_atk.webp",
    BPSkill: "/images/skills/1406/skill.webp",
    Ultra: "/images/skills/1406/ultimate.webp",
    Talent: "/images/skills/1406/talent.webp",
    Maze: "/images/skills/1406/technique.webp",
    MazeNormal: "/images/skills/1406/basic_atk.webp",
    skill_basic: "/images/skills/1406/basic_atk.webp",
    skill_skill: "/images/skills/1406/skill.webp",
    skill_ultra: "/images/skills/1406/ultimate.webp",
    skill_talent: "/images/skills/1406/talent.webp",
    skill_tech: "/images/skills/1406/technique.webp",
    trace_a2: "/images/skills/1406/skilltree1.webp",
    trace_a4: "/images/skills/1406/skilltree2.webp",
    trace_a6: "/images/skills/1406/skilltree3.webp",
  },
  1407: {
    Normal: "/images/skills/1407/basic_atk.webp",
    BPSkill: "/images/skills/1407/skill.webp",
    Ultra: "/images/skills/1407/ultimate.webp",
    Talent: "/images/skills/1407/talent.webp",
    Maze: "/images/skills/1407/technique.webp",
    MazeNormal: "/images/skills/1407/basic_atk.webp",
    skill_basic: "/images/skills/1407/basic_atk.webp",
    skill_skill: "/images/skills/1407/skill.webp",
    skill_ultra: "/images/skills/1407/ultimate.webp",
    skill_talent: "/images/skills/1407/talent.webp",
    skill_tech: "/images/skills/1407/technique.webp",
    trace_a2: "/images/skills/1407/skilltree1.webp",
    trace_a4: "/images/skills/1407/skilltree2.webp",
    trace_a6: "/images/skills/1407/skilltree3.webp",
    memo_skill: "/images/skills/1407/memosprite_skill.webp",
    memo_talent: "/images/skills/1407/memosprite_talent.webp",
  },
  1409: {
    Normal: "/images/skills/1409/basic_atk.webp",
    BPSkill: "/images/skills/1409/skill.webp",
    Ultra: "/images/skills/1409/ultimate.webp",
    Talent: "/images/skills/1409/talent.webp",
    Maze: "/images/skills/1409/technique.webp",
    MazeNormal: "/images/skills/1409/basic_atk.webp",
    skill_basic: "/images/skills/1409/basic_atk.webp",
    skill_skill: "/images/skills/1409/skill.webp",
    skill_ultra: "/images/skills/1409/ultimate.webp",
    skill_talent: "/images/skills/1409/talent.webp",
    skill_tech: "/images/skills/1409/technique.webp",
    trace_a2: "/images/skills/1409/skilltree1.webp",
    trace_a4: "/images/skills/1409/skilltree2.webp",
    trace_a6: "/images/skills/1409/skilltree3.webp",
    memo_skill: "/images/skills/1409/memosprite_skill.webp",
    memo_talent: "/images/skills/1409/memosprite_talent.webp",
  },
  1413: {
    Normal: "/images/skills/1413/basic_atk.webp",
    BPSkill: "/images/skills/1413/skill.webp",
    Ultra: "/images/skills/1413/ultimate.webp",
    Talent: "/images/skills/1413/talent.webp",
    Maze: "/images/skills/1413/technique.webp",
    MazeNormal: "/images/skills/1413/basic_atk.webp",
    skill_basic: "/images/skills/1413/basic_atk.webp",
    skill_skill: "/images/skills/1413/skill.webp",
    skill_ultra: "/images/skills/1413/ultimate.webp",
    skill_talent: "/images/skills/1413/talent.webp",
    skill_tech: "/images/skills/1413/technique.webp",
    trace_a2: "/images/skills/1413/skilltree1.webp",
    trace_a4: "/images/skills/1413/skilltree2.webp",
    trace_a6: "/images/skills/1413/skilltree3.webp",
    memo_skill: "/images/skills/1413/memosprite_skill.webp",
    memo_talent: "/images/skills/1413/memosprite_talent.webp",
  },
  1415: {
    Normal: "/images/skills/1415/basic_atk.webp",
    BPSkill: "/images/skills/1415/skill.webp",
    Ultra: "/images/skills/1415/ultimate.webp",
    Talent: "/images/skills/1415/talent.webp",
    Maze: "/images/skills/1415/technique.webp",
    MazeNormal: "/images/skills/1415/basic_atk.webp",
    skill_basic: "/images/skills/1415/basic_atk.webp",
    skill_skill: "/images/skills/1415/skill.webp",
    skill_ultra: "/images/skills/1415/ultimate.webp",
    skill_talent: "/images/skills/1415/talent.webp",
    skill_tech: "/images/skills/1415/technique.webp",
    trace_a2: "/images/skills/1415/skilltree1.webp",
    trace_a4: "/images/skills/1415/skilltree2.webp",
    trace_a6: "/images/skills/1415/skilltree3.webp",
    memo_skill: "/images/skills/1415/memosprite_skill.webp",
    memo_talent: "/images/skills/1415/memosprite_talent.webp",
  },
  1506: {
    Normal: "/images/skills/1506/basic_atk.webp",
    BPSkill: "/images/skills/1506/skill.webp",
    Ultra: "/images/skills/1506/ultimate.webp",
    Talent: "/images/skills/1506/talent.webp",
    Maze: "/images/skills/1506/technique.webp",
    MazeNormal: "/images/skills/1506/basic_atk.webp",
    skill_basic: "/images/skills/1506/basic_atk.webp",
    skill_skill: "/images/skills/1506/skill.webp",
    skill_ultra: "/images/skills/1506/ultimate.webp",
    skill_talent: "/images/skills/1506/talent.webp",
    skill_tech: "/images/skills/1506/technique.webp",
    trace_a2: "/images/skills/1506/skilltree1.webp",
    trace_a4: "/images/skills/1506/skilltree2.webp",
    trace_a6: "/images/skills/1506/skilltree3.webp",
  },
};

export const LIGHT_CONES = {
  23024: {
    icon: "/images/lightcones/23024_icon.webp",
    portrait: "/images/lightcones/23024_portrait.webp",
  },
  23025: {
    icon: "/images/lightcones/23025_icon.webp",
    portrait: "/images/lightcones/23025_portrait.webp",
  },
  23040: {
    icon: "/images/lightcones/23040_icon.webp",
    portrait: "/images/lightcones/23040_portrait.webp",
  },
  23042: {
    icon: "/images/lightcones/23042_icon.webp",
    portrait: "/images/lightcones/23042_portrait.webp",
  },
  23043: {
    icon: "/images/lightcones/23043_icon.webp",
    portrait: "/images/lightcones/23043_portrait.webp",
  },
  23049: {
    icon: "/images/lightcones/23049_icon.webp",
    portrait: "/images/lightcones/23049_portrait.webp",
  },
  23052: {
    icon: "/images/lightcones/23052_icon.webp",
    portrait: "/images/lightcones/23052_portrait.webp",
  },
  23057: {
    icon: "/images/lightcones/23057_icon.webp",
    portrait: "/images/lightcones/23057_portrait.webp",
  },
};

export const getSkillIcon = (charId, type) =>
  charId && type ? (SKILLS[String(charId)]?.[type] ?? null) : null;
export const getLightConeImages = (lcId) =>
  lcId ? (LIGHT_CONES[String(lcId)] ?? null) : null;
export const getCharacterImages = (charId) =>
  charId ? (CHARACTERS[String(charId)] ?? null) : null;
