import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from '../../i18n';
import PatientBookings from '../components/Authenticated/Patient/PatientBookings';
import PractitionerBookings from '../components/Authenticated/Practitioner/PractitionerBookings';
import Layout from '../components/Layouts/Layout';
import { fetchPractitionerBookedSlot } from '../store/thunks/availability';

const BookingsPage = ({ currentUserData, t }) => (
  <Layout title={t('title')}>
    {currentUserData.role === 'PRACTITIONER' ? (
      <PractitionerBookings />
    ) : (
      <PatientBookings />
    )}
  </Layout>
);

BookingsPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

BookingsPage.getInitialProps = ctx => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  store.dispatch(fetchPractitionerBookedSlot(data.practitioner.id, '', ''));
  return {
    currentUserData: data,
    namespacesRequired: [
      'bookings',
      'practitionerBookings',
      'patientBookings',
      'practitionerNavLink',
      'patientNavLink',
    ],
  };
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(
  mapStateToProps,
  null,
)(withTranslation('bookings')(BookingsPage));
