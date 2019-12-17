import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { setSessionDate } from '../../../store/actions/availability';

class ScheduleForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.sessionDate),
    availableTimes: this.props.shownAvailabilities,
  };

  onDateChange = selectedDate => {
    if (selectedDate) {
      this.setState(() => ({ selectedDate: selectedDate }));
    }
    this.setState(prevState => {
      this.props.setSessionDate(prevState.selectedDate.format('MMMM D, YYYY'))
    })
  };

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  blocksDay = day => {
    return moment(day).isBefore(moment().format('MMMM D, YYYY'));
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

const mapStateToProps = (state) => ({
  sessionDate: state.sessionDate
})

export default connect(mapStateToProps, { setSessionDate })(ScheduleForm);
