import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { listAvailabilies } from '../../../store/actions/availability';
import {addBooking} from '../../../store/actions/booking';
import { removeAvailability} from '../../../store/actions/availability';
import { 
  toggleSetAppointment,
  setBookingDate,
  setBookingTime
 } from '../../../store/actions/booking';

class BookingForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availableTimes: this.props.shownAvailabilities,
    confirmButtonAvailability: null,
    remarks: ''
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
    const availableDates = this.props.availabilities.map(avail => avail.date);
    const dayFormatted = moment(day).format('MMMM D, YYYY');
    return !availableDates.includes(dayFormatted);
  };

  handleTimeClick = (availability) => {
    this.setState(() => ({
    confirmButtonAvailability: availability
    }));
    this.props.toggleSetAppointment();
    this.props.setBookingDate(availability.date);
    this.props.setBookingTime(availability.startTime);
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
            {
              this.state.confirmButtonAvailability === availability &&
              (
                <div>
                    <label className='auth-label' htmlFor="remarks">
                      Remarks:
                    </label>
                    <textarea
                      id='remarks'
                      rows={10}
                      onChange={(e) => this.handleChange('remarks', e.target.value)}
                      placeholder="Give us a short background of your concern"
                      value={this.state.remarks}
                    />
                  <button
                    type="submit"
                    className="confirm-booking"
                    id={availability.id}
                    onClick={this.handleSubmit}
                    >
                    Confirm
                  </button>
                </div>
            )
          }
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
  toggleSetAppointment,
  setBookingDate,
  setBookingTime
})(BookingForm);
