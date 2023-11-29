import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';

import './home.css';

const Home = () => {
  const { authToken } = useAuth();

  return (
    <Container className="home-container">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="jumbotron">
            <h1>Welcome to Your Music Collection</h1>
            <p>
              Explore, manage, and enjoy your favorite music all in one place.
            </p>
            <p>
              <Button
                as={Link}
                variant="primary"
                to={authToken ? '/songs/add-song' : '/users/login'}
              >
                Get Started
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
