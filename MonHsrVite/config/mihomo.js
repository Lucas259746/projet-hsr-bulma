// config/mihomo.js
// Remplace starrail.js — appelle directement l'API Mihomo sans dépendance tierce

const MIHOMO_BASE = "https://api.mihomo.me/sr_info_parsed";

/**
 * Récupère les données brutes d'un joueur depuis l'API Mihomo.
 * @param {string} userId  UID du joueur
 * @param {string} language  Code langue (en, fr, es, de, zh, ja, ko…)
 * @returns {Promise<object>} Données brutes JSON de l'API
 */
const fetchUser = async (userId, language = "en") => {
  const url = `${MIHOMO_BASE}/${userId}?lang=${language}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "AstralDatabase/1.0",
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Mihomo API error ${response.status} for UID ${userId}: ${body}`,
    );
  }

  return response.json();
};

module.exports = { fetchUser };
