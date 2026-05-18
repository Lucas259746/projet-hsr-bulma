const client = require('../config/starrail');

/**
 * Serialize a relic object to JSON-safe format
 */
const serializeRelic = (relic, language = 'en') => {
  return {
    id: relic.relicData?.id,
    name: relic.relicData?.name?.get(language) || relic.relicData?.name?.get('en'),
    type: relic.relicData?.type?.name?.get(language) || relic.relicData?.type?.name?.get('en'),
    set: relic.relicData?.set?.name?.get(language) || relic.relicData?.set?.name?.get('en'),
    level: relic.level,
    rarity: relic.relicData?.stars,
    mainStat: {
      property: relic.mainStat?.property?.name?.get(language) || relic.mainStat?.property?.name?.get('en'),
      value: relic.mainStat?.value,
    },
    subStats: relic.subStats?.map(stat => ({
      property: stat.property?.name?.get(language) || stat.property?.name?.get('en'),
      value: stat.value,
    })) || [],
  };
};

/**
 * Serialize a light cone object to JSON-safe format
 */
const serializeLightCone = (lightCone, language = 'en') => {
  if (!lightCone) return null;
  return {
    id: lightCone.lightConeData?.id,
    name: lightCone.lightConeData?.name?.get(language) || lightCone.lightConeData?.name?.get('en'),
    level: lightCone.level,
    ascension: lightCone.ascension,
    superimposition: lightCone.superimposition?.rank,
    rarity: lightCone.lightConeData?.stars,
    path: lightCone.lightConeData?.path?.name?.get(language) || lightCone.lightConeData?.path?.name?.get('en'),
  };
};

/**
 * Serialize a character object to JSON-safe format
 */
const serializeCharacter = (character, language = 'en') => {
  return {
    id: character.characterData?.id,
    name: character.characterData?.name?.get(language) || character.characterData?.name?.get('en'),
    level: character.level,
    ascension: character.ascension,
    eidolons: character.eidolons,
    promotion: character.ascension,
    rarity: character.characterData?.stars,
    path: character.characterData?.path?.name?.get(language) || character.characterData?.path?.name?.get('en'),
    combatType: character.characterData?.combatType?.name?.get(language) || character.characterData?.combatType?.name?.get('en'),
    lightCone: serializeLightCone(character.lightCone, language),
    relics: character.relics?.map(relic => serializeRelic(relic, language)) || [],
  };
};

/**
 * Fetch and serialize user data with language support
 */
const getUserData = async (userId, language = 'en') => {
  try {
    const user = await client.fetchUser(userId);
    console.log(`✅ User data fetched for UID: ${userId}`);
    
    return {
      uid: user.uid,
      nickname: user.nickname,
      level: user.level,
      worldLevel: user.worldLevel,
      characterCount: user.characterCount,
      lightConeCount: user.lightConeCount,
      relicCount: user.relicCount,
      characterList: user.getCharacters()?.map(char => serializeCharacter(char, language)) || [],
      challenge: user.challenge,
      abyss: user.abyss,
    };
  } catch (error) {
    console.error(`❌ Error fetching user ${userId}:`, error.message);
    throw error;
  }
};

module.exports = {
  serializeRelic,
  serializeLightCone,
  serializeCharacter,
  getUserData
};