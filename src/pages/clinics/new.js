import { connect } from 'react-redux';
import ClinicForm from '../../components/Authenticated/Clinic/ClinicForm';
import Layout from '../../components/Layouts/Layout';
import initialize from '../../utils/initialize'

const CreateClinic = ({ currentUserData, token }) => (
  <Layout title="Add New Clinic">
    <h1>Create Clinic here</h1>
    <ClinicForm token={token} />
  </Layout>
);

CreateClinic.getInitialProps = (ctx) => {
  initialize(ctx)
  const { store } = ctx;
  console.log('Context-456', ctx);
  const token = ctx.req.headers.cookie.split('=')[1];
  const { data } = store.getState().currentUser;
  return { currentUserData: data, token };
};

export default connect((state) => state)(CreateClinic);
