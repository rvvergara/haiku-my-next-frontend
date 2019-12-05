import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import resetForm from '../../../hooks/formHooks';

export const PatientProfileEdit = () => {
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

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="contact-no">Contact Number: </label>
          <input
            type="text"
            id="contact-no"
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport">Passport No.</label>
          <input
            type="text"
            id="passport"
            onChange={(e) => setPassport(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">
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
        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

PatientProfileEdit.propTypes = {};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {})(PatientProfileEdit);
