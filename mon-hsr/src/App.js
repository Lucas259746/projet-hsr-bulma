import { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('701536690');
  const [language, setLanguage] = useState('en');
  const [dataRaw, setDataRaw] = useState(null);
  const [dataParsed, setDataParsed] = useState(null);
  const [panel, setPanel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('parsed');

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
    setDataRaw(null);
    setDataParsed(null);
    setPanel(null);

    try {
      // Récupérer les données parsées
      const resParsed = await fetch(`http://localhost:5000/api/sr_info_parsed/${userId}?language=${language}&lang=${language}`);
      if (resParsed.ok) {
        setDataParsed(await resParsed.json());
      }

      // Récupérer les données brutes
      const resRaw = await fetch(`http://localhost:5000/api/sr_info/${userId}?language=${language}&lang=${language}`);
      if (resRaw.ok) {
        setDataRaw(await resRaw.json());
      }

      // Récupérer le panel
      const resPanel = await fetch(`http://localhost:5000/api/sr_panel/${userId}?language=${language}&lang=${language}`);
      if (resPanel.ok) {
        setPanel(await resPanel.json());
      }

      if (!resParsed.ok && !resRaw.ok) {
        throw new Error('Impossible de récupérer les données. Vérifiez votre ID.');
      }
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

        {(dataRaw || dataParsed || panel) && (
          <div className="data-section">
            <div className="tabs">
              {dataParsed && (
                <button
                  className={`tab ${activeTab === 'parsed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('parsed')}
                >
                  📊 Données Parsées
                </button>
              )}
              {dataRaw && (
                <button
                  className={`tab ${activeTab === 'raw' ? 'active' : ''}`}
                  onClick={() => setActiveTab('raw')}
                >
                  📋 Données Brutes
                </button>
              )}
              {panel && (
                <button
                  className={`tab ${activeTab === 'panel' ? 'active' : ''}`}
                  onClick={() => setActiveTab('panel')}
                >
                  🎨 Panel
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === 'parsed' && dataParsed && renderData(dataParsed)}
              {activeTab === 'raw' && dataRaw && renderData(dataRaw)}
              {activeTab === 'panel' && panel && renderData(panel)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
