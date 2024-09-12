import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useState('');
  const [searchOption, setSearchOption] = useState('shows');

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: searchStr,
      searchOption,
    };
    onSearch(options);
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};
export default SearchForm;
