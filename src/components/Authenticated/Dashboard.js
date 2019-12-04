import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerProfile from './Practitioner/PractitionerProfile';
import PatientProfile from './Patient/PatientProfile';
import { userConstants } from '../../store/constants/userConstants'

const renderDashboard = (userRole) => {
  switch (userRole) {
    case userConstants.PRACTITIONER_ROLE:
      return <PractitionerProfile />;
    case userConstants.PATIENT_ROLE:
      return <PatientProfile />
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
