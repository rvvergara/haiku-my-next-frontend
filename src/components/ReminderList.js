import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reminder from './Reminder';

const ReminderList = ({ notifications, currentUserData }) => {
  return notifications.length === 0 ? null : (
    <div className="remainder-container">
      <div className="">
        <h4>Upcoming Appointment</h4>
      </div>
      <ul>
        {notifications.map(notification => (
          <Reminder
            key={notification.id}
            notification={notification}
            currentUserData={currentUserData}
          />
        ))}
      </ul>
    </div>
  );
};

ReminderList.propTypes = {
  notifications: PropTypes.instanceOf(Object).isRequired,
};

const filterOnlyConfirmedNotifables = bookingSlotNotifiables =>
  bookingSlotNotifiables.filter(slot => slot.notifiable.status === 'CONFIRMED');

const mapStateToProps = state => {
  const slotsOnly = state.notifications.filter(
    notif => notif.notifiableType === 'BOOKING_SLOT',
  );
  return {
    notifications: filterOnlyConfirmedNotifables(slotsOnly),
    currentUserData: state.currentUser.data,
  };
};

export default connect(mapStateToProps, {})(ReminderList);
