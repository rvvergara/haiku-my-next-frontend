import { connect } from 'react-redux';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOnePractitioner } from '../../store/thunks/practitioner';

const DoctorProfile = () => (
  <Layout title="Practitioner Profile">
    <PractitionerProfile />
  </Layout>
);

DoctorProfile.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  await store.dispatch(fetchOnePractitioner(query.id));
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

export default connect((state) => state)(DoctorProfile);
