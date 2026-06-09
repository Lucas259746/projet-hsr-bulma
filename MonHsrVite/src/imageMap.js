// src/imageMap.js
//
// Centralize all image paths here.
// Add your images under /public/ and reference them by ID.
//
// ── HOW TO ADD A NEW CHARACTER ──────────────────────────────────────────────
// 1. Drop your images in /public/images/characters/{id}/
// 2. Add an entry in CHARACTERS with the character's numeric id
// 3. Drop skill images in /public/images/skills/{id}/
//    with filenames: basic_atk, skill, ultimate, talent, technique  (.webp/.png)
// 4. Drop the light cone images in /public/images/lightcones/
//    with filenames: {lcId}_icon and {lcId}_portrait  (.webp/.png)
// ────────────────────────────────────────────────────────────────────────────

// ── CHARACTER PORTRAITS ──────────────────────────────────────────────────────
// Each entry: { icon, splash }
// icon    → small square used in lists / headers
// splash  → full art used as background or large display
export const CHARACTERS = {
  // 1308: Acheron
  1308: {
    icon: "/images/characters/1308/icon.webp",
    splash: "/images/characters/1308/splash.webp",
  },
  // 1310: Firefly
  1310: {
    icon: "/images/characters/1310/icon.webp",
    splash: "/images/characters/1310/splash.webp",
  },
  // 1406: Cipher
  1406: {
    icon: "/images/characters/1406/icon.webp",
    splash: "/images/characters/1406/splash.webp",
  },
  // 1407: Castorice
  1407: {
    icon: "/images/characters/1407/icon.webp",
    splash: "/images/characters/1407/splash.webp",
  },
  // 1409: Hyacine
  1409: {
    icon: "/images/characters/1409/icon.webp",
    splash: "/images/characters/1409/splash.webp",
  },
  // 1413: Evernight
  1413: {
    icon: "/images/characters/1413/icon.webp",
    splash: "/images/characters/1413/splash.webp",
  },
  // 1415: Cyrene
  1415: {
    icon: "/images/characters/1415/icon.webp",
    splash: "/images/characters/1415/splash.webp",
  },
  // 1506: Silver Wolf
  1506: {
    icon: "/images/characters/1506/icon.webp",
    splash: "/images/characters/1506/splash.webp",
  },
};

// ── SKILL ICONS ──────────────────────────────────────────────────────────────
// Keys match the skill.type field returned by the serializer.
// Each character entry maps type → image path.
// The fallback chain is: SKILLS[charId][type] → generic SKILL_FALLBACK[type]
export const SKILLS = {
  1308: {
    Normal: "/images/skills/1308/basic_atk.webp",
    BPSkill: "/images/skills/1308/skill.webp",
    Ultra: "/images/skills/1308/ultimate.webp",
    Talent: "/images/skills/1308/talent.webp",
    Maze: "/images/skills/1308/technique.webp",
    MazeNormal: "/images/skills/1308/basic_atk.webp",
  },
  1310: {
    Normal: "/images/skills/1310/basic_atk.webp",
    BPSkill: "/images/skills/1310/skill.webp",
    Ultra: "/images/skills/1310/ultimate.webp",
    Talent: "/images/skills/1310/talent.webp",
    Maze: "/images/skills/1310/technique.webp",
    MazeNormal: "/images/skills/1310/basic_atk.webp",
  },
  1406: {
    Normal: "/images/skills/1406/basic_atk.webp",
    BPSkill: "/images/skills/1406/skill.webp",
    Ultra: "/images/skills/1406/ultimate.webp",
    Talent: "/images/skills/1406/talent.webp",
    Maze: "/images/skills/1406/technique.webp",
    MazeNormal: "/images/skills/1406/basic_atk.webp",
  },
  1407: {
    Normal: "/images/skills/1407/basic_atk.webp",
    BPSkill: "/images/skills/1407/skill.webp",
    Ultra: "/images/skills/1407/ultimate.webp",
    Talent: "/images/skills/1407/talent.webp",
    Maze: "/images/skills/1407/technique.webp",
    MazeNormal: "/images/skills/1407/basic_atk.webp",
    memosprite_skill: "/images/skills/1407/memosprite_skill.webp",
    memosprite_talent: "/images/skills/1407/memosprite_talent.webp",
  },
  1409: {
    Normal: "/images/skills/1409/basic_atk.webp",
    BPSkill: "/images/skills/1409/skill.webp",
    Ultra: "/images/skills/1409/ultimate.webp",
    Talent: "/images/skills/1409/talent.webp",
    Maze: "/images/skills/1409/technique.webp",
    MazeNormal: "/images/skills/1409/basic_atk.webp",
    memosprite_skill: "/images/skills/1409/memosprite_skill.webp",
    memosprite_talent: "/images/skills/1409/memosprite_talent.webp",
  },
  1413: {
    Normal: "/images/skills/1413/basic_atk.webp",
    BPSkill: "/images/skills/1413/skill.webp",
    Ultra: "/images/skills/1413/ultimate.webp",
    Talent: "/images/skills/1413/talent.webp",
    Maze: "/images/skills/1413/technique.webp",
    MazeNormal: "/images/skills/1413/basic_atk.webp",
    memosprite_skill: "/images/skills/1413/memosprite_skill.webp",
    memosprite_talent: "/images/skills/1413/memosprite_talent.webp",
  },
  1415: {
    Normal: "/images/skills/1415/basic_atk.webp",
    BPSkill: "/images/skills/1415/skill.webp",
    Ultra: "/images/skills/1415/ultimate.webp",
    Talent: "/images/skills/1415/talent.webp",
    Maze: "/images/skills/1415/technique.webp",
    MazeNormal: "/images/skills/1415/basic_atk.webp",
    memosprite_skill: "/images/skills/1415/memosprite_skill.webp",
    memosprite_talent: "/images/skills/1415/memosprite_talent.webp",
  },
  1506: {
    Normal: "/images/skills/1506/basic_atk.webp",
    BPSkill: "/images/skills/1506/skill.webp",
    Ultra: "/images/skills/1506/ultimate.webp",
    Talent: "/images/skills/1506/talent.webp",
    Maze: "/images/skills/1506/technique.webp",
    MazeNormal: "/images/skills/1506/basic_atk.webp",
  },
};

// ── LIGHT CONE IMAGES ─────────────────────────────────────────────────────────
// icon    → small icon shown in the equipment frame
// portrait → large splash art shown below stats
export const LIGHT_CONES = {
  // 23024: Along the Passing Shore (Acheron)
  23024: {
    icon: "/images/lightcones/23024_icon.webp",
    portrait: "/images/lightcones/23024_portrait.webp",
  },
  // 23025: Whereabouts Should Dreams Rest (Firefly)
  23025: {
    icon: "/images/lightcones/23025_icon.webp",
    portrait: "/images/lightcones/23025_portrait.webp",
  },
  // 23040: Make Farewells More Beautiful (Castorice)
  23040: {
    icon: "/images/lightcones/23040_icon.webp",
    portrait: "/images/lightcones/23040_portrait.webp",
  },
  // 23042: Long May Rainbows Adorn the Sky (Hyacine)
  23042: {
    icon: "/images/lightcones/23042_icon.webp",
    portrait: "/images/lightcones/23042_portrait.webp",
  },
  // 23043: Lies Dance on the Breeze (Cipher)
  23043: {
    icon: "/images/lightcones/23043_icon.webp",
    portrait: "/images/lightcones/23043_portrait.webp",
  },
  // 23049: To Evernight's Stars (Evernight)
  23049: {
    icon: "/images/lightcones/23049_icon.webp",
    portrait: "/images/lightcones/23049_portrait.webp",
  },
  // 23052: This Love, Forever (Cyrene)
  23052: {
    icon: "/images/lightcones/23052_icon.webp",
    portrait: "/images/lightcones/23052_portrait.webp",
  },
  // 23057: Welcome to the Cosmic City (Silver Wolf)
  23057: {
    icon: "/images/lightcones/23057_icon.webp",
    portrait: "/images/lightcones/23057_portrait.webp",
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Returns skill icon path for a given character id + skill type, or null. */
export const getSkillIcon = (charId, skillType) => {
  if (!charId || !skillType) return null;
  return SKILLS[String(charId)]?.[skillType] || null;
};

/** Returns light cone images { icon, portrait } or null. */
export const getLightConeImages = (lcId) => {
  if (!lcId) return null;
  return LIGHT_CONES[String(lcId)] || null;
};

/** Returns character images { icon, splash } or null. */
export const getCharacterImages = (charId) => {
  if (!charId) return null;
  return CHARACTERS[String(charId)] || null;
};
