import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../../store/thunks/user';

export const Header = ({ logout, currentUserData }) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const { firstName, role } = currentUserData;

  return (
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
          >
            <Nav className="ml-auto">
              <div className="header__links__welcome">
                <strong className="logged-header-greeting">
                  Welcome
                  {' '}
                  { role === 'practitioner' ? 'Dr. ' : ''}
                  {firstName}
                </strong>
              </div>
              <Nav.Link
                type="button"
                className="theme-button inverse-theme-button"
                onClick={handleLogout}
              >
              Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { logout })(Header);
