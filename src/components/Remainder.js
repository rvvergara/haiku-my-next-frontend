import { connect } from 'react-redux';

const Remainder = ({ notifications }) => {
  return (
    <div className="remainder-container">
      <div className="">
        <h4>Upcoming Appointment</h4>
      </div>
      <ul>
        {notifications.map(notif => (
          <li key={notif.id}>
            <p className="">
              You have appointment with :{' '}
              {`Dr. ${notif.practitionerActor.firstName} ${notif.practitionerActor.lastName}`}
            </p>
            <p className="">Date :{notif.notifiable.date}</p>
            <p className="">
              Time : {notif.notifiable.startTime}-{notif.notifiable.endTime}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {})(Remainder);
