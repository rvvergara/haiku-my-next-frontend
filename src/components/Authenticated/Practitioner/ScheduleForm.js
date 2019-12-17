import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

class ScheduleForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availableTimes: this.props.shownAvailabilities,
  };

  onDateChange = selectedDate => {
    if (selectedDate) {
      this.setState(() => ({ selectedDate: selectedDate }));
    }
    // this.setState(prevState => {
    //   const newDate = moment(prevState.selectedDate).format('MMMM D, YYYY');
    //   const newAvailabilities = this.props.availabilities.filter(avail => {
    //     return moment(avail.date).valueOf() === moment(newDate).valueOf();
    //   });
    //   return { availableTimes: newAvailabilities };
    // });
  };

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  blocksDay = day => {
    // const availableDates = this.props.availabilities.map(avail => avail.date);
    // const dayFormatted = moment(day).format('MMMM D, YYYY');
    // return !availableDates.includes(dayFormatted);
    return moment(day).isBefore(moment());
  };  

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
          isOutsideRange={this.blocksDay}
        />
      </div>
    );
  }
}

export default ScheduleForm;
