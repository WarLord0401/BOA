import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getShowById } from '../api/tvmaze';
import { Hamburger } from '../Components/common/Hamburger';
import { TextCenter } from '../Components/common/TextCenter';
import useMediaQuery from '../Components/MediaQuery'; // Import the custom hook
import Cast from '../Components/shows/Cast';
import Details from '../Components/shows/details';
import Seasons from '../Components/shows/Seasons';
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

  // Use the custom media query hook to determine screen size
  const isWideScreen = useMediaQuery('(min-width: 769px)');

  if (showError) {
    return <TextCenter>We have an Error...{showError.message}</TextCenter>;
  }

  if (showData) {
    return (
      <ShowPageWrapper>
        {/* Display BackHomeWrapper when screen size is wide enough */}
        {isWideScreen ? (
          <BackHomeWrapper>
            <ul>
              <li>
                <button type="button" onClick={HomePage}>
                  Home Page
                </button>
              </li>
              <li className="separator">|</li>
              <li>
                <button type="button" onClick={Back}>
                  Go Back
                </button>
              </li>
            </ul>
          </BackHomeWrapper>
        ) : (
          <Hamburger />
        )}
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <InfoBlock>
          <h2>Details:</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </InfoBlock>
        <InfoBlock>
          <h2>Seasons:</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </InfoBlock>
        <InfoBlock>
          <h2>Cast: </h2>
          {showData._embedded &&
          showData._embedded.cast &&
          showData._embedded.cast.length > 0 ? (
            <Cast cast={showData._embedded.cast} />
          ) : (
            <p>N/A</p>
          )}
        </InfoBlock>
      </ShowPageWrapper>
    );
  }

  return <TextCenter>loading...</TextCenter>;
};

export default Show;

const BackHomeWrapper = styled.div`
  margin-top: -75px;
  padding-bottom: 30px;
  text-align: left;
  width: fit-content;

  ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0;
    display: flex; /* Flexbox to align items horizontally */
    gap: 10px; /* Space between items */
  }

  li {
    display: inline; /* Ensure list items are inline */
  }

  button {
    width: 3cm;
    padding-inline: 2px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.mainColors.shade};
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    transition:
      color 0.3s ease,
      text-decoration 0.3s ease;

    &:hover {
      border-radius: 5px;
      color: ${({ theme }) => theme.mainColors.light};
      background-color: ${({ theme }) => theme.mainColors.shade};
      text-decoration: underline;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    }

    &:focus {
      outline: none; /* Remove focus outline */
    }

    &:active {
      color: ${({ theme }) => theme.mainColors.dark};
      background-color: ${({ theme }) => theme.mainColors.shade};
    }
  }

  .separator {
    color: ${({ theme }) =>
      theme.mainColors.dark}; /* Set color for separator */
    margin: 0 10px; /* Space around separator */
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  max-width: 1000px; /* Maximum width for larger screens */
  padding: 10px; /* Add padding for spacing */
  background-color: ${({ theme }) => theme.mainColors.background};
  color: ${({ theme }) => theme.mainColors.shade};

  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;

  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
