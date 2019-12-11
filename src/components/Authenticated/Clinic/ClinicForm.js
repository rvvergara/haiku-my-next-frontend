import { connect } from 'react-redux';
import { createClinic } from '../../../store/thunks/clinic';
import { setAuthorizationToken } from '../../../utils/api';

class ClinicForm extends React.Component {

  // this.props.currentUserData

  state = {
    name: '',
    address: '',
    postalCode: '',
    associated:false,
  };

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleAssociated = () => {
    this.setState((prevState) => ({
      associated:!prevState.associated
    }))
  }

  handleSubmit = async e => {
    setAuthorizationToken(this.props.token);
    e.preventDefault();
    const profileId = this.props.currentUserData.profile.id


    const params = this.state.associated ? {...this.state, practitioners:[profileId]} : this.state

    await this.props.createClinic(params);
  };

  render() {
    return (
      <div className="container profile-form-container">
        <form className="user-form profile-form">
          <div className="form-group">
            <label htmlFor="clinic-name" className="auth-label">
              Name
            </label>
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
          <label htmlFor="associated" className="auth-label">
              Do i work here?
            </label>
            <input
            id="associated"
              type="checkbox"
              checked={this.state.associated}
              onChange={this.handleAssociated}
              className="checkbox-round"
            ></input>
          </div>

          <div className="form-group">
            <button className="user-form__button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { createClinic })(ClinicForm);
