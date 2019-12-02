import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncSignUp } from '../store/actions/user';

const SignupForm = ({ asyncSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      password,
      pwConfirm,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPwConfirm('');
  };

  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={pwConfirm}
          onChange={(e) => setPwConfirm(e.target.value)}
          placeholder="Confirm Password"
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          onClick={handleSignup}
        >
      Create Account
        </button>
      </div>
    </form>
  );
};

SignupForm.propTypes = {
  asyncSignUp: PropTypes.func.isRequired,
};

export default connect(null, { asyncSignUp })(SignupForm);
