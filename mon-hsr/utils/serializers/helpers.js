const normalizeImageAsset = (asset) => {
  if (!asset) return null;
  if (typeof asset === 'string') return asset;
  return asset.url || asset.path || null;
};

const getText = (asset, language = 'en') => {
  if (!asset) return null;
  if (typeof asset === 'string') return asset;
  if (typeof asset.get === 'function') {
    try { return asset.get(language) || asset.get('en') || null; } catch (e) { return null; }
  }
  if (asset.dynamicData && Array.isArray(asset.dynamicData.paramList)) {
    return JSON.stringify(asset.dynamicData.paramList);
  }
  return null;
};

const normalizeSkillType = (typeAsset, language = 'en') => {
  if (!typeAsset) return null;
  let txt = null;
  if (typeof typeAsset === 'string') txt = typeAsset;
  else if (typeof typeAsset.get === 'function') {
    try { txt = typeAsset.get(language) || typeAsset.get('en') || null; } catch (e) { txt = null; }
  } else if (typeAsset.name && typeof typeAsset.name.get === 'function') {
    try { txt = typeAsset.name.get(language) || typeAsset.name.get('en') || null; } catch (e) { txt = null; }
  } else if (typeAsset.id != null) txt = String(typeAsset.id);
  if (!txt) return null;
  const s = String(txt).toLowerCase();
  if (s.includes('ult') || s.includes('ultime') || s.includes('ultimate')) return 'ultimate';
  if (s.includes('compét') || s.includes('skill')) return 'skill';
  if (s.includes('attaque') || s.includes('atq') || s.includes('normal')) return 'normal';
  if (s.includes('talent')) return 'talent';
  if (s.includes('technique')) return 'technique';
  if (s.includes('maze')) return 'maze';
  return txt;
};

module.exports = {
  normalizeImageAsset,
  getText,
  normalizeSkillType,
};