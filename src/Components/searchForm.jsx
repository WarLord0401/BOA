import { useState } from 'react';
import { useStr } from '../lib/useSearchStr';
import CustomRadio from './CustomRadio';

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
      <input type="text" value={searchStr} onChange={onSearchInputChange} />

      <CustomRadio
        label="Shows"
        name="search_option"
        value="shows"
        checked={searchOption === 'shows'}
        onChange={onRadioChange}
      />

      <CustomRadio
        label="Actors"
        name="search_option"
        value="actors"
        checked={searchOption === 'actors'}
        onChange={onRadioChange}
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
