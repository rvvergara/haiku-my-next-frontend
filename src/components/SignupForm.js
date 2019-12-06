import { useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import validator from 'validator';
import PropTypes from 'prop-types';
import { signup } from '../store/thunks/user';
import resetFormHook from '../hooks/formHooks';

const SignupForm = ({ error, signup }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [formError, setFormError] = useState('');

  const isValidSignup = () => {
    if (!firstName || !lastName || !password || !pwConfirm) {
      setFormError('All fields are required');
    } else if (!validator.isEmail(email)) {
      setFormError('Please put a valid email');
    } else if (password !== pwConfirm) {
        setFormError("Passwords don't match");
    } else if (role === '') {
      setFormError('Please select a role');
    } else {
        return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isValidSignup()) {
      return;
    }
    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        role,
        activated: true,
      });
      Router.push('/');
      resetFormHook([setFirstName, setLastName, setEmail, setPassword, setPwConfirm, setFormError]);
    } catch (err) {
      setFormError(error);
    }
  };

  return (
    <div>
      <Link href="/">
        <button type="button">
          Back
        </button>
      </Link>
      <div className="form-error">
        {formError && (<strong>{formError}</strong>)}
        {
          error && <strong>{error}</strong>
        }
      </div>
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
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">
              I am a...
            </option>
            <option value="patient">
              Patient
            </option>
            <option value="practitioner">
              Practitioner
            </option>
          </select>
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
    </div>
  );
};

SignupForm.propTypes = {
  error: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { signup })(SignupForm);
