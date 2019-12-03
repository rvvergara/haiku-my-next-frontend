import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncLogUser } from '../store/actions/user';

const LoginForm = ({ asyncLogUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    asyncLogUser({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
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
  );
};

LoginForm.propTypes = {
  asyncLogUser: PropTypes.func.isRequired,
};

export default connect(null, { asyncLogUser })(LoginForm);
