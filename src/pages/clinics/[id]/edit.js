import { connect } from 'react-redux';
import ConnectedClinicForm from '../../../components/Authenticated/Clinic/ClinicForm';
import Layout from '../../../components/Layouts/Layout';
import { fetchOneClinic } from '../../../store/thunks/clinic';

const ClinicUpdatePage = ({ clinic }) => (
  <Layout title={`Edit ${clinic.name}`}>
    <ConnectedClinicForm />
  </Layout>
);

ClinicUpdatePage.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  const { dispatch } = store;
  const clinic = await dispatch(fetchOneClinic(query.id));
  return { clinic };
};

export default connect((state) => state)(ClinicUpdatePage);
