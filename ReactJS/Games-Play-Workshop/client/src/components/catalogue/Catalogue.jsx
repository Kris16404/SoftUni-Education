import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService.js';
import GameArticle from '../game/GameArticle.jsx';

const Catalogue = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAllGames().then((result) => setGames(result));
  }, []);

  return (
    <section id="catalog-page">
      <h1>All Games</h1>
      {/* <!-- Display div: with information about every game (if any) --> */}
      {games.map((game) => (
        <GameArticle
          key={game._id}
          title={game.title}
          category={game.category}
          imageUrl={game.imageUrl}
          _id={game._id}
        />
      ))}
      {/* <!-- Display paragraph: If there is no games  --> */}
      {games.length === 0 && <h3 className="no-articles">No articles yet</h3>}
    </section>
  );
};

export default Catalogue;
