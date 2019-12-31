import { connect } from 'react-redux';
import redirect from 'next-redirect';
import ClinicForm from '../../components/Authenticated/Clinic/ClinicForm';
import Layout from '../../components/Layouts/Layout';

const CreateClinic = () => (
  <Layout title="Add New Clinic">
    <h1>Create Clinic here</h1>
    <ClinicForm />
  </Layout>
);

CreateClinic.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  if (data.role !== 'PRACTITIONER') {
    return redirect(ctx, '/');
  }
  return { currentUserData: data };
};

export default connect((state) => state)(CreateClinic);
