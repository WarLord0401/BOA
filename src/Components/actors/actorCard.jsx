import { SearchCard, SearchImgWrapper } from '../common/SearchCard';

const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img
          alt={name}
          src={image}
        />
      </SearchImgWrapper>
      <h1>
        {name} <small>{!!gender && `(${gender})`}</small>
      </h1>
      <p>{country ? `Comes from ${country}` : `No Country known`}</p>
      {!!birthday && <p> Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : `Alive`}</p>
    </SearchCard>
  );
};

export default ActorCard;
