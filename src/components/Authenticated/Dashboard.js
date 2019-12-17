import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookingBox from './Booking/BookingList';
import ClinicList from './Clinic/ClinicList';
import PractitionerProfile from './Practitioner/PractitionerProfile';

const renderDashboard = userRole => {
  switch (userRole) {
    case 'practitioner':
      return <PractitionerProfile />;
    case 'patient':
      return (
        <div>
          <BookingBox />
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
