import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthorizationToken } from '../../../utils/api';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';
import { setPractitioner } from '../../../store/actions/practitioners';
import BookedSlot from '../Booking/BookedSlot';

const PractitionerBookings = ({ bookings, fetchPractitionerAvailabilities, currentUserData }) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPractitionerAvailabilities(currentUserData.practitioner.id, '', '');
    return () => {
      setPractitioner({});
    };
  }, []);
  return (
    <div>
      <h2>My Booked Slots</h2>
      {
      bookings.map((booking) => (
        <BookedSlot
          key={booking.id}
          booking={booking}
        />
      ))
    }
    </div>
  );
};

PractitionerBookings.propTypes = {
  bookings: PropTypes.instanceOf(Object).isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  fetchPractitionerAvailabilities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookings: state.availabilities.filter((avail) => avail.patientId !== null),
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  fetchPractitionerAvailabilities,
  setPractitioner,
})(PractitionerBookings);