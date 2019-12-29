import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthorizationToken } from '../../../utils/api';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';

const PractitionerBookings = ({ bookings, fetchPractitionerAvailabilities, practitionerId }) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPractitionerAvailabilities(practitionerId);
  });
  return (
    <div>
      <h2>My Booked Slots</h2>
      {
      bookings.map((booking) => (
        <div key={booking.id}>
          { booking.id }
        </div>
      ))
    }
    </div>
);
};

PractitionerBookings.propTypes = {
  bookings: PropTypes.instanceOf(Object).isRequired,
  practitionerId: PropTypes.string.isRequired,
  fetchPractitionerAvailabilities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookings: state.availabilities,
  practitionerId: state.currentUser.data.practitioner.id,
});

export default connect(mapStateToProps, { fetchPractitionerAvailabilities })(PractitionerBookings);
