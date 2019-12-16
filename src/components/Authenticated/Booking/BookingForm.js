import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import availabilities from '../../../Dummy/availability';

class BookingForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment()
  }

  handleChange = (key, val) => this.setState(() => ({
    [key]: val
  }));

  onDateChange = (selectedDate) => {
    if (selectedDate) {
      this.setState(() => ({'selectedDate': selectedDate}));
    }
  };

  onFocusChange = ({ focused }) => this.handleChange('calendarFocused', focused);

  render() {
    return (
      <form className="user-form profile-form">
        <div className="form-group">
          <label htmlFor="booking-date" className="auth-label">
            Select Date
          </label>
          <SingleDatePicker
           id='booking-date'
           date={this.state.selectedDate}
           onDateChange={this.onDateChange}
           focused={this.state.calendarFocused}
           onFocusChange={this.onFocusChange}
           numberOfMonths={1}
           isOutsideRange={() => false}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-time" className="auth-label">
            Hour
          </label>
          <select name="time">
            <option value="volvo">8:00AM</option>
            <option value="saab">9:30AM</option>
            <option value="fiat">11:00AM</option>
            <option value="audi">3:00PM</option>
          </select>
        </div>

        <div className="form-group">
          <button className="user-form__button">Book Appointment</button>
        </div>
      </form>
    );
  }
}

export default BookingForm;