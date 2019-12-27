import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import validator from 'validator';
import PropTypes from 'prop-types';
import { signup } from '../store/thunks/user';
import setError from '../store/actions/error';

class SignupForm extends React.Component {
  state = {
    email: '',
    role: '',
    password: '',
    pwConfirm: '',
    formError: ''
  }

  componentWillUnmount() {
    this.props.setError('');
  }

  isValidSignup = () => {
    const {
      email, password, pwConfirm, role
    } = this.state;

    if (!password || !pwConfirm) {
      this.setState(() => ({
        formError: 'All fields are required'
      }))
    } else if (!validator.isEmail(email)) {
      this.setState(() => ({
        formError: 'Please put a valid email'
      }));
    } else if (password !== pwConfirm) {
      this.setState(() => ({
        formError: "Passwords don't match"
      }));
    } else if (role === '') {
      this.setState(() => ({
        formError: 'Please select a role'
      }));
    } else {
        return true;
    }
    return false;
  }

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val
    }));
  }

  handleSignup = async (e) => {
    e.preventDefault();
    if (!this.isValidSignup()) {
      return;
    }
    const {
      email,
      password,
      role
    } = this.state;

    try {
      await this.props.signup({
        email,
        password,
        role
      });
      Router.push('/verify');
    } catch (err) {
      this.setState(() => ({
        formError: ''
      }))
      return err;
    }
  }

  render(){
    const {
      email, password, pwConfirm, role, formError
    } = this.state;
    return (
      <div>
        <div className="form-error">
          {formError && (<strong>{formError}</strong>)}
          {
            this.props.error && <strong>{this.props.error}</strong>
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
              id="email"
              className="user-form__input"
              type="email"
              value={email}
              onChange={(e) => this.handleChange('email', e.target.value)}
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
              onChange={(e) => this.handleChange('role', e.target.value)}
            >
              <option
                className="user-form__option"
                value=""
              >
                I am a...
              </option>
              <option
                className="user-form__option"
                value="PATIENT"
              >
                Patient
              </option>
              <option
                className="user-form__option"
                value="PRACTITIONER"
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
              onChange={(e) => this.handleChange('password', e.target.value)}
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
              onChange={(e) => this.handleChange('pwConfirm', e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-group">
            <button
              className="signup-button"
              type="submit"
              onClick={this.handleSignup}
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
                  className="login-text"
                >
                  Login
                </button>
              </Link>
            </small>
          </footer>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  error: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { signup, setError })(SignupForm);
