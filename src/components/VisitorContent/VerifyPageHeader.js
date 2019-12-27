import Navbar from 'react-bootstrap/Navbar';

const VerifyPageHeader = () => (
  <header>
    <Navbar
      bg="light"
      expand="sm"
      className='verification-header-nav'
    >
      <Navbar.Brand href="/">
        <img
          src="./static/igaku_logo_side_by_side.png"
          className="verification-header-logo"
          alt="Igaku Logo"
        />
      </Navbar.Brand>
    </Navbar>
  </header>
);

export default VerifyPageHeader;
