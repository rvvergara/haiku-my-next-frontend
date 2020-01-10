import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import {
  displayAvailability,
  listAvailabilies,
  removeAvailability,
} from '../../../store/actions/availability';
import {
  addBooking,
  toggleSetAppointment,
} from '../../../store/actions/booking';
import { bookSlot } from '../../../store/thunks/booking';
import { setAlert } from '../../../store/actions/alerts';
import { setAuthorizationToken } from '../../../utils/api';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';
import { withTranslation} from '../../../../i18n';

class BookingSelection extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availableTimes: this.props.shownAvailabilities,
  };

  componentDidMount(){
    setAuthorizationToken(localStorage.token)
    this.props.fetchPractitionerAvailabilities(this.props.displayedPractitioner.id, '', 'PENDING')
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      availableTimes: nextProps.shownAvailabilities,
      selectedDate: moment(nextProps.initialDate),
    }));
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  blocksDay = day => {
    const availableDates = this.props.availabilities
      .map(avail => avail.date)
      .sort();
    const dayFormatted = moment(day).format('MMMM DD, YYYY');
    return !availableDates.includes(dayFormatted);
  };

  handleTimeClick = availability => {
    this.setState(() => ({
      confirmButtonAvailability: availability,
    }));
    this.props.toggleSetAppointment(true);
    this.props.displayAvailability(availability);
  };

  handleSubmit = e => {
    e.preventDefault();
    const bookingData = {
      patientId: this.props.currentUserData.patient.id,
      remarks: this.state.remarks,
    };
    this.props.bookSlot(bookingData);
    setAlert('Booking Created', 'success');
    this.props.removeAvailability(this.state.confirmButtonAvailability.id);
    this.setState(() => ({
      confirmButtonAvailability: null,
      remarks: '',
    }));
  };

  onDateChange = selectedDate => {
    if (selectedDate) {
      this.setState(() => ({ selectedDate: selectedDate }));
    }

    this.setState(prevState => {
      const newDate = moment(prevState.selectedDate).format('MMMM D, YYYY');
      const newAvailabilities = this.props.availabilities.filter(avail => {
        return moment(avail.date).valueOf() === moment(newDate).valueOf();
      });
      return { availableTimes: newAvailabilities };
    });
  };

  onFocusChange = ({ focused }) =>
    this.handleChange('calendarFocused', focused);

  render() {
    const { t } = this.props;

    return (
      <div className="booking-selection-container">
        <div>
          <label htmlFor="booking-date" className="select-date">
            {t('select-date')}
          </label>
          <SingleDatePicker
            id="booking-date"
            date={this.state.selectedDate}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={this.blocksDay}
          />
        </div>

        {this.state.availableTimes.map(availability => (
          <div key={availability.id}>
            <button
              className="booking-availabilities"
              onClick={() => this.handleTimeClick(availability)}
            >
              {availability.startTime}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  availabilities: state.availabilities,
  shownAvailabilities: state.availabilities.filter(
    avail => avail.date === state.availabilities[0].date,
  ),
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
