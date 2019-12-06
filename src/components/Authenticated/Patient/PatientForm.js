import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { createPatient } from '../../../store/thunks/patient';
import { setAuthorizationToken } from '../../../utils/api';

export const PatientForm = ({ createPatient, currentUserData, token }) => {
  setAuthorizationToken(token);

  const [contactNo, setContactNo] = useState('');
  const [passport, setPassport] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(moment());
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [points, setPoints] = useState(0);

  const onFocusChange = ({ focused }) => setCalendarFocused(focused);

  const onDateChange = (dob) => {
    if (dob) {
      setDob(dob);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = currentUserData;
    try {
      await createPatient({
        contactNo,
        passport,
        postalCode,
        address,
        dob: dob.valueOf(),
        languages,
        points,
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
          <label htmlFor="contact-no">Contact Number: </label>
          <input
            type="text"
            id="contact-no"
            onChange={(e) => setContactNo(e.target.value)}
            value={contactNo}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport">Passport No.</label>
          <input
            type="text"
            id="passport"
            onChange={(e) => setPassport(e.target.value)}
            value={passport}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
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
          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            onChange={(e) => setPoints(e.target.value)}
            value={points}
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

PatientForm.propTypes = {
  createPatient: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { createPatient })(PatientForm);
