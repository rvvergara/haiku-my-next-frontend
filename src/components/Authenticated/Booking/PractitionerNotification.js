import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { listNotificationPractitioner } from '../../../store/actions/notification';
import { fetchPractitionerBookedSlot } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';

const PractitionerNotification = ({
  listNotificationPractitioner,
  notification,
  currentUserData,
  fetchPractitionerBookedSlot,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPractitionerBookedSlot(currentUserData.practitioner.id);
  }, []);

  const handleClick = () => {
    setIsClosed(true);
  };

  return isClosed ? null : (
    <div className="patient-notification-container">
      <div className="patient-notif-title">
        <h4>Notification for doctor</h4>
        <IoMdClose className="close-notif" onClick={handleClick} />
      </div>
      {/* <ul>
        {notification.map((notif) => (
          <li key={notif.id}>
            <p className="notif-text">
              You have appointment with :
              {' '}
              {notif.practitionerName}
            </p>
            <p className="notif-text">
Date :
              {notif.date}
            </p>
            <p className="notif-text">
              Time :
              {' '}
              {notif.startTime}
-
              {notif.endTime}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  listNotificationPractitioner,
  fetchPractitionerBookedSlot,
})(PractitionerNotification);
