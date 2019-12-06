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
      Router.push('/profile/new');
      resetFormHook([setFirstName, setLastName, setEmail, setPassword, setPwConfirm, setFormError]);
    } catch (err) {
      setFormError(error);
    }
  };

  return (
    <div>
      <div className="form-error">
        {formError && (<strong>{formError}</strong>)}
        {
          error && <strong>{error}</strong>
        }
      </div>
      <form className="user-form">
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="first-name"
          >
        First Name
          </label>
          <input
            id="first-name"
            className="user-form__input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <input
            id="last-name"
            className="user-form__input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="user-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="role"
          >
            Select Role
          </label>
          <select
            id="role"
            className="user-form__input"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option
              className="user-form__option"
              value=""
            >
              I am a...
            </option>
            <option
              className="user-form__option"
              value="patient"
            >
              Patient
            </option>
            <option
              className="user-form__option"
              value="practitioner"
            >
              Practitioner
            </option>
          </select>
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
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="password-confirm"
          >
            Confirm Password
          </label>
          <input
            id="password-confirm"
            className="user-form__input"
            type="password"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <button
            className="user-form__button"
            type="submit"
            onClick={handleSignup}
          >
        Create Account
          </button>
        </div>
        <footer className="user-form__footer">
          <small>
            Already have an account?
            <Link href="/login">
              <button
                type="button"
                className="user-form__footer__button"
              >
                Login
              </button>
            </Link>
          </small>
        </footer>
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
