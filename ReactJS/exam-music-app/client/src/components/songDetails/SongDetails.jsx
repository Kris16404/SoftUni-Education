import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as songService from '../../services/songService.js';
import './songDetails.css';

const SongDetails = () => {
  const [song, setSong] = useState({});
  const { songId } = useParams();

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
              frameBorder="0"
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
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
