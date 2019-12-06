import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { logout } from '../../store/thunks/user';

export const Header = ({ logout, currentUserData }) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const { firstName, role } = currentUserData;

  return (
    <header className="header">
      <div className="container">
        <div className="header__brand">
          <Link href="/">
            <span className="logo-link">
              <img
                src="https://tinyimg.io/i/pBRWCRn.png"
                alt="Igaku | Health that Cares"
                className="header__brand__img"
              />
            </span>
          </Link>
        </div>
        <div className="header__links">
          <div className="header__links__welcome">
            <strong>
              Welcome
              {' '}
              { role === 'practitioner' ? 'Dr. ' : ''}
              {firstName}
            </strong>
          </div>
          <div className="header__links__logout">
            <button
              type="button"
              className="logout"
              onClick={handleLogout}
            >
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

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { logout })(Header);
