import { Container } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <p className="footer-p">
          This website is made for educational purposes
        </p>
        <p>(For some reason seeded data cannot be edited nor deleted)</p>
      </Container>
    </footer>
  );
};

export default Footer;
