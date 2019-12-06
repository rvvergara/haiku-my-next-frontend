import { useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { login } from '../store/thunks/user';

const LoginForm = ({ error, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      if (!user.profile) {
        return setTimeout(() => Router.push('/profile/new'), 500);
      }
      return setTimeout(() => Router.push('/'), 500);
    } catch (error) {
     return error;
    }
  };

  return (
    <div>
      <div className="form-error">
        {
      error && <strong>{error}</strong>
    }
      </div>
      <form className="user-form">
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="user-form__input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className="user-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className="user-form__button"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <footer className="user-form__footer">
          <small>
            No account yet?
            <Link href="/signup">
              <button
                type="button"
                className="user-form__footer__button"
              >
                Signup
              </button>
            </Link>
          </small>
        </footer>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  error: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
