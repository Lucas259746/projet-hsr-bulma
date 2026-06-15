const EruditionLayout = {
  name: "Matrice Synaptique de l'Érudition",
  coords: {
    basic: { x: 300, y: 210 }, // Le Noyau central pensant
    skill: { x: 300, y: 110 }, // Sommet interne
    ultra: { x: 390, y: 160 }, // Flanc haut-droit
    talent: { x: 390, y: 260 }, // Flanc bas-droit
    tech: { x: 300, y: 310 }, // Base interne
    a2: { x: 210, y: 260 }, // Flanc bas-gauche
    a4: { x: 210, y: 160 }, // Flanc haut-gauche
    a6: { x: 300, y: 40 }, // Terminal Étoilé Supérieur
    memo_0: { x: 490, y: 210 }, // Terminal Étoilé Oriental
    stat_0: { x: 120, y: 110 },
    stat_1: { x: 480, y: 110 },
    stat_2: { x: 480, y: 310 },
    stat_3: { x: 120, y: 310 },
    stat_4: { x: 300, y: 385 },
    stat_5: { x: 110, y: 210 },
    stat_6: { x: 210, y: 70 },
    stat_7: { x: 390, y: 70 },
    stat_8: { x: 390, y: 350 },
    stat_9: { x: 210, y: 350 },
  },
  connections: [
    ["basic", "skill"],
    ["basic", "ultra"],
    ["basic", "talent"],
    ["basic", "tech"],
    ["basic", "a2"],
    ["basic", "a4"],
    ["skill", "a6"],
    ["talent", "memo_0"],
    ["a4", "stat_0"],
    ["ultra", "stat_1"],
    ["talent", "stat_2"],
    ["a2", "stat_3"],
    ["tech", "stat_4"],
    ["a4", "stat_5"],
    ["a6", "stat_6"],
    ["a6", "stat_7"],
    ["memo_0", "stat_8"],
    ["a2", "stat_9"],
  ],
};

export default EruditionLayout;
