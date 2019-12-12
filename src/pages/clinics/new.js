import { connect } from 'react-redux';
import ClinicForm from '../../components/Authenticated/Clinic/ClinicForm';
import Layout from '../../components/Layouts/Layout';
import initialize from '../../utils/initialize';

const CreateClinic = ({ currentUserData, token }) => (
  <Layout title="Add New Clinic">
    <h1>Create Clinic here</h1>
    <ClinicForm token={token} />
  </Layout>
);

CreateClinic.getInitialProps = (ctx) => {
  const { store, req } = ctx;
  let token;
  if (ctx.isServer) {
    token = req.headers.cookie.split('=')[1];
  } else {
    token = store.getState().currentUser.data.token;
  }
  const { data } = store.getState().currentUser;
  return { currentUserData: data, token };
};

export default connect((state) => state)(CreateClinic);
