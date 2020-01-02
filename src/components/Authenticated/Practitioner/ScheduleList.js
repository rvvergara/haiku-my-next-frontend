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
      {/* {availabilities.map((availability) => (
        <div key={availability.id}>
          <div>
            <strong>{availability.date}</strong>
          </div>
          <div>
            From
            {' '}
            {availability.startTime}
            {' '}
            To
            {' '}
            {availability.endTime}
          </div>
          <div>{availability.booked ? 'Booked' : ''}</div>
        </div>
      ))} */}
      <Calendar
        localizer={localizer}
        events={[
          {
            title: '10am-2pm',
            allDay: false,
            start: new Date(2020, 0, 1, 10, 0), // 10.00 AM
            end: new Date(2020, 0, 1, 14, 0), // 2.00 PM
          },
        ]}
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

const mapStateToProps = state => ({
  availabilities: state.availabilities,
});

export default connect(mapStateToProps, { listAvailabilies })(ScheduleList);
