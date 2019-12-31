import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { listNotification } from '../../../store/actions/notification';
import { fetchPatientBookedSlot } from '../../../store/thunks/patient';
import { setAuthorizationToken } from '../../../utils/api';

const PatientNotification = ({
  listNotification,
  notification,
  fetchPatientBookedSlot,
  currentUserData,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPatientBookedSlot(currentUserData.patient.id);
  }, []);

  const handleClick = () => {
    setIsClosed(true);
  };

  return isClosed ? null : (
    <div className="patient-notification-container">
      <div className="patient-notif-title">
        <h4>Notification</h4>
        <IoMdClose className="close-notif" onClick={handleClick} />
      </div>
      <ul>
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
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  listNotification,
  fetchPatientBookedSlot,
})(PatientNotification);