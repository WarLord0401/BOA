import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home Page
      <br />
      <Link to="/starred"> Go to Starred Page</Link>
    </div>
  );
};
export default Home;
