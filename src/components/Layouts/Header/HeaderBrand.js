import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';

const HeaderBrand = () => (
  <Navbar.Brand href="/">
    <Link href='/'>
      <img
        src="/static/igaku_logo_side_by_side_text_shadow.png"
        className="header-logo-text logged-header-logo-text"
        alt="Igaku Logo"
      />
    </Link>
  </Navbar.Brand>
);

export default HeaderBrand;
