import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatientBookedSlot } from '../../../store/thunks/patient';
import { setAuthorizationToken } from '../../../utils/api';
import BookedSlot from '../Booking/BookedSlot';

const PatientBooking = ({ notifications }) => (
  <div>
    <h2>My Doctor Appointments</h2>
    {
      notifications.map((booking) => (
        <BookedSlot
          key={booking.id}
          booking={booking}
        />
      ))
    }
  </div>
);

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { fetchPatientBookedSlot })(PatientBooking);
