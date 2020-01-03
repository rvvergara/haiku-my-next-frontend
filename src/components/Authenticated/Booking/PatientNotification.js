import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { listNotifications } from '../../../store/actions/notification';
import { fetchPatientNotification, fetchUpcomingAppointment } from '../../../store/thunks/notification';

import { setAuthorizationToken } from '../../../utils/api';

const PatientNotification = ({
  listNotifications,
  notifications,
  currentUserData,
  fetchUpcomingAppointment,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchUpcomingAppointment(currentUserData.role, currentUserData.patient.id);
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
              {`Dr. ${notif.practitioner.firstName} ${notif.practitioner.lastName}`}
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
  listNotifications,
  fetchPatientNotification,
  fetchUpcomingAppointment,
})(PatientNotification);
