import { connect } from 'react-redux';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOnePractitioner } from '../../store/thunks/practitioner';
import { fetchPractitionerAvailabilities } from '../../store/thunks/availability';

const DoctorProfile = () => (
  <Layout title="Practitioner Profile">
    <PractitionerProfile />
  </Layout>
);

DoctorProfile.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  const { dispatch } = store;
  await dispatch(fetchOnePractitioner(query.id));
  const practitionerId = store.getState().displayedPractitioner.id;
  await dispatch(fetchPractitionerAvailabilities(practitionerId, '', ''));
};

export default connect((state) => state)(DoctorProfile);
