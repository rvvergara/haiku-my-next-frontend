import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { createPatient, updatePatient } from '../../../store/thunks/patient';
import { uploadPic } from '../../../store/thunks/upload';

export const PatientForm = ({
 createPatient, currentUserData, updatePatient, uploadPic,
}) => {
  const { profile } = currentUserData;
  let contactVal = '';
  let passportVal = '';
  let postalVal = '';
  let addressVal = '';
  let dobVal = moment();
  let languagesVal = [];
  let pointsVal = 0;

  if (profile) {
    contactVal = profile.contactNo;
    passportVal = profile.passport;
    postalVal = profile.postalCode;
    addressVal = profile.address;
    dobVal = moment(profile.dob);
    languagesVal = profile.languages;
    pointsVal = profile.points;
  }

  const [contactNo, setContactNo] = useState(contactVal);
  const [passport, setPassport] = useState(passportVal);
  const [postalCode, setPostalCode] = useState(postalVal);
  const [address, setAddress] = useState(addressVal);
  const [dob, setDob] = useState(dobVal);
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [languages, setLanguages] = useState(languagesVal);
  const [points, setPoints] = useState(pointsVal);
  const [imageText, setImageText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const onFocusChange = ({ focused }) => setCalendarFocused(focused);

  const onDateChange = (dob) => {
    if (dob) {
      setDob(dob);
    }
  };

  const handleUploadPic = async () => {
    const { id } = currentUserData;
    const formData = new FormData();
    formData.append('files', imageFile);
    formData.append('userId', id);
    const res = await uploadPic(formData);
    return res;
  };

  const imgPreviewUrl = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (profile && profile.image) {
      return profile.image;
    }
      return 'https://tinyimg.io/i/BmtLUPZ.jpg';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = currentUserData;
    const patientId = currentUserData.profile ? currentUserData.profile.id : undefined;

    const imageURL = await handleUploadPic();

    const params = {
      contactNo,
      passport,
      postalCode,
      address,
      dob: dob.valueOf(),
      languages,
      points,
      userId: id,
      image: imageURL,
    };

    try {
      if (Router.pathname === '/profile/new') {
        await createPatient(params);
      }
      if (Router.pathname === '/profile/edit') {
        await updatePatient(patientId, params);
      }
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="container profile-form-container">
      <form className="user-form profile-form">
        <div className="form-group">
          <div className="image-preview">
            <img
              src={imgPreviewUrl()}
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
              setImageText(e.target.value);
              setImageFile(e.target.files[0]);
            }}
            value={imageText}
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
            onChange={(e) => setContactNo(e.target.value)}
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
            onChange={(e) => setPassport(e.target.value)}
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
            onChange={(e) => setAddress(e.target.value)}
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
            onChange={(e) => setPostalCode(e.target.value)}
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
            onDateChange={onDateChange}
            focused={calendarFocused}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
        <div className="form-group">
          <label htmlFor="languages">Languages</label>
          <MultipleInput
            selectedInputs={(inputs) => setLanguages(inputs)}
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
            onChange={(e) => setPoints(e.target.value)}
            value={points}
          />
        </div>
        <div className="form-group profile-form-group">
          <button
            className="user-form__button profile-button"
            type="submit"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

PatientForm.propTypes = {
  createPatient: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  updatePatient: PropTypes.func.isRequired,
  uploadPic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { createPatient, updatePatient, uploadPic })(PatientForm);
