import { Container, Row, Col, Button } from 'react-bootstrap';

import './home.css';

const Home = () => {
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
              <Button variant="primary">Get Started</Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
