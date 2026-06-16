// Nettoie les balises spécifiques au jeu (ex: <unbreak>) dans le pseudo ou le nom du personnage
const sanitizeName = (value) =>
  String(value || "").replace(/<\/?unbreak>/gi, "");

function CharacterList({ profile, selectedIndex, onSelectCharacter }) {
  return (
    <div className="column is-4">
      <div className="box character-list-box">
        {/* En-tête : Pseudo du joueur, Niveau de compte et Niveau de monde */}
        <div className="mb-4 pb-3 has-border-bottom-hsr">
          <h2 className="title is-4 has-text-gold font-orbitron mb-1">
            {sanitizeName(profile.nickname)}
          </h2>
          <p className="subtitle is-6 has-text-grey-light mb-0 mt-1">
            Niveau {profile.level} <span className="mx-2">|</span> WorldLevel{" "}
            {profile.worldLevel}
          </p>
        </div>

        {/* Liste verticale des boutons de personnages */}
        <h3 className="title is-6 font-orbitron mb-3 has-text-gold-light">
          Membres de la vitrine
        </h3>
        <div className="character-buttons-container">
          {profile.characterList?.map((char, index) => (
            <button
              key={char.id || index}
              /* La classe 'is-active' est appliquée dynamiquement si ce personnage est celui sélectionné */
              className={`button is-fullwidth character-card mb-2 font-orbitron ${selectedIndex === index ? "is-active" : ""}`}
              onClick={() => onSelectCharacter(index)} // Transmet l'index sélectionné au composant parent
            >
              <div className="is-flex is-justify-content-space-between is-align-items-center is-fullwidth">
                <span>{sanitizeName(char.name)}</span>
                <span className="tag is-dark">Lvl {char.level}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterList;
