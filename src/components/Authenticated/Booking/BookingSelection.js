import moment from 'moment';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  displayAvailability,
  removeAvailability,
} from '../../../store/actions/availability';
import {
  addBooking,
  toggleSetAppointment,
} from '../../../store/actions/booking';
import { bookSlot } from '../../../store/thunks/booking';
import { withTranslation } from '../../../../i18n';

const BookingSelection = ({
  displayAvailability,
  availabilities,
  t,
  toggleSetAppointment,
}) => {
  const initialDate = availabilities[0].date;

  const setNewDateAndTime = (initialDate) => {
    const newDate = moment(initialDate).format('MMMM D, YYYY');
    const newAvailabilities = availabilities.filter((avail) => moment(avail.date).valueOf() === moment(newDate).valueOf() && avail.patientId === null);
    return { newDate, newAvailabilities };
  };

  const [calendarFocused, setCalendarFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(initialDate));

  const [availableTimes, setAvailableTimes] = useState(setNewDateAndTime(initialDate).newAvailabilities);

 const blocksDay = (day) => {
    const availableDates = availabilities
      .map((avail) => avail.date)
      .sort();
    const dayFormatted = moment(day).format('MMMM DD, YYYY');
    return !availableDates.includes(dayFormatted);
  };

  const handleTimeClick = (availability) => {
    toggleSetAppointment(true);
    displayAvailability(availability);
  };

  const onDateChange = (dateSelection) => {
    if (dateSelection) {
      setSelectedDate(dateSelection);
    }

    const newDate = moment(dateSelection).format('MMMM D, YYYY');
    const newAvailabilities = availabilities.filter((avail) => moment(avail.date).valueOf() === moment(newDate).valueOf() && avail.patientId === null);
    setAvailableTimes(newAvailabilities);
  };

  const onFocusChange = ({ focused }) => setCalendarFocused(focused);

  return (
    <div className="booking-selection-container">
      <div>
        <label htmlFor='booking-date' className='select-date'>
          {t('select-date')}
        </label>
        <SingleDatePicker
          id="booking-date"
          date={selectedDate}
          onDateChange={onDateChange}
          focused={calendarFocused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={blocksDay}
        />
      </div>

      {availableTimes.map((availability) => (
        <div key={availability.id}>
          <button
            type="button"
            className="booking-availabilities"
            onClick={() => handleTimeClick(availability)}
          >
            {availability.startTime}
          </button>
        </div>
        ))}
    </div>
  );
};


const mapStateToProps = (state) => ({
  availabilities: state.availabilities,
  displayedPractitioner: state.displayedPractitioner,
  displayedAvailability: state.displayedAvailability,
});

BookingSelection.propTypes = {
  displayAvailability: PropTypes.func.isRequired,
  availabilities: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
  toggleSetAppointment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addBooking,
  removeAvailability,
  displayAvailability,
  toggleSetAppointment,
  bookSlot,
})(withTranslation('bookingSelection')(BookingSelection));
