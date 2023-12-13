import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './communityListSong.css';

const CommunityListSong = ({ song }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  // !! Paste you youtube v3 api here
  const apiKey = '';
  const youtubeId = song.youtubeId;

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${apiKey}`
        );
        const data = await response.json();

        // Get the thumbnail URL from the API response
        const url = data.items[0]?.snippet?.thumbnails?.default?.url || '';

        // Set the thumbnail URL in the state
        setThumbnailUrl(url);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
    };

    // Fetch the thumbnail when the component mounts
    fetchThumbnail();
  }, [apiKey, youtubeId]);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={thumbnailUrl}
        placeholder="Youtube thumbnail"
      />
      <Card.Body>
        <Card.Title>{song.title}</Card.Title>
        <Card.Text>Artist: {song.artist}</Card.Text>
        <Button as={Link} to={`/songs/${song._id}`} variant="primary">
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CommunityListSong;
