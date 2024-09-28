import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { searchForPeople, searchForShows } from '../api/tvmaze';
import ActorGrid from '../Components/actors/actorGrid';
import { TextCenter } from '../Components/common/TextCenter';
import SearchForm from '../Components/searchForm';
import ShowGrid from '../Components/shows/showGrid';

const Home = () => {
  const [filter, setFilter] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams({ q, searchOption });
  };

  const onReset = () => {
    setFilter(null);
    setSearchParams({});
  };

  const renderApiData = () => {
    if (isFetching) {
      return <TextCenter>Loading...</TextCenter>;
    }

    if (apiDataError) {
      return <TextCenter>Error Occurred: {apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>Please enter valid text...</TextCenter>;
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
      <Wrapper>
        <div>
          <SearchForm
            onSearch={onSearch}
            onReset={onReset}
            initialQuery={filter?.q}
            initialSearchOption={filter?.searchOption}
          />
        </div>
      </Wrapper>
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;

const Wrapper = styled.div`
  justify-content: center;
  margin-bottom: 35px;
  display: flex;
`;
