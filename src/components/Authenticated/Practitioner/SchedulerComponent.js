import moment from 'moment';
import { connect } from 'react-redux';
import { setAlert } from '../../../store/actions/alerts';
import { addBooking } from '../../../store/actions/booking';
import ScheduleForm from './ScheduleForm';
import SessionDuration from './SessionDuration';
import SessionTime from './SessionTime';

const SchedulerComponent = ({
  sessionDate,
  sessionDuration,
  sessionStartTime,
  addBooking,
  setAlert
}) => {
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
    <div>
      <h3>Choose an available day for your appointment</h3>
      <ScheduleForm />
      <div>
        <div>Availability 1 - Booked</div>
        <div>Availability 2</div>
      </div>
      <SessionDuration />
      <h3>Choose an available time for your appointment</h3>
      <SessionTime />
      <div>
        <button type="button" className="clinic-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sessionDate: state.sessionDate,
  sessionDuration: state.sessionDuration,
  sessionStartTime: state.sessionStartTime,
});

export default connect(mapStateToProps, { addBooking,setAlert })(SchedulerComponent);
