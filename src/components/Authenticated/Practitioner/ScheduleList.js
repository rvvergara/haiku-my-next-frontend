import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { listAvailabilies } from '../../../store/actions/availability';

const localizer = momentLocalizer(moment);

const ScheduleList = ({ availabilities, listAvailabilies, t }) => {
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
        <div className="booked" />
        <h6>{t('booked')}</h6>
        <div className="open-slot" />
        <h6>{t('openSlot')}</h6>
      </div>
      <Calendar
        localizer={localizer}
        events={availabilities.map(avail => ({
          title: `${avail.startTime} - ${avail.endTime}`,
          allDay: false,
          start: new Date(`${avail.date} ${avail.startTime}`),
          end: new Date(`${avail.date} ${avail.endTime}`),
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

export default connect(mapStateToProps, { listAvailabilies })(
  withTranslation('scheduleForm')(ScheduleList),
);
