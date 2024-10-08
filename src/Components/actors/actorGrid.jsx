import personNotFnd from '../../lib/person.jpg';
import { FlexGrid } from '../common/FlexGrid';
import ActorCard from './actorCard';

const ActorGrid = ({ actors }) => {
  return (
    <FlexGrid>
      {actors.map(data => (
        <ActorCard
          key={data.person.id}
          name={data.person.name}
          // Use the fallback image if the actor image is not available
          image={data.person.image ? data.person.image.medium : personNotFnd}
          gender={data.person.gender}
          country={data.person.country ? data.person.country.name : null}
          birthday={data.person.birthday}
          deathday={data.person.deathday}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
