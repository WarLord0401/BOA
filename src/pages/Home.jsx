import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchForPeople, searchForShows } from '../api/tvmaze';
import ActorGrid from '../Components/actors/actorGrid';
import SearchForm from '../Components/searchForm';
import ShowGrid from '../Components/shows/showGrid';

const Home = () => {
  const [filter, setFilter] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract search params from URL if available
  useEffect(() => {
    const q = searchParams.get('q');
    const searchOption = searchParams.get('searchOption');
    if (q && searchOption) {
      setFilter({ q, searchOption });
    }
  }, [searchParams]);

  const {
    data: apiData,
    error: apiDataError,
    isFetching,
  } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter?.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = ({ q, searchOption }) => {
    setFilter({ q, searchOption });
    // Set URL parameters to persist the search state
    setSearchParams({ q, searchOption });
  };

  const onReset = () => {
    setFilter(null);
    setSearchParams({});
  };

  const renderApiData = () => {
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (apiDataError) {
      return <div>Error Occurred: {apiDataError.message}</div>;
    }

    if (apiData?.length === 0) {
      return <div>Please enter valid text...</div>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorGrid actors={apiData} />
      );
    }

    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <SearchForm
          onSearch={onSearch}
          initialQuery={filter?.q}
          initialSearchOption={filter?.searchOption}
        />
        <button
          onClick={onReset}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
