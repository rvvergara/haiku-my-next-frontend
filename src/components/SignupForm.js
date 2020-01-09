import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import setError from '../store/actions/error';
import { signup } from '../store/thunks/user';
import { setLanguage} from '../store/actions/language';
import { i18n, withTranslation } from '../../i18n';

class SignupForm extends React.Component {
  state = {
    email: '',
    role: '',
    password: '',
    pwConfirm: '',
    referralCode: '',
    formError: '',
    disabled: false,
  };

  componentDidMount() {
    this.setState(() => ({
      email: Router.query.referred || '',
      referralCode: Router.query.code || '',
      disabled: Router.query.referred ? true : false
    }))
  }

  componentWillUnmount() {
    this.props.setError('');
  }

  isValidSignup = () => {
    const { email, password, pwConfirm, role } = this.state;

    if (!password || !pwConfirm) {
      this.setState(() => ({
        formError: 'All fields are required',
      }));
    } else if (!validator.isEmail(email)) {
      this.setState(() => ({
        formError: 'Please put a valid email',
      }));
    } else if (password !== pwConfirm) {
      this.setState(() => ({
        formError: "Passwords don't match",
      }));
    } else if (role === '') {
      this.setState(() => ({
        formError: 'Please select a role',
      }));
    } else {
      return true;
    }
    return false;
  };

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleChangeLang = (val) => {
    this.handleChange('local', val);
    this.props.setLanguage(val);
    i18n.changeLanguage(val);
  }

  handleSignup = async e => {
    e.preventDefault();
    if (!this.isValidSignup()) {
      return;
    }
    const { email, password, role ,referralCode} = this.state;

    try {
      await this.props.signup({
        email,
        password,
        role,
        referralCode
      });
      Router.push('/verify');
    } catch (err) {
      this.setState(() => ({
        formError: '',
      }));
      return err;
    }
  };

  render() {
    const {
      email,
      password,
      pwConfirm,
      role,
      referralCode,
      formError,
    } = this.state;
    const { t } = this.props;

    return (
      <div>
        <div className="form-error">
          {formError && <strong>{formError}</strong>}
          {this.props.error && <strong>{this.props.error}</strong>}
        </div>
        <form className="user-form">
          <div className="form-group">
            <label className="auth-label" htmlFor="email">
              {t('email')}
            </label>
            <input
              id="email"
              className="user-form__input"
              type="email"
              onChange={e => this.handleChange('email', e.target.value)}
              value={email}
              placeholder={t('email')}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="role">
              {t('select-role')}
            </label>
            <select
              id="role"
              className="user-form__input"
              name="role"
              value={role}
              onChange={e => this.handleChange('role', e.target.value)}
            >
              <option className="user-form__option" value="">
                {t('i-am-a')}
              </option>
              <option className="user-form__option" value="PATIENT">
                {t('patient')}
              </option>
              <option className="user-form__option" value="PRACTITIONER">
                {t('practitioner')}
              </option>
            </select>
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="password">
              {t('password')}
            </label>
            <input
              id="password"
              className="user-form__input"
              type="password"
              value={password}
              onChange={e => this.handleChange('password', e.target.value)}
              placeholder={t('password')}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="password-confirm">
              {t('confirm-password')}
            </label>
            <input
              id="password-confirm"
              className="user-form__input"
              type="password"
              value={pwConfirm}
              onChange={e => this.handleChange('pwConfirm', e.target.value)}
              placeholder={t('confirm-password')}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="referral-code">
              {t('referral-code')}
            </label>
            <input
              id="referral-code"
              className="user-form__input"
              type="text"
              value={referralCode}
              disabled={this.state.disabled}
              onChange={e => this.handleChange('referralCode', e.target.value)}
              placeholder={t('referral-code')}
            />
          </div>
          <div className="form-group">
            <button
              className="signup-button"
              type="submit"
              onClick={this.handleSignup}
            >
              {t('create-account')}
            </button>
          </div>
          <footer className="user-form__footer">
            <small>
              {t('already-have-an-account')}
              {' '}
              <Link href="/login">
                <button type="button" className="login-text">
                  {t('login')}
                </button>
              </Link>
              {' '}
              <select 
              onChange={(e) => this.handleChangeLang(e.target.value)} 
              value={this.state.local}
              >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
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
  setLanguage: PropTypes.func.isRequired,
  localLang: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  localLang: state.language
});

export default connect(mapStateToProps, {
   signup,
   setError,
   setLanguage 
  })(withTranslation('signup')(SignupForm));
