import { IoMdClose } from 'react-icons/io';

const PatientNotification = () => (
  <div className="patient-notification-container">
    <div className="patient-notif-title">
      <h4>Notification</h4>
      <IoMdClose className="close-notif" />
    </div>
    <ul>
      <li>
        <p>You have appointment with : Dr. Peter Goh Min Yih.</p>
        <p>At: December, 17 2019, 09:00AM-10:00AM</p>
      </li>
    </ul>
  </div>
);

export default PatientNotification;
