import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { createPractitioner, updatePractitioner } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';

export const PractitionerForm = ({
 createPractitioner, currentUserData, token, updatePractitioner,
}) => {
  setAuthorizationToken(token);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = currentUserData;
    const practitionerId = currentUserData.profile ? currentUserData.profile.id : undefined;
    const params = {
      education,
      specialities: specialties,
      biography,
      yearsExp,
      userId: id,
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
          <label
            className="auth-label"
            htmlFor="contact-no"
          >
            Education:
            {' '}
          </label>
          <MultipleInput
            selectedInputs={(inputs) => setEducation(inputs)}
            values={education}
            labelId="education"
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="specialties"
          >
            Specialties:
            {' '}

          </label>
          <MultipleInput
            selectedInputs={(inputs) => setSpecialties(inputs)}
            values={specialties}
            labelId="specialties"
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="address"
          >
              Biography:
            {' '}

          </label>
          <textarea
            rows={5}
            className="user-form__input"
            type="text"
            id="biography"
            onChange={(e) => setBiography(e.target.value)}
            value={biography}
          />
        </div>
        <div className="form-group">
          <label
            className="auth-label"
            htmlFor="years-experience"
          >
            Years Experience:
            {' '}
          </label>
          <input
            className="user-form__input number__input"
            type="number"
            id="years-experience"
            onChange={(e) => setYearsExp(e.target.value)}
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
  token: PropTypes.string.isRequired,
  updatePractitioner: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
 createPractitioner,
  updatePractitioner,
})(PractitionerForm);
