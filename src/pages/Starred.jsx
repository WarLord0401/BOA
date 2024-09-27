import { useQuery } from '@tanstack/react-query';
import { getShowsByIds } from '../api/tvmaze';
import ShowGrid from '../Components/shows/showGrid';
import { useStarredShows } from '../lib/useStarredShows';

const Starred = () => {
  const [starredShowsIds] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn: () =>
      getShowsByIds(starredShowsIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }
  if (starredShows?.length === 0) {
    return <div>No Starred Shows Present</div>;
  }
  if (starredShowsError) {
    return <div>Error Occurred: {starredShowsError.message}</div>;
  }

  return <div>Loading...</div>;
};

export default Starred;
