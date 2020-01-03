import { connect } from 'react-redux';
import Router from 'next/router';
import { updatePassword } from '../../../store/thunks/user';
import { setAuthorizationToken} from '../../../utils/api';
import setError from '../../../store/actions/error';

class PasswordUpdateForm extends React.Component {
  state = {
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
    formError: ''
  }


  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleSubmitPassword = async (e) => {
    e.preventDefault()
    if(this.state.newPassword !== this.state.passwordConfirm){
      return this.setState(() => ({
        formError: 'Passwords do not match'
      }))
    }
    setAuthorizationToken(localStorage.token);
    const res = await this.props.updatePassword(this.props.currentUserData.id, this.state);
    
    if(res.success){
      Router.push('/');
    } else {
      this.setState(() => ({
        formError: 'Wrong password given'
      }))
    }
      
  }



  render(){
    const { currentPassword, newPassword, passwordConfirm, formError} = this.state;

    return (
      <div>
        <div className="form-error">
          {formError && <strong>{formError}</strong>}
        </div>
        <form className="user-form">
          <div className="form-group">
            <label 
            htmlFor="current-password" className="auth-label"
            >
              Current Password
            </label>
            <input 
              type="password"
              id="current-password"
              className="user-form__input"
              value={currentPassword}
              onChange={e => this.handleChange('currentPassword', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label 
            htmlFor="new-password" className="auth-label"
            >
              Type New Password
            </label>
            <input 
              type="password"
              id="new-password"
              className="user-form__input"
              value={newPassword}
              onChange={e => this.handleChange('newPassword', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label 
            htmlFor="password-confirm" className="auth-label"
            >
              Confirm New Password
            </label>
            <input 
              type="password"
              id="password-confirm"
              className="user-form__input"
              value={passwordConfirm}
              onChange={e => this.handleChange('passwordConfirm', e.target.value)}
            />
            <div className="form-group">
              <button
                type="submit"
                className="signup-button"
                onClick={this.handleSubmitPassword}
                >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  error: state.error
})

export default connect(mapStateToProps, { updatePassword, setError })(PasswordUpdateForm)