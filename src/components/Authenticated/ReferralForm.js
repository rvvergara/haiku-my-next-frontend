import { connect } from 'react-redux';
import { withTranslation } from '../../../i18n';
import { setAlert } from '../../store/actions/alerts';
import setError from '../../store/actions/error';
import { sendReferralLink } from '../../store/thunks/user';
import { setAuthorizationToken } from '../../utils/api';
import MultipleInput from './ProfileCommon/MultipleInput';

class ReferralForm extends React.Component {
  state = {
    emails: [],
  };

  componentWillUnmount() {
    this.props.setError('');
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  handleSubmit = async e => {
    e.preventDefault();
    const { currentUserData } = this.props;
    const { id } = currentUserData;
    const { emails } = this.state;
    setAuthorizationToken(localStorage.token);
    const res = await this.props.sendReferralLink(id, { emails });
    if (res) {
      this.props.setAlert(`Emails sent to ${emails.join(', ')}`, 'success');
      this.setState(() => ({
        emails: [],
      }));
    } else {
      this.props.setAlert(`Cannot continue: ${this.props.error}`, 'danger');
    }
  };

  render() {
    const { emails } = this.state;
    return (
      <div className="container profile-form-container">
        {this.props.error && <strong>{this.props.error}</strong>}
        <form className="user-form">
          <div className="form-group">
            <label htmlFor="referrals" className="auth-label">
              {this.props.t('referral')}:
            </label>
            <MultipleInput
              selectedInputs={inputs => this.handleChange('emails', inputs)}
              values={emails}
              labelId="referrals"
              empty={this.state.empty}
            />
          </div>
          <div className="form-group">
            <button
              className="invite-rewards"
              type="submit"
              onClick={this.handleSubmit}
            >
              Invite Friends
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
  error: state.error,
});

export default connect(mapStateToProps, {
  setAlert,
  setError,
  sendReferralLink,
})(withTranslation('reward')(ReferralForm));
