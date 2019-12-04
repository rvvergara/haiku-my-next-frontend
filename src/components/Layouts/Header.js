import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/thunks/user';

export const Header = ({ logout }) => (
  <header className="header">
    <div className="container">
      <div className="header__brand">
        <h1>
          Igaku Logo Here
        </h1>
      </div>
      <div className="header__links">
        <div className="header__links__welcome">
          <strong>Welcome User</strong>
        </div>
        <div className="header__links__logout">
          <button
            type="button"
            className="logout"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
  );

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Header);
