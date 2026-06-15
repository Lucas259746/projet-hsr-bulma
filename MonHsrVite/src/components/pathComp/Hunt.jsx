const HuntLayout = {
  name: "Flèche Transperçante de la Chasse",
  coords: {
    basic: { x: 60, y: 210 }, // Empennage (Arrière de la flèche)
    skill: { x: 160, y: 210 },
    ultra: { x: 260, y: 210 }, // Cœur cinétique
    talent: { x: 360, y: 210 },
    tech: { x: 460, y: 210 }, // Pointe de la flèche
    a2: { x: 210, y: 110 }, // Aileron supérieur avant
    a4: { x: 310, y: 110 }, // Aileron supérieur arrière
    a6: { x: 210, y: 310 }, // Aileron inférieur avant
    memo_0: { x: 310, y: 310 }, // Aileron inférieur arrière
    stat_0: { x: 110, y: 110 },
    stat_1: { x: 410, y: 110 },
    stat_2: { x: 110, y: 310 },
    stat_3: { x: 410, y: 310 },
    stat_4: { x: 530, y: 150 }, // Ondes de choc de la pointe
    stat_5: { x: 530, y: 270 },
    stat_6: { x: 260, y: 40 },
    stat_7: { x: 260, y: 380 },
    stat_8: { x: 20, y: 150 },
    stat_9: { x: 20, y: 270 },
  },
  connections: [
    ["basic", "skill"],
    ["skill", "ultra"],
    ["ultra", "talent"],
    ["talent", "tech"],
    ["skill", "a2"],
    ["ultra", "a4"],
    ["skill", "a6"],
    ["ultra", "memo_0"],
    ["a2", "stat_0"],
    ["a4", "stat_1"],
    ["a6", "stat_2"],
    ["memo_0", "stat_3"],
    ["tech", "stat_4"],
    ["tech", "stat_5"],
    ["a4", "stat_6"],
    ["memo_0", "stat_7"],
    ["basic", "stat_8"],
    ["basic", "stat_9"],
  ],
};

export default HuntLayout;
