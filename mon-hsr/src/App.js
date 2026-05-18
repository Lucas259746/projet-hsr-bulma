import { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('701536690');
  const [language, setLanguage] = useState('en');
  const [dataParsed, setDataParsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const languages = [
    { code: 'en', name: '🇬🇧 English' },
    { code: 'fr', name: '🇫🇷 Français' },
    { code: 'es', name: '🇪🇸 Español' },
    { code: 'de', name: '🇩🇪 Deutsch' },
    { code: 'cn', name: '🇨🇳 中文' },
    { code: 'jp', name: '🇯🇵 日本語' },
    { code: 'kr', name: '🇰🇷 한국어' },
    { code: 'pt', name: '🇵🇹 Português' },
    { code: 'ru', name: '🇷🇺 Русский' },
    { code: 'th', name: '🇹🇭 ไทย' },
  ];

  const fetchUserData = async () => {
    if (!userId.trim()) {
      setError('Veuillez entrer un ID de jeu valide');
      return;
    }

    setLoading(true);
    setError(null);
    setDataParsed(null);

    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}?language=${language}`);
      
      if (!res.ok) {
        throw new Error(`Erreur ${res.status}: Impossible de récupérer les données. Vérifiez votre ID.`);
      }

      const userData = await res.json();
      setDataParsed(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchUserData();
    }
  };

  const renderData = (data) => {
    return (
      <pre className="data-display">
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1>⭐ Honkai: Star Rail - Profil Joueur</h1>

        <div className="input-section">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Entrez votre ID de jeu..."
            className="user-input"
          />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button onClick={fetchUserData} disabled={loading} className="search-btn">
            {loading ? 'Chargement...' : 'Rechercher'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {dataParsed && (
          <div className="data-section">
            <h2>👤 Données du Joueur</h2>
            <div className="tab-content">
              {renderData(dataParsed)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
