import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import HeaderBrand from './HeaderBrand';
import CollapsibleNav from './CollapsibleNav';

export const Header = () => (
  <header>
    <Navbar
      bg='light'
      expand='lg'
      className="logged-nav"
    >
      <Container fluid>
        <HeaderBrand />
        <CollapsibleNav />
      </Container>
    </Navbar>
  </header>
  );

export default Header;
