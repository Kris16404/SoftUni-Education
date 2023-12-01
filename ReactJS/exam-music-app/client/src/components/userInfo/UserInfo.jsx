import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './userInfo.css';
import CommunityListSong from '../communityListSong/CommunityListSong.jsx';
import * as songService from '../../services/songService.js';
import { useAuth } from '../../contexts/authContext.jsx';

const UserInfo = () => {
  const [songs, setSongs] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    songService
      .getAllSongsByUserId(authToken)
      .then((songs) => setSongs(songs))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user-info-container">
      <div className="container">
        <div className="left-box">
          <h2>
            <strong>User Info</strong>
          </h2>
          <p>
            <strong>Email:</strong> {authToken.userEmail}
          </p>
          <p>
            <strong>Username:</strong> {authToken.userUsername}
          </p>
          <p>
            <strong>Added Songs:</strong> {songs.length}
          </p>
        </div>
        <div className="right-box">
          <h2>
            <strong>My Songs</strong>
          </h2>
          <div className="cards-container">
            {songs.length !== 0 ? (
              songs.map((song) => (
                <CommunityListSong key={song._id} song={song} />
              ))
            ) : (
              <div className="no-songs-message">
                <h2>
                  <strong>No songs added yet</strong>
                </h2>
                <Button as={Link} to={'/songs/add-song'}>
                  Add your first song
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
