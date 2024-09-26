import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import Cast from '../Components/Cast';
import Seasons from '../Components/Seasons';
import Details from '../Components/shows/details';
import ShowMainData from '../Components/shows/showMainData';

const Show = () => {
  const { showId } = useParams();
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  const navigateTo = useNavigate();
  const HomePage = () => {
    navigateTo('/');
  };
  const Back = () => {
    navigateTo(-1);
  };

  if (showError) {
    return <div>We have an Error...{showError.message}</div>;
  }

  if (showData) {
    return (
      <div>
        <button type="button" onClick={HomePage}>
          Home Page
        </button>
        <button type="button" onClick={Back}>
          Go Back
        </button>
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <Details
          status={showData.status}
          premiered={showData.premiered}
          network={showData.network}
        />
        <div>
          <h2>Seasons:</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </div>
        <div>
          <h2>Cast: </h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

export default Show;
