import { useState } from 'react';
import { searchForPeople, searchForShows } from '../api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiErrorData] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();
    try {
      setApiErrorData(null);

      if (searchOption === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
    } catch (error) {
      setApiErrorData(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
    return null;
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <label>
          <input
            type="radio"
            name="search_option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
          Shows
        </label>
        <label>
          <input
            type="radio"
            name="search_option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
          Actors
        </label>

        <input type="text" value={searchStr} onChange={onSearchInputChange} />

        <button type="submit">Search</button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
