import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext.jsx';
import * as userService from '../../services/userService.js';
import './navigation.css';

const Navigation = () => {
  const { authToken, removeToken } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const isSuccessful = await userService.logout(authToken);
    if (!isSuccessful) {
      console.log('SMTH WENT WRONG WHEN LOGGING OUT');
    } else {
      removeToken();
      navigate('/');
    }
  };

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
            {authToken ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/users/me"
                  style={{ color: 'white' }}
                  className="nav-link-with-animation"
                >
                  Hello, {authToken.userUsername}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/songs/add-song"
                  style={{ color: 'white' }}
                  className="nav-link-with-animation"
                >
                  Post Song
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/community/all"
                  style={{ color: 'white' }}
                  className="nav-link-with-animation"
                >
                  Community
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/users/logout"
                  style={{ color: 'white' }}
                  className="nav-link-with-animation"
                  onClick={logout}
                >
                  Logout
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
                <Nav.Link
                  as={Link}
                  to="/community/all"
                  style={{ color: 'white' }}
                  className="nav-link-with-animation"
                >
                  Community
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
