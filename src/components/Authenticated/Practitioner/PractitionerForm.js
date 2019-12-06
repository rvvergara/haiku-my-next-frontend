import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { createPractitioner } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';

export const PractitionerForm = ({ createPractitioner, currentUserData, token }) => {
  setAuthorizationToken(token);

  const [education, setEducation] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [biography, setBiography] = useState('');
  const [yearsExp, setYearsExp] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = currentUserData;
    try {
      await createPractitioner({
        education,
        specialties,
        biography,
        yearsExp,
        userId: id,
      });
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="contact-no">Education: </label>
          <MultipleInput
            selectedInputs={(inputs) => setEducation(inputs)}
            values={education}
            labelId="education"
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialties">Specialties: </label>
          <MultipleInput
            selectedInputs={(inputs) => setSpecialties(inputs)}
            values={specialties}
            labelId="specialties"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Biography: </label>
          <input
            type="text"
            id="biography"
            onChange={(e) => setBiography(e.target.value)}
            value={biography}
          />
        </div>
        <div className="form-group">
          <label htmlFor="years-experience">Years Experience: </label>
          <input
            type="text"
            id="years-experience"
            onChange={(e) => setYearsExp(e.target.value)}
            value={yearsExp}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

PractitionerForm.propTypes = {
  createPractitioner: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { createPractitioner })(PractitionerForm);
