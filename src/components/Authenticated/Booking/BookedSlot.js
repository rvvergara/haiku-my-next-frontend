import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmBookingSlotInDb, rejectBookingSlotInDb } from '../../../store/thunks/availability';
import { setAlert } from '../../../store/actions/alerts';
import { listAvailabilies } from '../../../store/actions/availability';
import ProfileCard from './ProfileCard';
import { withTranslation } from '../../../../i18n';

const BookedSlot = ({
 booking,
 confirmBookingSlotInDb,
 rejectBookingSlotInDb,
 setAlert,
 listAvailabilies,
 currentUserData,
 t,
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
    </div>
);
};

BookedSlot.propTypes = {
  booking: PropTypes.instanceOf(Object).isRequired,
 confirmBookingSlotInDb: PropTypes.func.isRequired,
 rejectBookingSlotInDb: PropTypes.func.isRequired,
 setAlert: PropTypes.func.isRequired,
 listAvailabilies: PropTypes.func.isRequired,
 currentUserData: PropTypes.func.isRequired,
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
})(withTranslation('bookedSlot')(BookedSlot));
