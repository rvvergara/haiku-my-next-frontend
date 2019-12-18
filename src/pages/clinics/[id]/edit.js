import { connect } from 'react-redux';
import redirect from 'next-redirect';
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
  const { dispatch, getState } = store;
  const { data } = getState().currentUser;
  if (data.role !== 'practitioner') {
    return redirect(ctx, '/');
  }
  const clinic = await dispatch(fetchOneClinic(query.id));
  return { clinic };
};

export default connect((state) => state)(ClinicUpdatePage);
