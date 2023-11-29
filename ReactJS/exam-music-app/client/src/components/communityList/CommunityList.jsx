import { useState, useEffect } from 'react';

import * as songService from '../../services/songService.js';
import CommunityListSong from '../communityListSong/CommunityListSong.jsx';
import './communityList.css';

const CommunityList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    songService
      .getAllSongs()
      .then((data) =>
        setSongs(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      );
  }, []);

  return (
    <div className="posts-container">
      <h1 className="header">Latest Added Songs</h1>
      <div className="post-cards">
        {songs.map((song) => (
          <CommunityListSong key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
