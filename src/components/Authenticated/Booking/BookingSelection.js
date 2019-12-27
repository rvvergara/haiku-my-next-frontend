import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { listAvailabilies } from '../../../store/actions/availability';
import {addBooking} from '../../../store/actions/booking';
import { removeAvailability} from '../../../store/actions/availability';
import { displayAvailability } from '../../../store/actions/availability';
import { toggleSetAppointment } from '../../../store/actions/booking';

class BookingSelection extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availableTimes: this.props.shownAvailabilities,
  };



  componentWillReceiveProps(nextProps){
    this.setState(() => ({
      availableTimes: nextProps.shownAvailabilities,
      selectedDate: moment(nextProps.initialDate)    }))
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  blocksDay = day => {

    const availableDates = this.props.availabilities.map(avail => avail.date).sort();
    const dayFormatted = moment(day).format('MMMM DD, YYYY');
    return !availableDates.includes(dayFormatted);
  };

  handleTimeClick = (availability) => {
    this.setState(() => ({
    confirmButtonAvailability: availability
    }));
    this.props.toggleSetAppointment(true);
    this.props.displayAvailability(availability)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {startTime:  this.state.confirmButtonAvailability.startTime , date:moment(this.state.selectedDate).format('MMMM D, YYYY'), remarks: this.state.remarks}
    this.props.addBooking(bookingData);
    this.props.removeAvailability(this.state.confirmButtonAvailability.id);
    this.setState(() => ({
      confirmButtonAvailability: null,
      remarks: ''
    }))
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
    return (
      <div className="user-form profile-form">
        <div className="form-group">
          <label htmlFor="booking-date" className="auth-label">
            Select Date
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
  initialDate: state.availabilities[0].date,
  shownAvailabilities: state.availabilities.filter(
    avail => avail.date === state.availabilities[0].date,
  ),
});

export default connect(mapStateToProps, {
  listAvailabilies,
  addBooking,
  removeAvailability,
  displayAvailability,
  toggleSetAppointment
})(BookingSelection);
