const { getText } = require('./helpers');

/**
 * Utitaire pour formater joliment les valeurs de statistiques (ex: 0.0552 -> 5.5%)
 */
const formatStatValue = (propertyName, value) => {
  if (value == null) return null;
  if (!propertyName) return Number(value.toFixed(1));

  const p = String(propertyName).toLowerCase();
  // Si le nom contient un de ces termes, c'est généralement un pourcentage dans HSR
  if (
    p.includes('%') || 
    p.includes('crit') || 
    p.includes('taux') || 
    p.includes('dégâts') || 
    p.includes('degat') ||
    p.includes('recharge') ||
    p.includes('effet') ||
    p.includes('rupture') ||
    p.includes('boost')
  ) {
    // Si la valeur est déjà un petit décimal (ex: 0.055296), on la passe en pourcentage
    if (value > 0 && value < 1) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return `${value.toFixed(1)}%`;
  }

  // Statistique plate (PV, ATQ, DEF, VITESSE)
  return Math.round(value);
};

const serializeRelic = (relic, language = 'en') => {
  // Récupération sécurisée du nom de la statistique principale
  const mainPropName = getText(relic.mainStat?.property?.name, language) || 
                       getText(relic.mainStat?.property, language) || 
                       relic.mainStat?.property?.id || 
                       "Statistique";

  return {
    id: relic.relicData?.id ? String(relic.relicData?.id) : null,
    name: relic.relicData?.name?.get(language) || relic.relicData?.name?.get('en'),
    type: relic.relicData?.type?.name?.get(language) || relic.relicData?.type?.name?.get('en'),
    set: relic.relicData?.set?.name?.get(language) || relic.relicData?.set?.name?.get('en'),
    level: relic.level != null ? Number(relic.level) : null,
    rarity: relic.relicData?.stars != null ? Number(relic.relicData?.stars) : null,
    mainStat: {
      property: mainPropName,
      value: formatStatValue(mainPropName, relic.mainStat?.value),
    },
    subStats: relic.subStats?.map(stat => {
      const subPropName = getText(stat.property?.name, language) || 
                          getText(stat.property, language) || 
                          stat.property?.id || 
                          "Substat";
      return {
        property: subPropName,
        value: formatStatValue(subPropName, stat.value),
      };
    }) || [],
  };
};

module.exports = serializeRelic;