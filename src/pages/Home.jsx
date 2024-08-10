import { useState } from 'react';

const Home = () => {
  const [searchStr, setStrValue] = useState('');

  const onSearchInputChange = ev => {
    setStrValue(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();
    const  response = await fetch('https://ghibliapi.herokuapp.com/films')
    const body = await response.json()
      .then(response => response.json())
      .then(body => console.log(body));
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Home;
