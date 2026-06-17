function SearchBox({
  userId,
  setUserId,
  language,
  setLanguage,
  languages,
  loading,
  onSearch,
}) {
  return (
    <section className="section py-4">
      <div className="container">
        <div className="box search-box">
          <div className="columns is-vcentered">
            {/* Colonne Gauche : Input de l'UID et bouton de soumission */}
            <div className="column is-8">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input is-dark font-orbitron"
                    type="text"
                    placeholder="Entrez un UID (ex: 701536690)"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)} // Met à jour l'UID dans l'état parent
                  />
                </div>
                <div className="control">
                  {/* Si l'application charge (loading === true), Bulma ajoute automatiquement un spinner */}
                  <button
                    className={`button is-warning font-orbitron ${loading ? "is-loading" : ""}`}
                    onClick={onSearch} // Déclenche la fonction de recherche API
                  >
                    RECHERCHER
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Sélecteur de langue pour l'affichage des textes */}
            <div className="column is-4">
              <div className="select is-fullwidth is-dark">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchBox;
