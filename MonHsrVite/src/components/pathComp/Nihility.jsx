const NihilityLayout = {
  name: "Vortex Entropique du Néant",
  coords: {
    basic: { x: 100, y: 70 }, // Périphérie haute gauche
    tech: { x: 500, y: 70 }, // Périphérie haute droite
    skill: { x: 200, y: 150 }, // Rapprochement du centre
    talent: { x: 400, y: 150 }, // Rapprochement du centre
    ultra: { x: 300, y: 220 }, // Le centre gravitationnel du vide
    memo_0: { x: 300, y: 130 }, // Juste au dessus de l'ultime
    a2: { x: 180, y: 300 }, // Émanation basse gauche
    a4: { x: 300, y: 350 }, // Base du puit
    a6: { x: 420, y: 300 }, // Émanation basse droite
    stat_0: { x: 80, y: 160 },
    stat_1: { x: 520, y: 160 },
    stat_2: { x: 130, y: 230 },
    stat_3: { x: 470, y: 230 },
    stat_4: { x: 240, y: 260 },
    stat_5: { x: 360, y: 260 },
    stat_6: { x: 100, y: 340 },
    stat_7: { x: 500, y: 340 },
    stat_8: { x: 240, y: 380 },
    stat_9: { x: 360, y: 380 },
  },
  connections: [
    ["basic", "skill"],
    ["tech", "talent"],
    ["skill", "ultra"],
    ["talent", "ultra"],
    ["memo_0", "ultra"],
    ["ultra", "a2"],
    ["ultra", "a4"],
    ["ultra", "a6"],
    ["basic", "stat_0"],
    ["tech", "stat_1"],
    ["skill", "stat_2"],
    ["talent", "stat_3"],
    ["a2", "stat_4"],
    ["a6", "stat_5"],
    ["a2", "stat_6"],
    ["a6", "stat_7"],
    ["a4", "stat_8"],
    ["a4", "stat_9"],
  ],
};

export default NihilityLayout;
