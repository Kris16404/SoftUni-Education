import { Form, FloatingLabel } from 'react-bootstrap';
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
    <div className="info-container">
      <div className="info-box-container">
        <div className="info-box">
          {/* YouTube player container on the left */}
          <div className="youtube-player">
            {/* Include your YouTube player component or iframe here */}
            {/* Example iframe: */}
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${song.youtubeVideoId}`}
              title="YouTube Video Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          {/* Info property template */}
          <div className="info-property">
            <div className="label">Title:</div>
            <p className="label-p">{song.title}</p>
          </div>
          <div className="info-property">
            <div className="label">Artist:</div>
            <p className="label-p">{song.artist}</p>
          </div>
          <div className="info-property">
            <div className="label">Album:</div>
            <p className="label-p">{song.album}</p>
          </div>
          <div className="info-property">
            <div className="label">Year Of Creation:</div>
            <p className="label-p">{song.creationYear}</p>
          </div>
          <div className="info-property">
            <div className="label">Description:</div>
            <p className="label-p">
              asdffasdfsadfgsfdgfsdgdsfgdsfgdssadfsdadfsasad
            </p>
          </div>
          {/* Repeat this pattern for additional properties */}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
