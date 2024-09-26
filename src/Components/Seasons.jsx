const Seasons = ({ seasons }) => {
  return (
    <div>
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
      <div>
        {seasons.map(season => (
          <div key={season.id}>
            <p>
              <span>
                <b>Season: </b> {season.number}
              </span>{' '}
              <span>
                <b>Episodes: </b>
                {season.episodeOrder}
              </span>
            </p>

            <div>
              <b>Aired:</b> {season.premiereDate} to {season.endDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Seasons;
