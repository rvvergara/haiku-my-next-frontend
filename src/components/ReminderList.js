import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reminder from './Reminder';

const ReminderList = ({ notifications }) => (
  <div className="remainder-container">
    <div className="">
      <h4>Upcoming Appointment</h4>
    </div>
    <ul>
      {notifications.map((notification) => (
        <Reminder
          key={notification.id}
          notification={notification}
        />
        ))}
    </ul>
  </div>
  );

ReminderList.propTypes = {
  notifications: PropTypes.instanceOf(Object).isRequired,
};

const filterOnlyConfirmedNotifables = (bookingSlotNotifiables) => bookingSlotNotifiables.filter((slot) => slot.notifiable.status === 'CONFIRMED');

const mapStateToProps = (state) => {
  const slotsOnly = state.notifications.filter((notif) => notif.notifiableType === 'BOOKING_SLOT');
  return {
    notifications: filterOnlyConfirmedNotifables(slotsOnly),
  };
};

export default connect(mapStateToProps, {})(ReminderList);
