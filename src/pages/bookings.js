import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PatientBookings from '../components/Authenticated/Patient/PatientBookings';
import PractitionerBookings from '../components/Authenticated/Practitioner/PractitionerBookings';
import Layout from '../components/Layouts/Layout';

const BookingsPage = ({ currentUserData }) => (
  <Layout title="Bookings">
    {currentUserData.role === 'PRACTITIONER' ? (
      <PractitionerBookings />
    ) : (
      <PatientBookings />
    )}
  </Layout>
);

BookingsPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, null)(BookingsPage);
