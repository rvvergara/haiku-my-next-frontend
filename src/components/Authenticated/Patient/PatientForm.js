import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { createPatient, updatePatient } from '../../../store/thunks/patient';
import { uploadPic } from '../../../store/thunks/upload';
import { setAuthorizationToken } from '../../../utils/api';
import setError from '../../../store/actions/error';
import {setAlert} from '../../../store/actions/alerts'

class PatientForm extends React.Component {
  state = {
    firstName: this.props.currentUserData.profile ? this.props.currentUserData.profile.firstName : '',
    lastName: this.props.currentUserData.profile ? this.props.currentUserData.profile.lastName : '',
    contactNo: this.props.currentUserData.profile ? this.props.currentUserData.profile.contactNo : '',
    passport: this.props.currentUserData.profile ? this.props.currentUserData.profile.passport : '',
    postalCode: this.props.currentUserData.profile ? this.props.currentUserData.profile.postalCode : '',
    address: this.props.currentUserData.profile ? this.props.currentUserData.profile.address : '',
    dob: this.props.currentUserData.profile ? moment(this.props.currentUserData.profile.dob) : moment(),
    languages: this.props.currentUserData.profile ? JSON.parse(this.props.currentUserData.profile.languages) : [],
    points: this.props.currentUserData.profile ? this.props.currentUserData.profile.points : 0,
    imageText: '',
    imageFile: null,
    calendarFocused: false,
  }

  componentWillUnmount(){
    this.props.setError('');
  }

  handleChange = (key, val) => this.setState(() => ({
    [key]: val
  }));

  onDateChange = (dob) => {
    if (dob) {
      this.setState(() => ({'dob': dob}));
    }
  };

  onFocusChange = ({ focused }) => this.handleChange('calendarFocused', focused);

  imgPreviewUrl = () => {
    const { imageFile } = this.state;
    const { profile } = this.props.currentUserData;

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (profile && profile.image) {
      return profile.image;
    }
    return 'https://tinyimg.io/i/BmtLUPZ.jpg';
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentUserData } = this.props;
    const { firstName, lastName, contactNo, passport, postalCode, address, dob, languages, points, imageFile } = this.state;

    setAuthorizationToken(localStorage.token);

    const { id } = currentUserData;
    const patientId = currentUserData.profile ? currentUserData.profile.id : undefined;

    const params = {
      firstName,
      lastName,
      contactNo,
      passport,
      postalCode,
      address,
      points,
      files: imageFile,
      dateOfBirth: moment(dob.valueOf()).toJSON(),
      languages: JSON.stringify(languages),
      userId: id
    }

    const formData = new FormData();
    
    for(let key in params){
      formData.append(key, params[key])
    };

    try {
      if (Router.pathname === '/profile/new') {
        await this.props.createPatient(formData);
        this.props.setAlert('Profile created','success')
      }
      if (Router.pathname === '/profile/edit') {
        await this.props.updatePatient(patientId, formData);
        this.props.setAlert('Profile updated','success')
      }
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  render(){
    const { firstName, lastName, contactNo, passport, postalCode, address, dob, languages, points, imageText, calendarFocused } = this.state;

    return (
      <div className="container profile-form-container">
        <form className="user-form profile-form">
          <div className="form-group">
            <div className="image-preview">
              <img
                src={this.imgPreviewUrl()}
                alt="Patient"
                className="profile-avatar__img"
              />
            </div>
            <label
              className="auth-label"
              htmlFor="profile-pic"
            >
            Profile Pic:
              {' '}
            </label>
            <input
              type="file"
              id="profile-pic"
              onChange={(e) => {
                this.handleChange('imageText', e.target.value);
                this.handleChange('imageFile', e.target.files[0]);
              }}
              value={imageText}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="first-name"
            >
                First Name:
              {' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="first-name"
              onChange={(e) => this.handleChange('firstName', e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="last-name"
            >
                Last Name:
              {' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="last-name"
              onChange={(e) => this.handleChange('lastName', e.target.value)}
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="contact-no"
            >
                Contact Number:
              {' '}
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="contact-no"
              onChange={(e) => this.handleChange('contactNo', e.target.value)}
              value={contactNo}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="passport"
            >
              Passport No.
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="passport"
              onChange={(e) => this.handleChange('passport', e.target.value)}
              value={passport}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="user-form__input"
              type="text"
              id="address"
              onChange={(e) => this.handleChange('address', e.target.value)}
              value={address}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="postal-code"
            >
              Postal Code
            </label>
            <input
              className="user-form__input number__input"
              type="text"
              id="postal-code"
              onChange={(e) => this.handleChange('postalCode', e.target.value)}
              value={postalCode}
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="dob"
            >
              Date of Birth:
            </label>
            <SingleDatePicker
              id="dob"
              date={dob}
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
              selectedInputs={(inputs) => this.handleChange('languages',inputs)}
              values={languages}
              labelId="languages"
            />
          </div>
          <div className="form-group">
            <label
              className="auth-label"
              htmlFor="points"
            >
              Points
            </label>
            <input
              className="user-form__input"
              type="number"
              id="points"
              onChange={(e) => this.handleChange('points', e.target.value)}
              value={points}
            />
          </div>
          <div className="form-group profile-form-group">
            <button
              className="user-form__button profile-button"
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

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  error: state.error,
});

export default connect(mapStateToProps, {
  createPatient,
  setError,
  updatePatient,
  uploadPic,
  setAlert
})(PatientForm);
