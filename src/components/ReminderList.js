import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {})(ReminderList);
