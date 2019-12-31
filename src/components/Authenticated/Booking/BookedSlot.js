import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { confirmBookingSlotInDb, rejectBookingSlotInDb } from '../../../store/thunks/availability';
import { setAlert } from '../../../store/actions/alerts';
import { listAvailabilies } from '../../../store/actions/availability';

const BookedSlot = ({
 booking, fetchPatient, confirmBookingSlotInDb, rejectBookingSlotInDb, setAlert, listAvailabilies,
}) => {
  let patient;

  const handleConfirm = () => {
    confirmBookingSlotInDb(booking.id);
    setAlert('Booking confirmed', 'success');
  };

  const handleReject = () => {
    rejectBookingSlotInDb(booking.id);
    setAlert('Booking rejected', 'danger');
  };
  useEffect(() => () => {
      listAvailabilies([]);
    }, []);
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
        { booking.patient.firstName}
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
          onClick={handleReject}
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
  rejectBookingSlotInDb,
  setAlert,
  listAvailabilies,
})(BookedSlot);