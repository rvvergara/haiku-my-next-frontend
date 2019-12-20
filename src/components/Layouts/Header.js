import Navbar from 'react-bootstrap/Navbar';
import CollapsibleNav from './CollapsibleNav';

export const Header = () => (
  <header>
    <Navbar
      bg='light'
      expand='lg'
      className="logged-nav"
    >
      <div className="container">
        <Navbar.Brand href='/'>
          <img
            src="./static/igaku_social_logo_text.png"
            className="header-logo-small"
            alt="Igaku Logo"
          />
          <img
            src="./static/igaku_logo_side_by_side_text_shadow.png"
            className="header-logo-text logged-header-logo-text"
            alt="Igaku Logo"
          />
        </Navbar.Brand>
        <CollapsibleNav />
      </div>
    </Navbar>
  </header>
  );

export default Header;
