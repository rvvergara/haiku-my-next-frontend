import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import {
  displayAvailability,
  listAvailabilies,
  removeAvailability
} from '../../../store/actions/availability';
import {
  addBooking,
  toggleSetAppointment
} from '../../../store/actions/booking';
import { bookSlot } from '../../../store/thunks/booking';
import { setAlert } from '../../../store/actions/alerts';
import { setAuthorizationToken } from '../../../utils/api';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';
import { withTranslation} from '../../../../i18n';
import {useState,useEffect} from 'react'

const BookingSelection = ({initalDate,shownAvailabilities,fetchPractitionerAvailabilities,displayedPractitioner,availabilities,t,currentUserData}) => {

  const [calendarFocused,setCalendarFocused] = useState(false)
  const [selectedDate,setSelectedDate] = useState(initalDate)

  const [availableTimes,setAvailableTimes] = useState(shownAvailabilities)

  useEffect(() => {
    setAuthorizationToken(localStorage.token)
    fetchPractitionerAvailabilities(displayedPractitioner.id,'','PENDING')
  }, [])

  const handleChange = (key, val) =>
    setState(() => ({
      [key]: val,
    }));

 const blocksDay = day => {
    const availableDates = availabilities
      .map(avail => avail.date)
      .sort();
    const dayFormatted = moment(day).format('MMMM DD, YYYY');
    return !availableDates.includes(dayFormatted);
  };

  const handleTimeClick = availability => {
    setState(() => ({
      confirmButtonAvailability: availability,
    }));

    toggleSetAppointment(true);
  displayAvailability(availability);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const bookingData = {
      patientId:currentUserData.patient.id,
      remarks: state.remarks,
    };
   bookSlot(bookingData);
    setAlert('Booking Created', 'success');
   removeAvailability(state.confirmButtonAvailability.id);
    setState(() => ({
      confirmButtonAvailability: null,
      remarks: ''
    }));
  };

  const onDateChange = selectedDate => {
    if (selectedDate) {
      setState(() => ({ selectedDate: selectedDate }));
    }

    setState(prevState => {
      const newDate = moment(prevState.selectedDate).format('MMMM D, YYYY');
      const newAvailabilities = props.availabilities.filter(avail => {
        return moment(avail.date).valueOf() === moment(newDate).valueOf();
      });
      return { availableTimes: newAvailabilities };
    });
  };

  const onFocusChange = ({ focused }) => handleChange('calendarFocused', focused);

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

        {availableTimes.map(availability => (
          <div key={availability.id}>
            <button
              className="booking-availabilities"
              onClick={() => handleTimeClick(availability)}
            >
              {availability.startTime}
            </button>
          </div>
        ))}
      </div>
  )
}


const mapStateToProps = state => ({
  availabilities: state.availabilities,
  displayedPractitioner: state.displayedPractitioner,
  displayedAvailability: state.displayedAvailability,
  currentUserData: state.currentUser.data
});

export default connect(mapStateToProps, {
  listAvailabilies,
  addBooking,
  removeAvailability,
  displayAvailability,
  toggleSetAppointment,
  bookSlot,
  fetchPractitionerAvailabilities
})(withTranslation('bookingSelection')(BookingSelection));
