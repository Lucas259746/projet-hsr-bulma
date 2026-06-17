const Destruction = {
  name: "Voie de la Destruction",
  positions: {
    // ── Colonne centrale ──
    Point01: { x: 175, y: 280 }, // Basic ATK
    Point02: { x: 475, y: 280 }, // Skill
    Point04: { x: 320, y: 200 }, // Talent
    Point03: { x: 320, y: 320 }, // Ultime
    Point05: { x: 320, y: 400 }, // Technique

    // ── Branches gauches ──
    Point06: { x: 220, y: 420 }, // Trace A2  (sort de Skill)
    Point07: { x: 420, y: 420 }, // Trace A4  (sort d'Ultime)
    Point11: { x: 65, y: 320 }, // Stat      (autour A2, haut)
    Point10: { x: 130, y: 370 }, // Stat      (autour A2, milieu)
    Point09: { x: 320, y: 470 }, // Stat      (autour A4)
    Point16: { x: 320, y: 50 }, // Stat      (sous Talent, gauche)

    // ── Branches droites ──
    Point08: { x: 320, y: 125 }, // Trace A6  (sort d'Ultime)
    Point13: { x: 520, y: 370 }, // Stat      (autour A6, haut)
    Point14: { x: 575, y: 320 }, // Stat      (autour A6, milieu)
    Point15: { x: 550, y: 180 }, // Stat      (autour A6, bas)
    Point12: { x: 100, y: 180 }, // Stat      (sous A6 / depuis Talent)
    Point17: { x: 200, y: 70 }, // Stat      (sous Talent, droite)

    // ── Coins haut ──
    Point18: { x: 440, y: 70 }, // Stat      (depuis Basic ATK, gauche)
  },
  rootConnections: [
    // Colonne centrale
    ["Point01", "Point03"],
    ["Point02", "Point03"],
    ["Point04", "Point03"],
    ["Point05", "Point03"],
    ["Point05", "Point09"],
    ["Point04", "Point08"],
    ["Point05", "Point06"],
    ["Point05", "Point07"],
    ["Point08", "Point16"],
    ["Point06", "Point10"],
    ["Point10", "Point11"],
    ["Point11", "Point12"],
    ["Point07", "Point13"],
    ["Point13", "Point14"],
    ["Point14", "Point15"],
    ["Point16", "Point17"],
    ["Point16", "Point18"],
  ],
};

export default Destruction;
