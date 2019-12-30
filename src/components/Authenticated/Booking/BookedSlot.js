import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { confirmBookingSlotInDb, rejectBookingSlot } from '../../../store/thunks/availability';
import { setAlert } from '../../../store/actions/alerts';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({
 booking, fetchPatient, confirmBookingSlotInDb, rejectBookingSlot, setAlert,
}) => {
  let patient;
  const handleConfirm = () => {
    confirmBookingSlotInDb(booking.id);
    setAlert('Booking confirmed', 'success');
  };
  // useEffect(() => {

  // }, [availabilities, booking]);
  return (
    <div>
      <p>
      Date:
        {booking.date}
      </p>
      <p>
      Time:
        {booking.startTime}
        {' '}
      to
        {' '}
        {booking.endTime}
      </p>
      <p>
      Patient:
        {' '}
        { patient && patient.firstName}
      </p>
      {booking.status === 'PENDING' && (
      <div>
        <button
          type="button"
          className="theme-button"
          onClick={handleConfirm}
        >
        Accept
        </button>
        <button
          type="button"
          className="theme-button"
          onClick={() => rejectBookingSlot(booking.id)}
        >
        Reject
        </button>
      </div>
    )}
    </div>
);
};

const mapStateToProps = (state) => ({
  availabilities: state.availabilities,
});

export default connect(mapStateToProps, {
 fetchPatient,
confirmBookingSlotInDb,
  rejectBookingSlot,
  setAlert,
})(BookedSlot);
