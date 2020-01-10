import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PatientNotification from './Booking/PatientNotification';
import PractitionerNotification from './Booking/PractitionerNotification';
import PractitionerList from './Practitioner/PractitionerList';
import PractitionerProfile from './Practitioner/PractitionerProfile';

const renderDashboard = (userRole, notifications) => {
  switch (userRole) {
    case 'PRACTITIONER':
      return (
        <div>
          {notifications.length > 0 && <PractitionerNotification />}
          <PractitionerProfile />
        </div>
      );
    case 'PATIENT':
      return (
        <div>
          {notifications.length > 0 && <PatientNotification />}
          <PractitionerList />
        </div>
      );
    default:
      return null;
  }
};

export const Dashboard = ({ userRole, notifications }) => (
  <div className="dashboard">{renderDashboard(userRole, notifications)}</div>
);

Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
  notifications: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  userRole: state.currentUser.data.role,
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Dashboard);
