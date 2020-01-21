import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PractitionerList from './Practitioner/PractitionerList';
import PractitionerProfile from './Practitioner/PractitionerProfile';

const renderDashboard = (userRole) => {
  switch (userRole) {
    case 'PRACTITIONER':
      return (
        <div>
          {' '}
          <PractitionerProfile />
        </div>
      );
    case 'PATIENT':
      return (
        <div>
          {' '}
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
