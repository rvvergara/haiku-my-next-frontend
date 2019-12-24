import { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../store/actions/alerts';
import {
 addAvailability, setSessionDate, setSessionDuration, setSessionStartTime,
} from '../../../store/actions/availability';
import { createAvailabilityOnDb } from '../../../store/thunks/availability';
import { setAuthorizationToken } from '../../../utils/api';
import ScheduleForm from './ScheduleForm';
import SessionDuration from './SessionDuration';
import SessionTime from './SessionTime';

const SchedulerComponent = ({
  practitionerId,
  sessionDate,
  sessionDuration,
  sessionStartTime,
  createAvailabilityOnDb,
  setAlert,
  setSessionDate,
  setSessionDuration,
  setSessionStartTime,
}) => {
  useEffect(() => () => {
      setSessionDate(moment().format('MMMM D, YYYY'));
      setSessionDuration(30);
      setSessionStartTime('9:00 am');
    }, []);

  const handleSubmit = async () => {
    const endTime = moment(sessionStartTime, 'h:mm')
      .add(sessionDuration, 'minutes')
      .format('LT');
    const bookingParams = {
      date: moment(sessionDate).format('m-dd-yyyy'),
      startTime: sessionStartTime,
      endTime,
      practitionerId,
  };
    setAuthorizationToken(localStorage.token);
    // await createAvailabilityOnDb(bookingParams);
    console.log('PARAMS', bookingParams);
    setAlert('Booking added', 'success');
  };

  return (
    <div className="scheduler-container">
      <ScheduleForm />
      <SessionDuration />
      <SessionTime />
      <div>
        <button type="button" className="clinic-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

SchedulerComponent.propTypes = {
  createAvailabilityOnDb: PropTypes.func.isRequired,
  practitionerId: PropTypes.string.isRequired,
  sessionDate: PropTypes.string.isRequired,
  sessionDuration: PropTypes.number.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  addAvailability: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setSessionDate: PropTypes.func.isRequired,
  setSessionDuration: PropTypes.func.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  practitionerId: state.currentUser.data.profile.id,
  sessionDate: state.sessionDate,
  sessionDuration: state.sessionDuration,
  sessionStartTime: state.sessionStartTime,
});

export default connect(mapStateToProps, {
  addAvailability,
  createAvailabilityOnDb,
  setAlert,
  setSessionDate,
  setSessionDuration,
  setSessionStartTime,
})(SchedulerComponent);
