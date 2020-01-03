import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { listAvailabilies } from '../../../store/actions/availability';

const localizer = momentLocalizer(moment);

const ScheduleList = ({ availabilities, listAvailabilies }) => {
  useEffect(() => () => listAvailabilies([]), []);
  return (
    <div className="scheduler-container">
      <Calendar
        localizer={localizer}
        events={availabilities.map((avail) => ({
            title: `${avail.startTime} - ${avail.endTime}`,
            allDay: false,
            start: new Date(`${avail.date} ${avail.startTime}`), // 10.00 AM
            end: new Date(`${avail.date} ${avail.endTime}`), // 2.00 PM
          }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

ScheduleList.propTypes = {
  availabilities: PropTypes.instanceOf(Object).isRequired,
  listAvailabilies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  availabilities: state.availabilities,
});

export default connect(mapStateToProps, { listAvailabilies })(ScheduleList);
