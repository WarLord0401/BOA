import { Link } from 'react-router-dom';
const ShowCard = ({ name, image, id, summary }) => {
  const summaryStripped = summary
    ? summary.split(' ').splice(0, 15).join(' ').replace(/<.+?>/g, '')
    : 'No Description';
  return (
    <div>
      <div>
        <img
          alt={name}
          src={image}
          style={{ width:'210px', height:'295px' }}
        />
      </div>
      <h1>{name}</h1>
      <p>{summaryStripped}</p>
      <div>
        <Link to="/">Read more...</Link>
        <button type="button"> Star me</button>
      </div>
    </div>
  );
};

export default ShowCard;
