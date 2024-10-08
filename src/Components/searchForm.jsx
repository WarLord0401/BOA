import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStr } from '../lib/useSearchStr';
import CustomRadio from './CustomRadio';

const SearchForm = ({ onSearch, onReset }) => {
  const [searchStr, setSearchStr] = useStr();
  const [searchOption, setSearchOption] = useState('shows');

  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params on page load or when the location changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q') || '';
    const option = queryParams.get('searchOption') || 'shows';

    setSearchStr(q);
    setSearchOption(option);
  }, [location.search, setSearchStr]);

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

    // Update the URL with query parameters
    navigate(
      `/?q=${encodeURIComponent(searchStr)}&searchOption=${searchOption}`
    );

    onSearch(options);
  };

  return (
    <Form onSubmit={onSubmit}>
      <SearchInput
        type="text"
        placeholder={`Search ${searchOption}`}
        value={searchStr}
        onChange={onSearchInputChange}
      />

      <RadiosWrapper>
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
      </RadiosWrapper>

      <ButtonsWrapper>
        <button type="submit">Search</button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </ButtonsWrapper>
    </Form>
  );
};

export default SearchForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  display: block;
  font-family: 'Roboto', sans-serif;
  width: 200px;
  margin: auto;
  outline: none;
  padding: 13px 15px;
  border: 1px solid ${({ theme }) => theme.mainColors.shade};
  box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);
  font-size: 14px;
  border-radius: 12px;
  color: ${({ theme }) => theme.mainColors.grey};

  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.mainColors.grey};
  }
`;

const RadiosWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  label {
    margin: 0 15px;
    color: ${({ theme }) =>
      theme.mainColors.shade}; /* Change color based on theme */
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    color: ${({ theme }) => theme.mainColors.light};
    background-color: ${({ theme }) => theme.mainColors.shade};
    padding: 10px 20px;
    font-size: 15px;
    border: none;
    outline: none;
    border-radius: 12px;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.mainColors.grey};
    }

    &:active {
      background-color: ${({ theme }) => theme.mainColors.shade};
      color: ${({ theme }) => theme.mainColors.grey};
    }
  }
`;
