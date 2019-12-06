import { useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { login } from '../store/thunks/user';

const LoginForm = ({ error, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      return Router.push('/');
    } catch (error) {
     return error;
    }
  };

  return (
    <div>
      {
        error && (
          <div>
            { error }
          </div>
        )
      }
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
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
