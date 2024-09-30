import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components'; // Import useTheme from styled-components
import { SearchCard, SearchImgWrapper } from '../common/SearchCard';
import { StarIcon } from '../common/StarIcon';
import './ShowCard.css';

const ShowCard = ({ name, image, id, summary, onStar, isStarred }) => {
  const [isTileOpen, setIsTileOpen] = useState(false); // Tile visibility state
  const tileRef = useRef(null); // Ref for the tile content
  const theme = useTheme(); // Access the theme

  const summaryStripped = summary
    ? summary.split(' ').splice(0, 15).join(' ').replace(/<.+?>/g, '') + '...'
    : 'No Description';

  const toggleTile = () => {
    setIsTileOpen(prev => !prev);
  };

  // Close the tile when clicking outside of it
  useEffect(() => {
    const handleClickOutside = event => {
      if (tileRef.current && !tileRef.current.contains(event.target)) {
        setIsTileOpen(false);
      }
    };

    if (isTileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTileOpen]);

  const starRef = useRef();

  const handleStarClick = () => {
    onStar(id);
    const starBtnEl = starRef.current;

    if (!starBtnEl) return;

    if (isStarred) {
      starBtnEl.classList.remove('animate');
    } else {
      starBtnEl.classList.add('animate');
    }
  };

  return (
    <div>
      {/* Apply a custom class to blur the content conditionally */}
      <SearchCard>
        <SearchImgWrapper>
          <img alt={name} src={image} />
        </SearchImgWrapper>

        <StyledLink to={`/show/${id}/`} theme={theme}>
          <h1 style={{ color: ({ theme }) => theme.mainColors.grey }}>
            {name}
          </h1>
        </StyledLink>

        <div>
          {summary && summary !== 'No Description' && (
            <ActionSection theme={theme}>
              <div>
                {summaryStripped}
                <div className="readMore" onClick={toggleTile}>
                  Read more
                </div>
              </div>
              <StarBtn
                ref={starRef}
                type="button"
                onClick={handleStarClick}
                theme={theme}
              >
                <StarIcon active={isStarred} />
              </StarBtn>
            </ActionSection>
          )}
        </div>
      </SearchCard>

      {/* Overlay for the blurred background */}
      {isTileOpen && (
        <div className="overlay" onClick={() => setIsTileOpen(false)} />
      )}

      {/* Floating Tile for full summary */}
      {isTileOpen && summary && (
        <div
          className="tile-overlay"
          ref={tileRef}
          style={{ backgroundColor: theme.mainColors.background }}
        >
          <div
            className="tile-content"
            style={{
              color: theme.mainColors.shade,
            }}
          >
            <h2>{name}</h2>
            <p>{summary.replace(/<.+?>/g, '')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCard;

const ActionSection = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: ${({ theme }) => theme.mainColors.per};
  }

  a {
    color: ${({ theme }) => theme.mainColors.dark};
    &:hover {
      text-decoration-color: ${({ theme }) => theme.mainColors.grey};
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StarBtn = styled.button`
  outline: none;
  border: 1px solid ${({ theme }) => theme.mainColors.grey}; /* Border color based on theme */
  border-radius: 15px;
  padding: 5px 20px;
  background-color: ${({ theme }) =>
    theme.mainColors.light}; /* Button background based on theme */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }

  &.animate {
    ${StarIcon} {
      animation: increase 0.5s ease-in forwards;
      @keyframes increase {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(2) rotate(45deg);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }
`;
