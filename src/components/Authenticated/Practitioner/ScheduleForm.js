import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { setSessionDate } from '../../../store/actions/availability';

class ScheduleForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(),
    availableTimes: this.props.shownAvailabilities,
  };

  onDateChange = selectedDate => {
    if (selectedDate) {
      this.setState(() => ({ selectedDate: selectedDate }));
    }
    this.setState(prevState => {
      this.props.setSessionDate(prevState.selectedDate.format('MMMM D, YYYY'));
    });
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
      <div className="scheduler-inner-component-container">
        <h3 className="scheduler-inner-component__title">
          {this.props.t('title')}
        </h3>
        <label htmlFor="booking-date" className="auth-label schedule-label">
          {this.props.t('date')}
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

const mapStateToProps = state => ({
  sessionDate: state.sessionDate,
});

export default connect(mapStateToProps, { setSessionDate })(
  withTranslation('scheduleForm')(ScheduleForm),
);
