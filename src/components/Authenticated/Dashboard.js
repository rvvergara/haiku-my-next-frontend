import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PatientNotification from './Booking/PatientNotification';
import PractitionerBookingList from './Booking/PractitionerBookingList';
import ClinicList from './Clinic/ClinicList';
import PractitionerProfile from './Practitioner/PractitionerProfile';

const renderDashboard = userRole => {
  switch (userRole) {
    case 'practitioner':
      return (
        <div>
          <PractitionerBookingList />
          <PractitionerProfile />
        </div>
      );
    case 'patient':
      return (
        <div>
          <PatientNotification />
          <ClinicList />
        </div>
      );
    default:
      return null;
  }
};

export const Dashboard = ({ userRole }) => (
  <div className="dashboard">{renderDashboard(userRole)}</div>
);

Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userRole: state.currentUser.data.role,
});

export default connect(mapStateToProps)(Dashboard);
