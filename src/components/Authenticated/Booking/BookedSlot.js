import { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { confirmBookingSlotInDb, rejectBookingSlotInDb } from '../../../store/thunks/availability';
import { setAlert } from '../../../store/actions/alerts';
import { listAvailabilies } from '../../../store/actions/availability';
import ProfileCard from './ProfileCard';
import { withTranslation } from '../../../../i18n';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({
 bookingId,
 confirmBookingSlotInDb,
 rejectBookingSlotInDb,
 setAlert,
 listAvailabilies,
 currentUserData,
 booking,
 t,
}) => {
  const handleConfirm = async () => {
    setAuthorizationToken(localStorage.token);
    await confirmBookingSlotInDb(bookingId);
    setAlert('Booking confirmed', 'success');
  };

  const handleReject = () => {
    setAuthorizationToken(localStorage.token);
    rejectBookingSlotInDb(bookingId);
    setAlert('Booking rejected', 'danger');
  };
  useEffect(() => () => {
      listAvailabilies([]);
    }, []);
  return (
    <div>
      <p>
        {t('date')}
        {booking.date}
      </p>
      <p>
        {t('time')}
        {booking.startTime}
        {' '}
        {t('to')}
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
          {t('accept')}
        </button>
        <button
          type="button"
          className="theme-button"
          onClick={handleReject}
        >
          {t('reject')}
        </button>
      </div>
    )}
      {
      booking.status === 'CONFIRMED' && (
        <div className="practitioner-actions">
          <Link href={`/video?token=${booking.callToken}`}>
            <a
              href={`/video?token=${booking.callToken}`}
              className="theme-button"
            >
              Join Call
            </a>
          </Link>
        </div>
      )
    }
    </div>
);
};

BookedSlot.propTypes = {
  booking: PropTypes.instanceOf(Object).isRequired,
  bookingId: PropTypes.string.isRequired,
  confirmBookingSlotInDb: PropTypes.func.isRequired,
  rejectBookingSlotInDb: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  listAvailabilies: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  availabilities: state.availabilities,
  currentUserData: state.currentUser.data,
  booking: state.bookings.find((slot) => slot.id === ownProps.bookingId),
});

export default connect(mapStateToProps, {
confirmBookingSlotInDb,
  rejectBookingSlotInDb,
  setAlert,
  listAvailabilies,
})(withTranslation('bookedSlot')(BookedSlot));
