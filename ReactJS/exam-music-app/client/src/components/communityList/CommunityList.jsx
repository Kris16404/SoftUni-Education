import { useState, useEffect } from 'react';

import * as songService from '../../services/songService.js';
import CommunityListSong from '../communityListSong/CommunityListSong.jsx';
import './communityList.css';
import { Spinner } from 'react-bootstrap';

const CommunityList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    songService
      .getAllSongs()
      .then((data) =>
        setSongs(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      )
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="posts-container">
      <h1 className="header">Latest Added Songs</h1>
      {loading && <Spinner />}
      {!loading && (
        <div className="post-cards">
          {songs.length !== 0 ? (
            songs.map((song) => (
              <CommunityListSong key={song._id} song={song} />
            ))
          ) : (
            <h1 className="no-songs">There are no songs added Yet.</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityList;
