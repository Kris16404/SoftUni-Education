import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';
import { Button } from 'react-bootstrap';

import DeleteSongModal from '../songModals/DeleteSongModal.jsx';
import Spinner from '../spinner/Spinner.jsx';
import * as songService from '../../services/songService.js';
import './songDetails.css';

const SongDetails = () => {
  const [song, setSong] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { songId } = useParams();
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const showButtons = authToken
    ? authToken.userId === song.ownerId
      ? true
      : false
    : false;

  useEffect(() => {
    songService
      .getSongById(songId)
      .then((song) => {
        const isValid = validateSong(song);

        if (isValid) {
          setSong(song);
        } else {
          navigate('/404');
        }
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const validateSong = (song) => {
    if (song.code) {
      return false;
    }
    return true;
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    await songService.deleteSong(song._id, authToken);
    // Close the modal after deletion
    handleCloseDeleteModal();
    navigate('/community/all');
  };

  return (
    <div className="overlay">
      {loading && <Spinner />}

      {!loading && (
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
            <p>
              <strong>Created By:</strong> {song.createdBy}
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
                <Button onClick={handleShowDeleteModal} variant="danger">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <DeleteSongModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SongDetails;
