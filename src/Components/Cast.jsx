const Cast = ({ cast }) => {
  return (
    <div>
      {cast.map(({ person, character, voice }) => (
        <div key={person.id}>
          <div>
            <img src={person.image ? person.image.medium : '/person.jpg'} />
            <div>
              {person.name} | {character.name} {voice && '| VoiceOver'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cast;
