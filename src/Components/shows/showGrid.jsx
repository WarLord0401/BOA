import { useStarredShows } from '../../lib/useStarredShows';
import ShowCard from './showCard';

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = useStarredShows();

  const onStar = showId => {
    const isStarred = starredShows.includes(showId);

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchStarred({ type: 'STAR', showId });
    }
  };

  return (
    <div>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image
              ? data.show.image.medium
              : '/no-poster-available.jpg'
          }
          summary={data.show.summary}
          onStar={onStar}
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </div>
  );
};

export default ShowGrid;
