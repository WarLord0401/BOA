import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SearchCard, SearchImgWrapper } from '../common/SearchCard';
import { StarIcon } from '../common/StarIcon';
import './ShowCard.css';

const ShowCard = ({ name, image, id, summary, onStar, isStarred }) => {
  const [isTileOpen, setIsTileOpen] = useState(false); // Tile visibility state
  const tileRef = useRef(null); // Ref for the tile content

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

        <StyledLink to={`/show/${id}/`} target="_blank" rel="noreferrer">
          <h1>{name}</h1>
        </StyledLink>

        <div>
          {summary && summary !== 'No Description' && (
            <ActionSection>
              <div>
                <p>
                  {summaryStripped}{' '}
                  <div className="readMore" onClick={toggleTile}>
                    Read more
                  </div>
                </p>
              </div>
              <StarBtn ref={starRef} type="button" onClick={handleStarClick()}>
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
        <div className="tile-overlay" ref={tileRef}>
          <div className="tile-content">
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
  a {
    text-decoration-color: #000;
    color: #000;
    &:hover {
      text-decoration-color: blue;
      color: blue;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const StarBtn = styled.button`
  outline: none;
  border: 1px solid #8e8e8e;
  border-radius: 15px;
  padding: 5px 20px;
  background-color: #fff;
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
