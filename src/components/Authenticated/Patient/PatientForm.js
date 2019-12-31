import moment from 'moment';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setAlert } from '../../../store/actions/alerts';
import setError from '../../../store/actions/error';
import { createPatient, updatePatient } from '../../../store/thunks/patient';
import { uploadPic } from '../../../store/thunks/upload';
import { setAuthorizationToken } from '../../../utils/api';
import MultipleInput from '../ProfileCommon/MultipleInput';

class PatientForm extends React.Component {
  state = {
    firstName: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.firstName
      : '',
    lastName: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.lastName
      : '',
    contactNumber: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.contactNumber
      : '',
    passport: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.passport
      : '',
    postalCode: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.postalCode
      : '',
    address: this.props.currentUserData.patient
      ? this.props.currentUserData.patient.address
      : '',
    dateOfBirth: this.props.currentUserData.patient
      ? moment(this.props.currentUserData.patient.dateOfBirth)
      : moment(),
    languages: this.props.currentUserData.patient
      ? JSON.parse(this.props.currentUserData.patient.languages)
      : [],
    referralCode: this.props.currentUserData.referralCode,
    imageText: '',
    imageFile: null,
    calendarFocused: false,
  };

  componentWillUnmount() {
    this.props.setError('');
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  onDateChange = dateOfBirth => {
    if (dateOfBirth) {
      this.setState(() => ({ dateOfBirth: dateOfBirth }));
    }
  };

  onFocusChange = ({ focused }) =>
    this.handleChange('calendarFocused', focused);

  imgPreviewUrl = () => {
    const { imageFile } = this.state;
    const { patient } = this.props.currentUserData;

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (patient && patient.image) {
      return patient.image;
    }
    return 'https://i.imgur.com/GJxJnJ1.png';
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { currentUserData } = this.props;

    const {
      firstName,
      lastName,
      contactNumber,
      passport,
      postalCode,
      address,
      dateOfBirth,
      languages,
      imageFile,
    } = this.state;

    setAuthorizationToken(localStorage.token);

    const { id } = currentUserData;
    const patientId = currentUserData.patient
      ? currentUserData.patient.id
      : undefined;

    const params = {
      firstName,
      lastName,
      contactNumber,
      passport,
      postalCode,
      address,
      files: imageFile,
      dateOfBirth: moment(dateOfBirth.valueOf()).toJSON(),
      languages: JSON.stringify(languages),
      userId: id,
    };

    const formData = new FormData();

    for (let key in params) {
      formData.append(key, params[key]);
    }
    try {
      if (Router.pathname === '/profile/new') {
        await this.props.createPatient(formData);
        this.props.setAlert('Profile created', 'success');
      }
      if (Router.pathname === '/profile/edit') {
        await this.props.updatePatient(patientId, formData);
        this.props.setAlert('Profile updated', 'success');
      }
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  render() {
    const {
      firstName,
      lastName,
      contactNumber,
      passport,
      postalCode,
      address,
      dateOfBirth,
      languages,
      points,
      imageText,
      calendarFocused,
      referralCode,
    } = this.state;

    return (
      <div className="container profile-form-container">
        <form className="user-form profile-form">
          <div className="form-group">
            <div className="image-preview">
              <img
                src={this.imgPreviewUrl()}
                alt="Patient"
                className="patientForm-image"
              />
            </div>

            <label className="auth-label" htmlFor="profile-pic">
              Profile Pic:{' '}
            </label>
            <input
              type="file"
              id="profile-pic"
              onChange={e => {
                this.handleChange('imageText', e.target.value);
                this.handleChange('imageFile', e.target.files[0]);
              }}
              value={imageText}
            />
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="first-name">
              Referral Code:{' '}
            </label>

            <div>{referralCode}</div>
            <CopyToClipboard text={referralCode}>
              <p className="copy-clipboard">Copy to clipboard</p>
            </CopyToClipboard>
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="first-name">
              First Name:{' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="first-name"
              onChange={e => this.handleChange('firstName', e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="last-name">
              Last Name:{' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="last-name"
              onChange={e => this.handleChange('lastName', e.target.value)}
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="contact-no">
              Contact Number:{' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="contact-no"
              onChange={e => this.handleChange('contactNumber', e.target.value)}
              value={contactNumber}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="passport">
              Passport No.
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="passport"
              onChange={e => this.handleChange('passport', e.target.value)}
              value={passport}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="address">
              Address
            </label>
            <input
              className="user-form__input"
              type="text"
              id="address"
              onChange={e => this.handleChange('address', e.target.value)}
              value={address}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="postal-code">
              Postal Code
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="postal-code"
              onChange={e => this.handleChange('postalCode', e.target.value)}
              value={postalCode}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="dob">
              Date of Birth:
            </label>
            <SingleDatePicker
              id="dob"
              date={dateOfBirth}
              onDateChange={this.onDateChange}
              focused={calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="form-group">
            <label htmlFor="languages">Languages</label>
            <MultipleInput
              selectedInputs={inputs => this.handleChange('languages', inputs)}
              values={languages}
              labelId="languages"
            />
          </div>
          <div className="form-group profile-form-group">
            <button
              className="patientForm-button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PatientForm.propTypes = {
  createPatient: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  uploadPic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
  error: state.error,
});

export default connect(mapStateToProps, {
  createPatient,
  setError,
  updatePatient,
  uploadPic,
  setAlert,
})(PatientForm);
