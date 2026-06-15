const HarmonyLayout = {
  name: "Mandala Harmonieux des Étoiles",
  coords: {
    basic: { x: 300, y: 210 }, // Le Chef d'orchestre au centre
    skill: { x: 210, y: 140 }, // Anneau interne haut-gauche
    ultra: { x: 390, y: 140 }, // Anneau interne haut-droit
    talent: { x: 390, y: 280 }, // Anneau interne bas-droit
    tech: { x: 210, y: 280 }, // Anneau interne bas-gauche
    a2: { x: 300, y: 70 }, // Étoile polaire (Sommet)
    a4: { x: 490, y: 210 }, // Pavillon Est
    a6: { x: 300, y: 350 }, // Clé de sol (Base)
    memo_0: { x: 110, y: 210 }, // Pavillon Ouest
    stat_0: { x: 210, y: 50 },
    stat_1: { x: 390, y: 50 },
    stat_2: { x: 530, y: 130 },
    stat_3: { x: 530, y: 290 },
    stat_4: { x: 390, y: 390 },
    stat_5: { x: 210, y: 390 },
    stat_6: { x: 70, y: 290 },
    stat_7: { x: 70, y: 130 },
    stat_8: { x: 300, y: 140 }, // Liaison centrale haute
    stat_9: { x: 300, y: 280 }, // Liaison centrale basse
  },
  connections: [
    ["basic", "skill"],
    ["basic", "ultra"],
    ["basic", "talent"],
    ["basic", "tech"],
    ["skill", "a2"],
    ["ultra", "a4"],
    ["talent", "a6"],
    ["tech", "memo_0"],
    ["a2", "stat_0"],
    ["a2", "stat_1"],
    ["a4", "stat_2"],
    ["a4", "stat_3"],
    ["a6", "stat_4"],
    ["a6", "stat_5"],
    ["memo_0", "stat_6"],
    ["memo_0", "stat_7"],
    ["skill", "stat_8"],
    ["tech", "stat_9"],
  ],
};

export default HarmonyLayout;
