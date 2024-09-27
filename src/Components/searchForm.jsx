import { useState } from 'react';
import { useStr } from '../lib/useSearchStr';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useStr();
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

      <input
        type="text"
        value={searchStr}
        onChange={onSearchInputChange}
        style={{ marginLeft: 10 }}
      />

      <button
        type="submit"
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: 10,
        }}
      >
        Search
      </button>
    </form>
  );
};
export default SearchForm;
