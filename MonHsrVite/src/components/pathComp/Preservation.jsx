const PreservationLayout = {
  name: "Forteresse Cristalline de la Préservation",
  coords: {
    tech: { x: 300, y: 210 }, // Noyau de contrôle central
    basic: { x: 300, y: 60 }, // Crête supérieure du bouclier
    ultra: { x: 300, y: 360 }, // Ancre de fondation basse
    skill: { x: 140, y: 210 }, // Rempart flanc gauche
    talent: { x: 460, y: 210 }, // Rempart flanc droit
    a2: { x: 200, y: 120 }, // Angle supérieur gauche
    a4: { x: 400, y: 120 }, // Angle supérieur droit
    a6: { x: 200, y: 300 }, // Angle inférieur gauche
    memo_0: { x: 400, y: 300 }, // Angle inférieur droit
    stat_0: { x: 80, y: 140 },
    stat_1: { x: 80, y: 280 },
    stat_2: { x: 520, y: 140 },
    stat_3: { x: 520, y: 280 },
    stat_4: { x: 200, y: 40 },
    stat_5: { x: 400, y: 40 },
    stat_6: { x: 200, y: 380 },
    stat_7: { x: 400, y: 380 },
    stat_8: { x: 300, y: 130 },
    stat_9: { x: 300, y: 290 },
  },
  connections: [
    ["tech", "basic"],
    ["tech", "ultra"],
    ["tech", "skill"],
    ["tech", "talent"],
    ["basic", "a2"],
    ["basic", "a4"],
    ["ultra", "a6"],
    ["ultra", "memo_0"],
    ["skill", "stat_0"],
    ["skill", "stat_1"],
    ["talent", "stat_2"],
    ["talent", "stat_3"],
    ["a2", "stat_4"],
    ["a4", "stat_5"],
    ["a6", "stat_6"],
    ["memo_0", "stat_7"],
    ["tech", "stat_8"],
    ["tech", "stat_9"],
  ],
};

export default PreservationLayout;
