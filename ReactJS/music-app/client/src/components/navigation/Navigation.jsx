import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navigation.css';

const Navigation = ({ isLogged }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: 'white' }}
          className="nav-link-with-animation"
        >
          Music Finder
        </Navbar.Brand>
        <Nav className="me-auto">
          {isLogged ? (
            <>
              <Nav.Link
                as={Link}
                to="/users/logout"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Logout
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/songs/my-songs"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                My Songs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/songs/find-songs"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Find Songs
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="/users/login"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/users/register"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Register
              </Nav.Link>
            </>
          )}

          <Nav.Link
            as={Link}
            to="/community/all"
            style={{ color: 'white' }}
            className="nav-link-with-animation"
          >
            Community
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
