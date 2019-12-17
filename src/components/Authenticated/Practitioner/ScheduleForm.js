import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ScheduleForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availableTimes: this.props.shownAvailabilities,
    remarks: '',
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

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  onFocusChange = ({ focused }) =>
    this.handleChange('calendarFocused', focused);

  render() {
    return (
      <div>
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
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

export default ScheduleForm;
