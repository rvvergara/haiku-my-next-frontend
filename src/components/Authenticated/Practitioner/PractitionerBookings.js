import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { setPractitioner } from '../../../store/actions/practitioners';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';
import BookedSlot from '../Booking/BookedSlot';

const PractitionerBookings = ({
  bookings,
  t,
}) => (
  <div className="practitionerBooking-container">
    <h2>{t('my-booked-slots')}</h2>
    {bookings.map((booking) => (
      <BookedSlot key={booking.id} bookingId={booking.id} />
      ))}
  </div>
  );

PractitionerBookings.propTypes = {
  bookings: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookings: state.bookings,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  fetchPractitionerAvailabilities,
  setPractitioner,
})(withTranslation('practitionerBookings')(PractitionerBookings));
