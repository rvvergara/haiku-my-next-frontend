import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerProfile from './Practitioner/PractitionerProfile';
import ClinicList from './Clinic/ClinicList';

const renderDashboard = (userRole) => {
  switch (userRole) {
    case 'practitioner':
      return <PractitionerProfile />;
    case 'patient':
      return <ClinicList />;
    default:
      return null;
  }
};

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
