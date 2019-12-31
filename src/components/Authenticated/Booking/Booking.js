import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookingSelection from './BookingSelection';
import BookingForm from './BookingForm';

const Booking = ({ settingAppointment }) => (
  <div className="booking-container">
    <div className="booking-form-header">
      <h5>Book an Appointment</h5>
    </div>
    {
      settingAppointment
      ? <BookingForm />
      : <BookingSelection />
    }
  </div>
  );

Booking.propTypes = {
  // settingAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settingAppointment: state.settingAppointment,
});

export default connect(mapStateToProps)(Booking);
