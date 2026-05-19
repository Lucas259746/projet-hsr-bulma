const client = require('../../config/starrail');
const serializeRelic = require('./relic');
const serializeLightCone = require('./lightCone');
const serializeSkill = require('./skill');
const serializeCharacter = require('./character');

const getUserData = async (userId, language = 'en') => {
  try {
    const user = await client.fetchUser(userId);
    const starfaring = user.starfaringCompanions || [];
    const supports = user.supportCharacters || [];

    const combinedCharacters = [...starfaring];
    supports.forEach(supportChar => {
      const isAlreadyAdded = combinedCharacters.some(
        char => char.characterData?.id === supportChar.characterData?.id
      );
      if (!isAlreadyAdded) {
        combinedCharacters.push(supportChar);
      }
    });

    return {
      uid: String(user.uid),
      nickname: user.nickname,
      level: Number(user.level),
      worldLevel: Number(user.worldLevel),
      characterCount: Number(user.characterCount),
      lightConeCount: Number(user.lightConeCount),
      relicCount: Number(user.relicCount),
      characterList: combinedCharacters.map(char => serializeCharacter(char, language)),
    };

    return result;
  } catch (error) {
    console.error(`❌ Error fetching user ${userId}:`, error.message);
    throw error;
  }
};

module.exports = {
  serializeRelic,
  serializeLightCone,
  serializeSkill,
  serializeCharacter,
  getUserData,
};
