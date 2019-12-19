import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const VisitorHeader = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <img
        src="./static/igaku_social_logo_text.png"
        className='header-logo'
        alt="Igaku Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link href="/login">
          <Nav.Link
            className='purplish-blue'
            onClick={() => localStorage.clear()}
            href="/login"
          >
            Login
          </Nav.Link>
        </Link>
        <Link href="/signup">
          <Nav.Link
            type="button"
            className="authentication"
            href='/signup'
            onClick={() => localStorage.clear()}
          >
            Signup
          </Nav.Link>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default VisitorHeader;
