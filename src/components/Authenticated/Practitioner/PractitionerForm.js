import Router from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import {
  createPractitioner,
  updatePractitioner,
} from '../../../store/thunks/practitioner';
import { uploadPic } from '../../../store/thunks/upload';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { setAuthorizationToken } from '../../../utils/api'


export const PractitionerForm = ({
  createPractitioner,
  currentUserData,
  updatePractitioner,
  uploadPic,
}) => {
  const { profile } = currentUserData;
  let educVal = [];
  let specVal = [];
  let bioVal = '';
  let yrVal = 0;

  if (profile) {
    educVal = profile.education;
    specVal = profile.specialities;
    bioVal = profile.biography;
    yrVal = profile.yearsExp;
  }

  const [education, setEducation] = useState(educVal);
  const [specialties, setSpecialties] = useState(specVal);
  const [biography, setBiography] = useState(bioVal);
  const [yearsExp, setYearsExp] = useState(yrVal);
  const [imageText, setImageText] = useState('');
  const [imageFile, setImageFile] = useState(null);

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

  const handleSubmit = async e => {
    e.preventDefault();
    setAuthorizationToken(localStorage.token)
    const { id } = currentUserData;
    const practitionerId = currentUserData.profile
      ? currentUserData.profile.id
      : undefined;

    let imageUrl;

    if (imageText) {
      imageUrl = await handleUploadPic();
    }

    const params = {
      education,
      specialities: specialties,
      biography,
      yearsExp,
      userId: id,
      image: imageUrl,
    };
    try {
      if (Router.pathname === '/profile/new') {
        await createPractitioner(params);
      }
      if (Router.pathname === '/profile/edit') {
        await updatePractitioner(practitionerId, params);
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
          <label className="auth-label" htmlFor="profile-pic">
            Profile Pic:{' '}
          </label>
          <input
            type="file"
            id="profile-pic"
            onChange={e => {
              setImageText(e.target.value);
              setImageFile(e.target.files[0]);
            }}
            value={imageText}
          />
        </div>
        <div className="form-group">
          <label className="auth-label" htmlFor="contact-no">
            Education:{' '}
          </label>
          <MultipleInput
            selectedInputs={inputs => setEducation(inputs)}
            values={education}
            labelId="education"
          />
        </div>
        <div className="form-group">
          <label className="auth-label" htmlFor="specialties">
            Specialties:{' '}
          </label>
          <MultipleInput
            selectedInputs={inputs => setSpecialties(inputs)}
            values={specialties}
            labelId="specialties"
          />
        </div>
        <div className="form-group">
          <label className="auth-label" htmlFor="address">
            Biography:{' '}
          </label>
          <textarea
            rows={5}
            className="user-form__input"
            type="text"
            id="biography"
            onChange={e => setBiography(e.target.value)}
            value={biography}
          />
        </div>
        <div className="form-group">
          <label className="auth-label" htmlFor="years-experience">
            Years Experience:{' '}
          </label>
          <input
            className="user-form__input number__input"
            type="number"
            id="years-experience"
            onChange={e => setYearsExp(e.target.value)}
            value={yearsExp}
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

PractitionerForm.propTypes = {
  createPractitioner: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  updatePractitioner: PropTypes.func.isRequired,
  uploadPic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  createPractitioner,
  updatePractitioner,
  uploadPic,
})(PractitionerForm);
