const serializeLightCone = (lightCone, language = 'en') => {
  if (!lightCone) return null;
  return {
    id: lightCone.lightConeData?.id ? String(lightCone.lightConeData?.id) : null,
    name: lightCone.lightConeData?.name?.get(language) || lightCone.lightConeData?.name?.get('en'),
    level: lightCone.level != null ? Number(lightCone.level) : null,
    ascension: lightCone.ascension != null ? Number(lightCone.ascension) : null,
    superimposition: (() => {
      const supRaw = lightCone.superimposition;
      if (supRaw == null) return null;
      if (typeof supRaw === 'bigint') return Number(supRaw.toString());
      if (typeof supRaw === 'number') return supRaw;
      if (typeof supRaw === 'string') {
        const n = Number(supRaw);
        return Number.isNaN(n) ? null : n;
      }
      if (typeof supRaw === 'object') {
        const tryFields = ['rank', 'level', 'value', 'id'];
        for (const f of tryFields) {
          if (supRaw[f] != null) {
            const v = supRaw[f];
            if (typeof v === 'bigint') return Number(v.toString());
            if (typeof v === 'number') return v;
            if (typeof v === 'string') { const n = Number(v); if (!Number.isNaN(n)) return n; }
          }
        }
        if (typeof supRaw.toString === 'function') {
          const s = supRaw.toString(); const n = Number(s); if (!Number.isNaN(n)) return n;
        }
        return null;
      }
      return null;
    })(),
    rarity: lightCone.lightConeData?.stars != null ? Number(lightCone.lightConeData?.stars) : null,
    path: lightCone.lightConeData?.path?.name?.get(language) || lightCone.lightConeData?.path?.name?.get('en'),
  };
};

module.exports = serializeLightCone;
