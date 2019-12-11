import { connect } from 'react-redux';
import { createClinic } from '../../../store/thunks/clinic';
import { setAuthorizationToken} from '../../../utils/api';

class ClinicForm extends React.Component {
  state = {
    name: '',
    address: '',
    postalCode: '',
  };

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleSubmit = async e =>{
    setAuthorizationToken(this.props.token);
    e.preventDefault()
    await this.props.createClinic(this.state)
  }

  render() {
    return (
      <div className="container profile-form-container">
        <form className="user-form profile-form">
          <div className="form-group">
            <label htmlFor="clinic-name" className="auth-label">Name</label>
            <input
              id="clinic-name"
              className="user-form__input"
              type="text"
              onChange={e => this.handleChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinic-address" className="auth-label">
              Address
            </label>
            <input
              className="user-form__input"
              id="clinic-address"
              type="text"
              onChange={e => this.handleChange('address', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinic-postal-code" className="auth-label">
              Postal Code
            </label>
            <input
              id="clinic-postal-code"
              className="user-form__input"
              type="text"
              onChange={e => this.handleChange('postalCode', e.target.value)}
            />
          </div>
          <div className="form-group">
          <button
            className="user-form__button" 
            onClick={this.handleSubmit}>
            Submit
          </button>
          </div>
        </form>
      </div>
    );
  }
}



export default connect(null, { createClinic })(ClinicForm);
