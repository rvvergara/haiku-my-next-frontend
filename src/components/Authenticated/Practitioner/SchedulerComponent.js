import { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../store/actions/alerts';
import { addBooking } from '../../../store/actions/booking';
import ScheduleForm from './ScheduleForm';
import SessionDuration from './SessionDuration';
import SessionTime from './SessionTime';
import { setSessionDate, setSessionDuration, setSessionStartTime } from '../../../store/actions/availability';

const SchedulerComponent = ({
  sessionDate,
  sessionDuration,
  sessionStartTime,
  addBooking,
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

  const handleSubmit = () => {
    const endTime = moment(sessionStartTime, 'h:mm')
      .add(sessionDuration, 'minutes')
      .format('LT');
    const bookingParams = {
      date: sessionDate,
      startTime: sessionStartTime,
    endTime,
  };
    addBooking(bookingParams);
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
  sessionDate: PropTypes.string.isRequired,
  sessionDuration: PropTypes.number.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  addBooking: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setSessionDate: PropTypes.func.isRequired,
  setSessionDuration: PropTypes.func.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sessionDate: state.sessionDate,
  sessionDuration: state.sessionDuration,
  sessionStartTime: state.sessionStartTime,
});

export default connect(mapStateToProps, {
  addBooking,
  setAlert,
  setSessionDate,
  setSessionDuration,
  setSessionStartTime,
})(SchedulerComponent);
