import styled from 'styled-components';

const Seasons = ({ seasons }) => {
  return (
    <SeasonsWrapper>
      <div>
        <span>
          <b style={{ fontSize: 20 }}>
            Total Seasons: {seasons.length}
            {', '}
          </b>
        </span>

        <span>
          <b style={{ fontSize: 20 }}>
            Total episodes:{' '}
            {seasons.reduce((sum, seasons) => sum + seasons.episodeOrder, 0)}
          </b>
        </span>
      </div>
      <SeasonList>
        {seasons.map(season => (
          <div key={season.id} className="season-item">
            <p className="left">
              <span>
                <b>Season: </b> {season.number}
              </span>
              <span>
                {' '}
                <b> Episodes: </b>
                {season.episodeOrder}
              </span>
            </p>

            <div className="right">
              Aired: {season.premiereDate} to {season.endDate}
            </div>
          </div>
        ))}
      </SeasonList>
    </SeasonsWrapper>
  );
};
export default Seasons;

const SeasonsWrapper = styled.div`
  p {
    margin: 5px 0;
  }
`;

const SeasonList = styled.div`
  display: flex;
  flex-direction: column;
  .season-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      flex: 0 0 30%;
      border-right: 1px solid #b0b0b0;
      padding-right: 20px;
      word-spacing: 5px;
    }
    .right {
      padding-left: 20px;
      flex: 1;
    }
  }
`;
