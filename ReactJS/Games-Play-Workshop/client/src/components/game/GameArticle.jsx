import { Link } from 'react-router-dom';

const GameArticle = ({ title, category, imageUrl, _id }) => {
  return (
    <div className="allGames">
      <div className="allGames-info">
        <img src={imageUrl} />
        <h6>{title}</h6>
        <h2>{category}</h2>
        <Link to={`/details/${_id}`} className="details-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default GameArticle;
