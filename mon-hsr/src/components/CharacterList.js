const sanitizeName = (value) => String(value || '').replace(/<\/?unbreak>/gi, '');

function CharacterList({ profile, selectedIndex, onSelectCharacter }) {
  return (
    <div className="column is-4">
      <div className="box character-list-box">
        <div className="profile-header mb-4 pb-3">
          <h2 className="title is-4 text-gold font-orbitron mb-1">{sanitizeName(profile.nickname)}</h2>
          <p className="subtitle is-6 has-text-grey-light mb-0">
            Niveau {profile.level} <span className="mx-2">|</span> Équilibre {profile.worldLevel}
          </p>
        </div>

        <h3 className="title is-6 font-orbitron mb-3 text-gold-light">Membres de la vitrine</h3>
        <div className="character-buttons-container">
          {profile.characterList?.map((char, index) => (
            <button
              key={char.id || index}
              className={`button character-card font-orbitron ${selectedIndex === index ? 'is-active' : ''}`}
              onClick={() => onSelectCharacter(index)}
            >
              <div className="is-flex is-justify-content-space-between is-align-items-center w-100">
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
