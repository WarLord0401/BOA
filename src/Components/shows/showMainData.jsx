import './ShowMainData.css';

const ShowMainData = ({ image, name, rating, summary, genres }) => {
  return (
    <div className="page">
      <img
        src={image ? image.original : '/no-poster-available.jpg'}
        alt={name}
      />
      <div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <span>
            <b>{'Rating: '}</b>
            {rating && rating.average ? `${rating.average}/10` : 'N/A'}
          </span>{' '}
          <span>
            <b>{'Genres:'}</b>
            {genres.map(genre => (
              <span key={genre}>{genre} </span>
            ))}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: summary }} />
      </div>
    </div>
  );
};

export default ShowMainData;
