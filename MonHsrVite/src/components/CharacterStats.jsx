function CharacterStats({ stats }) {
  if (!stats || stats.length === 0) {
    return (
      <p className="has-text-grey-light is-size-7">Aucune statistique disponible.</p>
    );
  }

  return (
    <div className="box has-background-black-bis p-4" style={{ borderLeft: "3px solid #f29e38ff" }}>
      <h3 className="title is-5 font-orbitron has-text-gold mb-4">Statistiques Globales</h3>
      <table className="table is-fullwidth is-narrow has-background-transparent has-text-white is-size-7 mb-0">
        <thead>
          <tr style={{ borderBottom: "1px solid #4a4a4a" }}>
            <th className="has-text-grey-light pl-0">Attribut</th>
            <th className="has-text-right has-text-grey-light pr-0">Valeur</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.key} style={{ borderBottom: "1px solid #222" }}>
              <td className="py-2">{stat.name}</td>
              <td className="has-text-right py-2 has-text-weight-bold">{stat.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CharacterStats;
