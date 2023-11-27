import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navigation.css';

const Navigation = ({ isLogged }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Nav.Link
          as={Link}
          to="/"
          style={{ color: 'white' }}
          className="bold-nav-link nav-link-with-animation"
        >
          Music Finder
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
