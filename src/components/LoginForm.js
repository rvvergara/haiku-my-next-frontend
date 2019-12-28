import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setError from '../store/actions/error';
import { login } from '../store/thunks/user';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentWillUnmount() {
    this.props.setError('');
  }

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await this.props.login({ email, password });
      if(!user.activated){
        return Router.push('/verify');
      }
      if (user.patient || user.practitioner) {
        return Router.push('/');
      }
      return Router.push('/profile/new');
    } catch (error) {
      return error;
    }
  };

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="form-error">
          {this.props.error && <strong>{this.props.error}</strong>}
        </div>
        <form className="user-form">
          <div className="form-group">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              className="user-form__input"
              id="email"
              type="email"
              value={email}
              onChange={e => this.handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="user-form__input"
              type="password"
              value={password}
              onChange={e => this.handleChange('password', e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              className="login-button"
              type="submit"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </div>
          <footer className="user-form__footer">
            <small>
              No account yet?
              <Link href="/signup">
                <button className="signup-text">Signup</button>
              </Link>
            </small>
          </footer>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, { login, setError })(LoginForm);
