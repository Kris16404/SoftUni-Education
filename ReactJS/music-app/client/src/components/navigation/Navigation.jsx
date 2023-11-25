import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';

import './navigation.css';

const Navigation = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          href="#home"
          style={{ color: 'white' }}
          className="nav-link-with-animation"
        >
          Music Finder
        </Navbar.Brand>
        <Nav className="me-auto">
          {isLogged ? (
            <>
              <Nav.Link
                href="#pricing"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
                onClick={() => setIsLogged(false)}
              >
                Logout
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                My Songs
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Find Songs
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                href="#home"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
                onClick={() => setIsLogged(true)}
              >
                Login
              </Nav.Link>
              <Nav.Link
                href="#features"
                style={{ color: 'white' }}
                className="nav-link-with-animation"
              >
                Register
              </Nav.Link>
            </>
          )}

          <Nav.Link
            href="#pricing"
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
