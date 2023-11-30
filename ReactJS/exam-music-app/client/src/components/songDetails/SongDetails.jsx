import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';
import { Button } from 'react-bootstrap';

import * as songService from '../../services/songService.js';
import './songDetails.css';

const SongDetails = () => {
  const [song, setSong] = useState({});
  const { songId } = useParams();
  const { authToken } = useAuth();
  const showButtons = authToken.userId === song.ownerId;

  useEffect(() => {
    songService
      .getSongById(songId)
      .then((song) => setSong(song))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="overlay">
      <div className="song-details-box">
        {/* YouTube Player on the left */}
        {song.youtubeId && (
          <div className="youtube-player">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${song.youtubeId}`}
              title="YouTube Video Player"
              allowFullScreen
            />
          </div>
        )}

        {/* Song Properties on the right */}
        <div className="song-properties">
          <h2>
            <strong>Title: </strong> {song.title}
          </h2>
          <p>
            <strong>Artist:</strong> {song.artist}
          </p>
          <p>
            <strong>Album:</strong> {song.album}
          </p>
          <p>
            <strong>Year:</strong> {song.creationYear}
          </p>
          <p>
            <strong>Description:</strong> {song.description}
          </p>
          {showButtons && (
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button
                as={Link}
                to={`/songs/edit/${song._id}`}
                variant="primary"
              >
                Edit
              </Button>{' '}
              <Button
                as={Link}
                to={`/songs/delete/${song._id}`}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
