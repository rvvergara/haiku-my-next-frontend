import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/thunks/user';
import PatientNavLinks from './Sidebars/PatientNavLinks';

export const Header = ({ logout, currentUserData }) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const { firstName, role } = currentUserData;

  return (
    <header className="header">
      <div className="container">
        <Link href="/">
          <span className="logo-link">
            <img
              src="https://tinyimg.io/i/pBRWCRn.png"
              alt="Igaku | Health that Cares"
              className="header__brand__img"
            />
          </span>
        </Link>
        <div className="header__brand">
          <PatientNavLinks />
        </div>
        <div className="header__links">
          <div className="header__links__welcome">
            <strong>
              Welcome {role === 'practitioner' ? 'Dr. ' : ''}
              {firstName}
            </strong>
          </div>
          <img
            src={currentUserData.profile.image}
            className="user-photo-profile"
            alt=""
          />
          <div className="header__links__logout">
            <button type="button" className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { logout })(Header);
