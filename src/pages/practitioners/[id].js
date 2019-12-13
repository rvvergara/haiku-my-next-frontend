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
  const { dispatch } = store;
  await dispatch(fetchOnePractitioner(query.id));
};

export default connect((state) => state)(DoctorProfile);
