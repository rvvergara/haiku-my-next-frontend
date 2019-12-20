import Navbar from 'react-bootstrap/Navbar';

const HeaderBrand = () => (
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
);

export default HeaderBrand;
