import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './ShowCard.css'; // Add your CSS styles here

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const ShowCard = ({ name, image, id, summary }) => {
  const [isTileOpen, setIsTileOpen] = useState(false); // Tile visibility state
  const tileRef = useRef(null); // Ref for the tile content
  const readMoreRef = useRef(null); // Ref for the "Read more" text
  const cardRef = useRef(null); // Ref for the entire container

  const summaryStripped = summary
    ? summary.split(' ').splice(0, 10).join(' ').replace(/<.+?>/g, '')
    : 'No Description';

  const toggleTile = () => {
    setIsTileOpen(!isTileOpen);
  };

  // Close the tile if the mouse moves away from the "Read more" text or tile
  useEffect(() => {
    const handleMouseLeave = e => {
      if (cardRef.current && !cardRef.current.contains(e.relatedTarget)) {
        setIsTileOpen(false);
      }
    };

    const currentCardRef = cardRef.current; // Capture the current value of the ref

    if (currentCardRef) {
      currentCardRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentCardRef) {
        currentCardRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isTileOpen]);

  return (
    <div
      ref={cardRef}
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      <div>
        <img
          alt={name}
          src={image}
          style={{ width: '210px', height: '295px' }}
        />
      </div>
      <div style={{ marginLeft: '20px', flexGrow: 1 }}>
        <StyledLink to={`/show/${id}`}>
          <h1>{name}</h1>
        </StyledLink>
        <p>
          {summaryStripped}...
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p
              className="readMore"
              onClick={toggleTile}
              ref={readMoreRef}
              style={{ marginRight: '10px' }} // Space between "Read more" and the tile
            >
              Read more
            </p>
            <button type="button"> Star me</button>
          </div>
        </p>

        {/* Floating Tile for full summary */}
        {isTileOpen && (
          <div
            className="tile-overlay"
            style={{
              position: 'absolute',
              top: readMoreRef.current?.offsetTop,
              left:
                readMoreRef.current?.offsetLeft +
                readMoreRef.current?.offsetWidth +
                10, // Position to the right of "Read more"
              transform: 'translateY(10px)', // Adjust vertical position if needed
            }}
          >
            <div className="tile-content" ref={tileRef}>
              <h2>Full Summary</h2>
              <p>{summary.replace(/<.+?>/g, '')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
