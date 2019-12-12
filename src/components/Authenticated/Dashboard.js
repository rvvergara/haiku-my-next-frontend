import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerProfile from './Practitioner/PractitionerProfile';
import PatientProfile from './Patient/PatientProfile';
import ClinicProfile from './Admin/ClinicProfile';
import { userConstants } from '../../store/constants/userConstants'
import Clinics from '../../components/Authenticated/Clinic/Clinics'

const renderDashboard = (userRole) => {
  switch (userRole) {
    case userConstants.PRACTITIONER_ROLE:
      return <PractitionerProfile />;
    case userConstants.PATIENT_ROLE:
      return <Clinics />
    case userConstants.ADMIN_ROLE:
      return <ClinicProfile />
    default:
      return null
  }
}

export const Dashboard = ({ userRole }) => (
  <div className="dashboard">
    {renderDashboard(userRole)}
  </div>
);

Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userRole: state.currentUser.data.role,
});

export default connect(mapStateToProps)(Dashboard);
