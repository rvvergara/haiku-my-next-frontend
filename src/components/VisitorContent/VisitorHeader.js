import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const VisitorHeader = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">


        <Link href="/login"
      onClick={() => localStorage.clear()}
    >
        <Nav.Link href="/login">Login</Nav.Link>
  </Link>
        <Nav.Link href="#link">Link</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>


  // <Link href="/signup">
  //   <button
  //     type="button"
  //     className="authentication"
  //     onClick={() => localStorage.clear()}
  //   >
  //     Signup
  //   </button>
  // </Link>
);

export default VisitorHeader;
