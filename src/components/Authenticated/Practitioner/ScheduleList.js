import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { listAvailabilies } from '../../../store/actions/availability';
 
const localizer = momentLocalizer(moment);

const ScheduleList = ({ availabilities, listAvailabilies }) => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: 'lightgrey',
      color: 'black',
      borderRadius: '0px',
      border: 'none',
    };

    if (event.status === 'PENDING' && event.patientId === null) {
      newStyle.backgroundColor = 'green';
    }

    if (event.status === 'PENDING' && event.patientId !== null) {
      newStyle.backgroundColor = 'tomato';
    }

    if (event.status === 'CONFIRMED') {
      newStyle.backgroundColor = 'tomato';
    }

    return {
      className: '',
      style: newStyle,
    };
  };

  useEffect(() => () => listAvailabilies([]), []);
  return (
    <div className="scheduler-container">
      <div className="color-legend">
        <div className="booked"></div> <h6> Booked</h6>
        <div className="open-slot"></div> <h6>Open Slot</h6>
      </div>
      <Calendar
        localizer={localizer}
        events={availabilities.map(avail => ({
          title: `${avail.startTime} - ${avail.endTime}`,
          allDay: false,
          start: new Date(`${avail.date} ${avail.startTime}`), // 10.00 AM
          end: new Date(`${avail.date} ${avail.endTime}`), // 2.00 PM
          status: avail.status,
          patientId: avail.patientId,
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

ScheduleList.propTypes = {
  availabilities: PropTypes.instanceOf(Object).isRequired,
  listAvailabilies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  availabilities: state.availabilities.filter(
    avail => avail.status !== 'REJECTED' || 'CANCELLED',
  ),
});

export default connect(mapStateToProps, { listAvailabilies })(ScheduleList);
