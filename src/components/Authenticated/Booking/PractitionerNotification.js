import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { fetchUpcomingAppointment } from '../../../store/thunks/notification';
import { listNotifications } from '../../../store/actions/notification';
import { setAuthorizationToken } from '../../../utils/api';

const PractitionerNotification = ({
  notifications,
  currentUserData,
  fetchUpcomingAppointment,
  listNotifications,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchUpcomingAppointment(
      currentUserData.role,
      currentUserData.practitioner.id,
    );
    return () => listNotifications([]);
  }, []);

  const handleClick = () => {
    setIsClosed(true);
  };

  return isClosed ? null : (
    <div className="patient-notification-container">
      <div className="patient-notif-title">
        <h4>Upcoming Appointment</h4>
        <IoMdClose className="close-notif" onClick={handleClick} />
      </div>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            <p className="notif-text">
              You have appointment with :
              {' '}
              {`${notif.patient.firstName} ${notif.patient.lastName}`}
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
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  fetchUpcomingAppointment,
  listNotifications,
})(PractitionerNotification);
