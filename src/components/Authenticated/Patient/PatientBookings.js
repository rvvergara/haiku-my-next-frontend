import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPatientBookedSlot } from '../../../store/thunks/patient';
import { listBookings } from '../../../store/actions/booking';
import { setAuthorizationToken } from '../../../utils/api';
import BookedSlot from '../Booking/BookedSlot';

const PatientBooking = ({
 fetchPatientBookedSlot,
  currentUserData,
  bookings,
  listBookings,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPatientBookedSlot(currentUserData.patient.id);
    return () => listBookings([]);
  }, []);
  return (
    <div className="patientBooking-container">
      <h2>My Doctor Appointments</h2>
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

PatientBooking.propTypes = {
  fetchPatientBookedSlot: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  listBookings: PropTypes.func.isRequired,
  bookings: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  bookings: state.bookings,
});

export default connect(mapStateToProps, { fetchPatientBookedSlot, listBookings })(PatientBooking);
