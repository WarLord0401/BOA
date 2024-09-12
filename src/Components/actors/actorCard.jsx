const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
  return (
    <div>
      <div>
        <img
          alt={name}
          src={image}
          style={{ width: '210px', height: '295px' }}
        />
      </div>
      <h1>
        {name} <small>{!!gender && `(${gender})`}</small>
      </h1>
      <p>{country ? `Comes from ${country}` : `No Country known`}</p>
      {!!birthday && <p> Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : `Alive`}</p>
    </div>
  );
};

export default ActorCard;
