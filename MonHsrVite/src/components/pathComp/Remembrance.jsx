const RemembranceLayout = {
  name: "Prisme Éternel de la Mémoire",
  coords: {
    basic: { x: 300, y: 370 }, // Base du miroir
    tech: { x: 300, y: 300 }, // Ancre inférieure
    talent: { x: 300, y: 210 }, // Cœur de la lentille mémorielle
    skill: { x: 180, y: 210 }, // Lame de glace gauche
    ultra: { x: 420, y: 210 }, // Lame de glace droite
    memo_0: { x: 300, y: 120 }, // Réflecteur supérieur
    a2: { x: 140, y: 120 }, // Éclat supérieur gauche
    a4: { x: 300, y: 45 }, // Pointe gelée supérieure
    a6: { x: 460, y: 120 }, // Éclat supérieur droit
    stat_0: { x: 140, y: 300 }, // Éclat inférieur gauche
    stat_1: { x: 460, y: 300 }, // Éclat inférieur droit
    stat_2: { x: 70, y: 210 }, // Terminaison extrême gauche
    stat_3: { x: 530, y: 210 }, // Terminaison extrême droite
    stat_4: { x: 190, y: 65 },
    stat_5: { x: 410, y: 65 },
    stat_6: { x: 230, y: 45 },
    stat_7: { x: 370, y: 45 },
    stat_8: { x: 220, y: 300 },
    stat_9: { x: 380, y: 300 },
  },
  connections: [
    ["basic", "tech"],
    ["tech", "talent"],
    ["talent", "skill"],
    ["talent", "ultra"],
    ["talent", "memo_0"],
    ["skill", "a2"],
    ["memo_0", "a4"],
    ["ultra", "a6"],
    ["skill", "stat_2"],
    ["skill", "stat_8"],
    ["ultra", "stat_3"],
    ["ultra", "stat_9"],
    ["a2", "stat_0"],
    ["a2", "stat_4"],
    ["a6", "stat_1"],
    ["a6", "stat_2"],
    ["a6", "stat_5"],
    ["a4", "stat_6"],
    ["a4", "stat_7"],
  ],
};

export default RemembranceLayout;
