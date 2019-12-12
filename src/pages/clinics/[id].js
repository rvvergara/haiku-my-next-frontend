import { connect } from 'react-redux';
import ClinicProfile from '../../components/Authenticated/Clinic/ClinicProfile';
import Layout from '../../components/Layouts/Layout';

const ClinicPage = ({ clinic }) => (
  <Layout title={clinic.name}>
    <ClinicProfile />
  </Layout>
);

ClinicProfile.getInitialProps = ctx => {
  const { store } = ctx;
  const clinic = store.getState().displayedClinic;
  return { clinic };
};

export default connect((state) => state)(ClinicPage);

