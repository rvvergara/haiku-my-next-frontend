import { connect } from 'react-redux';
import BookingSelection from './BookingSelection';
import BookingForm from './BookingForm';

const Booking = ({ settingAppointment }) => (
  <div className="booking-container">
    <div className="booking-form-header">
      <h3>Book an Appointment</h3>
      <p>Monday to Friday 09.00am-06.00pm</p>
    </div>
    {
      settingAppointment
      ? <BookingForm />
      : <BookingSelection />
    }
  </div>
  );

const mapStateToProps = (state) => ({
  settingAppointment: state.settingAppointment,
});

export default connect(mapStateToProps)(Booking);
