const serializeRelic = (relic, language = 'en') => {
  return {
    id: relic.relicData?.id ? String(relic.relicData?.id) : null,
    name: relic.relicData?.name?.get(language) || relic.relicData?.name?.get('en'),
    type: relic.relicData?.type?.name?.get(language) || relic.relicData?.type?.name?.get('en'),
    set: relic.relicData?.set?.name?.get(language) || relic.relicData?.set?.name?.get('en'),
    level: relic.level != null ? Number(relic.level) : null,
    rarity: relic.relicData?.stars != null ? Number(relic.relicData?.stars) : null,
    mainStat: {
      property: relic.mainStat?.property?.name?.get(language) || relic.mainStat?.property?.name?.get('en'),
      value: relic.mainStat?.value != null ? Number(relic.mainStat?.value) : null,
    },
    subStats: relic.subStats?.map(stat => ({
      property: stat.property?.name?.get(language) || stat.property?.name?.get('en'),
      value: stat.value != null ? Number(stat.value) : null,
    })) || [],
  };
};

module.exports = serializeRelic;
