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
        events={availabilities.map((avail) => {
          console.log('USING NEW DATE', new Date('January 02, 2020,03:24:00'));
          console.log('START TIME', moment(`${avail.date} ${avail.startTime}`, 'LTS').format('ddd MMM DD YYYY LT'));
          console.log('END TIME', moment(avail.endTime, 'LTS').format('YYYY-MM-DD HH:MM:SS'));
          return {
            title: `${avail.startTime} - ${avail.endTime}`,
            allDay: false,
            start: moment(`${avail.date} ${avail.startTime}`, 'LTS').format('YYYY-MM-DD, HH:MM:SS'), // 10.00 AM
            end: moment(`${avail.date} ${avail.endTime}`, 'LTS').format('YYYY-MM-DD, HH:MM:SS'), // 2.00 PM
          };
        })}
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
