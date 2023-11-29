import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './createSong.css';
import * as songService from '../../services/songService.js';
import { useAuth } from '../../contexts/authContext.jsx';

const CreateSong = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    album: '',
    creationYear: '',
    youtubeUrl: '',
    artist: '',
  });

  const [validation, setValidation] = useState({
    title: false,
    description: false,
    album: false,
    creationYear: false,
    youtubeUrl: false,
    artist: false,
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate the form whenever formData changes
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    isFormValid();
    // Reset validation status when the user types
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the form as submitted
    setIsFormSubmitted(true);

    // Perform validation before submitting
    validateForm();

    // Check if the form is valid before submitting
    if (isFormValid()) {
      try {
        const result = await songService.createSong(
          authToken,
          formData.title,
          formData.artist,
          formData.album,
          formData.creationYear,
          formData.youtubeUrl,
          formData.description
        );

        navigate('/community/all');
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const validateForm = () => {
    const newValidation = { ...validation };

    // Add your validation logic here
    newValidation.title =
      formData.title.trim() !== '' && !(formData.title.trim().length < 3);
    newValidation.description =
      formData.description.trim() !== '' &&
      !(formData.description.trim().length < 10);
    newValidation.album =
      formData.album.trim() !== '' && !(formData.album.trim().length < 3);
    newValidation.creationYear = /^\d{4}$/.test(formData.creationYear);
    newValidation.youtubeUrl = isValidUrl(formData.youtubeUrl);
    newValidation.artist =
      formData.artist.trim() !== '' && !(formData.artist.trim().length < 3);

    setValidation(newValidation);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isFormValid = () => {
    // Check if all fields are valid
    return Object.values(validation).every((isValid) => isValid);
  };
  return (
    <div className="create-post-container">
      <h2>Create a New Song</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="formSongName"
          label="Song Title"
          className={`mb-3 ${
            isFormSubmitted && !validation.title ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="text"
            name="title"
            placeholder="Freddie Dredd"
            value={formData.title}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="formAlbum"
          label="Artist"
          className={`mb-3 ${
            isFormSubmitted && !validation.artist ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="text"
            name="artist"
            placeholder="Cool cover tho"
            value={formData.artist}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="formAlbum"
          label="Album"
          className={`mb-3 ${
            isFormSubmitted && !validation.album ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="text"
            name="album"
            placeholder="Cool cover tho"
            value={formData.album}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="formCreationYear"
          label="Creation Year"
          className={`mb-3 ${
            isFormSubmitted && !validation.creationYear ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="number"
            name="creationYear"
            placeholder="2021"
            value={formData.creationYear}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="formYoutubeUrl"
          label="YouTube URL"
          className={`mb-3 ${
            isFormSubmitted && !validation.youtubeUrl ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="text"
            name="youtubeUrl"
            placeholder="https://www.youtube.com/watch?example"
            value={formData.youtubeUrl}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="formDescription"
          label="Description"
          className={`mb-3 ${
            isFormSubmitted && !validation.description ? 'invalid' : ''
          }`}
        >
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="It is indeed a very cool song"
            value={formData.description}
            onChange={handleChange}
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Create Song
        </Button>
      </Form>
    </div>
  );
};

export default CreateSong;
