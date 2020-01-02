import { useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmBookingSlotInDb, rejectBookingSlotInDb } from '../../../store/thunks/availability';
import { setAlert } from '../../../store/actions/alerts';
import { listAvailabilies } from '../../../store/actions/availability';
import ProfileCard from './ProfileCard';

const BookedSlot = ({
 booking, confirmBookingSlotInDb, rejectBookingSlotInDb, setAlert, listAvailabilies, currentUserData,
}) => {
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
      <ProfileCard profile={currentUserData.role === 'PRACTITIONER' ? booking.patient : booking.practitioner} />
      {(booking.status === 'PENDING' && currentUserData.role === 'PRACTITIONER') && (
      <div className="practitioner-actions">
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
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
confirmBookingSlotInDb,
  rejectBookingSlotInDb,
  setAlert,
  listAvailabilies,
})(BookedSlot);
