import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookingSelection from './BookingSelection';
import BookingForm from './BookingForm';
import { listAvailabilies } from '../../../store/actions/availability';
import { withTranslation } from '../../../../i18n';

const Booking = ({
  settingAppointment,
   listAvailabilies,
   t,
}) => {
  useEffect(() => () => listAvailabilies([]),
   []);
  return (
    <div className="booking-container">
      <div className="booking-form-header">
        <h5>{t('book-an-appointment')}</h5>
      </div>
      {
      settingAppointment
      ? <BookingForm />
      : <BookingSelection />
    }
    </div>
  );
};

Booking.propTypes = {
  settingAppointment: PropTypes.bool.isRequired,
  listAvailabilies: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settingAppointment: state.settingAppointment,
  displayedPractitioner: state.displayedPractitioner,
});

export default connect(mapStateToProps, {
   listAvailabilies,
  })(withTranslation('bookings')(Booking));
