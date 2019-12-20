import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../../store/thunks/user';

export const CollapsibleNav = ({
  currentUserData,
  logout,
}) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const { firstName, role } = currentUserData;
  return (
    <div>
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
);
};

CollapsibleNav.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { logout })(CollapsibleNav);
