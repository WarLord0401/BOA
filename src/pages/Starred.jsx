import { useQuery } from '@tanstack/react-query';
import { getShowsByIds } from '../api/tvmaze';
import { TextCenter } from '../Components/common/TextCenter';
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
    return <TextCenter>No Starred Shows Present</TextCenter>;
  }
  if (starredShowsError) {
    return <TextCenter>Error Occurred: {starredShowsError.message}</TextCenter>;
  }

  return <TextCenter>Loading...</TextCenter>;
};

export default Starred;
