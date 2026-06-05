const { getText } = require('./helpers');

const serializeLightCone = (lightCone, language = 'en') => {
  if (!lightCone) return null;
  
  return {
    id: lightCone.lightConeData?.id ? String(lightCone.lightConeData?.id) : null,
    name: lightCone.lightConeData?.name?.get(language) || lightCone.lightConeData?.name?.get('en'),
    level: lightCone.level != null ? Number(lightCone.level) : null,
    ascension: lightCone.ascension != null ? Number(lightCone.ascension) : null,
    rarity: lightCone.lightConeData?.stars != null ? Number(lightCone.lightConeData?.stars) : null,
    path: lightCone.lightConeData?.path?.name?.get(language) || lightCone.lightConeData?.path?.name?.get('en'),
    
    // 🌟 RÉCUPÉRATION DES DESCRIPTIONS DEPUIS L'API
    description: getText(lightCone.lightConeData?.description, language) || 
                 getText(lightCone.lightConeData?.description, 'en') || '',
                 
    effectName: getText(lightCone.lightConeData?.effect?.name, language) || 
                getText(lightCone.lightConeData?.effect?.name, 'en') || '',
                
    effectDescription: getText(lightCone.lightConeData?.effect?.description, language) || 
                       getText(lightCone.lightConeData?.effect?.description, 'en') || '',

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
  };
};

module.exports = serializeLightCone;