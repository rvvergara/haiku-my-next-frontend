import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { i18n, withTranslation } from '../../../i18n';
import setError from '../../store/actions/error';
import { setLanguage } from '../../store/actions/language';
import { login } from '../../store/thunks/user';

class LoginHeader extends React.Component {
  state = {
    email: '',
    password: '',
    local: this.props.localLang,
  };

  componentDidMount() {
    if (!this.props.localLang) {
      this.props.setLanguage('en');
    }
  }

  componentWillUnmount() {
    this.props.setError('');
  }

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await this.props.login({ email, password });
      if (!user.activated) {
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

  handleChangeLang = val => {
    this.handleChange('local', val);
    this.props.setLanguage(val);
    i18n.changeLanguage(val);
  };

  render() {
    const { email, password } = this.state;
    const { t } = this.props;
    return (
      <Form className="user-form">
        <Form.Row>
          <Col>
            <Form.Control
              className="inline-input"
              placeholder='Email'
              value={email}
              type='email'
              onChange={(e) => this.handleChange('email', e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              className="inline-input"
              onChange={(e) => this.handleChange('password', e.target.value)}
              placeholder='Password'
              type='password'
              value={password}
            />
          </Col>
          <Col className='inline-login-button-col'>
              <button
              className="theme-button inline-login-button"
              type="submit"
              onClick={this.handleLogin}
              >
                Login
              </button>
            </Col>
        </Form.Row>
      </Form>);
      {/*<div className="loginHeader-container">
        <div className="form-error error-inline">
          {this.props.error && <strong>{this.props.error}</strong>}
        </div>
        <form className="inline-login-form">
          <div className="form-group form-inline">
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
        </form>
    </div>*/}
  }
}

LoginHeader.propTypes = {
  error: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
  localLang: state.language,
});

export default connect(mapStateToProps, { login, setError, setLanguage })(
  withTranslation('login')(LoginHeader),
);
