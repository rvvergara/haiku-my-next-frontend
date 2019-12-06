import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerProfile from './Practitioner/PractitionerProfile';
import PatientProfile from './Patient/PatientProfile';

export const Dashboard = ({ userRole }) => (
  <div className="dashboard">
    {userRole === 'practitioner' ? <PractitionerProfile /> : <PatientProfile />}
  </div>
);

Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userRole: state.currentUser.data.role,
});

export default connect(mapStateToProps)(Dashboard);
