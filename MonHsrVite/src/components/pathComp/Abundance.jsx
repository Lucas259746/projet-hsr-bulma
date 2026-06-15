// Générateur local de statistiques secondaires adaptées à l'arbre
const generateAbundanceStats = () => ({
  stat_0: { x: 160, y: 200 },
  stat_1: { x: 240, y: 200 },
  stat_2: { x: 360, y: 200 },
  stat_3: { x: 440, y: 200 },
  stat_4: { x: 80, y: 120 },
  stat_5: { x: 160, y: 80 },
  stat_6: { x: 300, y: 40 },
  stat_7: { x: 440, y: 80 },
  stat_8: { x: 520, y: 120 },
  stat_9: { x: 300, y: 120 },
});

const AbundanceLayout = {
  name: "Arbre Sacré de l'Abondance",
  coords: {
    basic: { x: 300, y: 380 }, // Racine / Tronc initial
    tech: { x: 300, y: 310 }, // Base de l'arbre
    talent: { x: 300, y: 240 }, // Cœur de ramification
    skill: { x: 200, y: 160 }, // Branche Gauche
    ultra: { x: 400, y: 160 }, // Branche Droite
    memo_0: { x: 300, y: 160 }, // Fleur centrale
    a2: { x: 120, y: 100 }, // Feuillage Extrême Gauche
    a4: { x: 300, y: 80 }, // Cime de l'arbre
    a6: { x: 480, y: 100 }, // Feuillage Extrême Droite
    ...generateAbundanceStats(),
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
    ["skill", "stat_0"],
    ["skill", "stat_1"],
    ["ultra", "stat_2"],
    ["ultra", "stat_3"],
    ["a2", "stat_4"],
    ["a2", "stat_5"],
    ["a4", "stat_6"],
    ["a6", "stat_7"],
    ["a6", "stat_8"],
    ["memo_0", "stat_9"],
  ],
};

export default AbundanceLayout;
