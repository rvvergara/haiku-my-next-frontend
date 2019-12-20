import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { listNotification } from '../../../store/actions/notification';

const PatientNotification = ({ listNotification, notification }) => (
  <div className="patient-notification-container">
    <div className="patient-notif-title">
      <h4>Notification</h4>
      <IoMdClose className="close-notif" />
    </div>
    <ul>
      {notification.map(notif => (
        <li key="notif.id">
          <p>You have appointment with : {notif.practitionerName}</p>
          <p>
            At : {notif.date}, {notif.startTime}-{notif.endTime}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { listNotification })(
  PatientNotification,
);
