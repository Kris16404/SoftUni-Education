import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

import './createSong.css';
const CreateSong = () => {
  const [formData, setFormData] = useState({
    songName: '',
    description: '',
    album: '',
    creationYear: '',
    youtubeUrl: '',
    artist: '',
  });

  const [validation, setValidation] = useState({
    songName: false,
    description: false,
    album: false,
    creationYear: false,
    youtubeUrl: false,
    artist: false,
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset validation status when the user types
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the form as submitted
    setIsFormSubmitted(true);

    // Perform validation before submitting
    validateForm();

    // Check if the form is valid before submitting
    if (isFormValid()) {
      // Add logic to handle the submission of the form data
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  const validateForm = () => {
    const newValidation = { ...validation };

    // Add your validation logic here
    newValidation.songName =
      formData.songName.trim() !== '' && !(formData.songName.trim().length < 3);
    newValidation.description =
      formData.description.trim() !== '' &&
      !(formData.description.trim().length < 10);
    newValidation.album =
      formData.album.trim() !== '' && !(formData.album.trim().length < 3);
    newValidation.creationYear = /^\d{4}$/.test(formData.creationYear);
    newValidation.youtubeUrl = isValidUrl(formData.youtubeUrl);
    newValidation.artist =
      formData.artist.trim() !== '' && !(formData.artist.trim().length < 3);

    console.log(newValidation);
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
          label="Song Name"
          className={`mb-3 ${
            isFormSubmitted && !validation.songName ? 'invalid' : ''
          }`}
        >
          <Form.Control
            type="text"
            name="songName"
            placeholder="Freddie Dredd"
            value={formData.songName}
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
