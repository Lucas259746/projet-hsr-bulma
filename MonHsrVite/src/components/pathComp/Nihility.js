const Nihility = {
  name: "Voie du Néant",
  positions: {
    // ── APTITUDES PRINCIPALES (Grandes Icônes de Combat) ─────────────────
    Point03: { x: 320, y: 230 }, // ult
    Point01: { x: 210, y: 250 }, // atk base
    Point02: { x: 430, y: 250 }, // skill
    Point04: { x: 320, y: 140 }, // talent
    Point05: { x: 320, y: 320 }, // technique

    // ── TRACES MAJEURES (Bonus d'Aptitudes Passifs A2 / A4 / A6) ──────────
    Point06: { x: 115, y: 150 }, // Trace 01
    Point07: { x: 525, y: 150 }, // Trace 02
    Point08: { x: 320, y: 55 }, // Trace 03

    // ── NŒUDS DE STATISTIQUES (Petits Cercles Dorés de Bonus Permanents) ──
    Point09: { x: 320, y: 420 }, // première node (sous technique)
    Point10: { x: 40, y: 230 }, // premiere node branche gauche
    Point11: { x: 120, y: 320 }, // seconde node branche gauche
    Point12: { x: 220, y: 420 }, // troisième node branche gauche
    Point13: { x: 600, y: 230 }, // premiere node branche droite
    Point14: { x: 520, y: 320 }, // seconde node branche droite
    Point15: { x: 420, y: 420 }, // troisième node branche droite
    Point16: { x: 210, y: 95 }, // node haut gauche
    Point17: { x: 430, y: 95 }, // node haut droite
    Point18: { x: 320, y: 480 }, // node la plus basse
  },
  rootConnections: [
    ["Point06", "Point01"],
    ["Point01", "Point03"],
    ["Point02", "Point03"],
    ["Point04", "Point03"],
    ["Point05", "Point03"],
    ["Point05", "Point09"],
    ["Point09", "Point18"],
    ["Point04", "Point08"],
    ["Point02", "Point07"],
    ["Point06", "Point10"],
    ["Point10", "Point11"],
    ["Point11", "Point12"],
    ["Point07", "Point13"],
    ["Point13", "Point14"],
    ["Point14", "Point15"],
    ["Point08", "Point16"],
    ["Point08", "Point17"],
  ],
};

export default Nihility;
