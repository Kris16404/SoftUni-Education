import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './communityListSong.css';

const CommunityListSong = ({ song }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }} className="card">
      <Card.Body>
        <Card.Title className="card-title">{song.title}</Card.Title>
        <Card.Text className="card-text">{`Artist: ${song.artist}`}</Card.Text>
        <Link to={`/songs/${song._id}`}>
          <Button variant="primary" className="button-primary">
            Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CommunityListSong;
