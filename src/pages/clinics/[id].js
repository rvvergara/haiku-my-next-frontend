import { connect } from 'react-redux';
import ClinicProfile from '../../components/Authenticated/Clinic/ClinicProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOneClinic } from '../../store/thunks/clinic'


const ClinicPage = ({ clinic }) => (


  <Layout title={clinic.name}>
    <ClinicProfile />
  </Layout>
);

ClinicProfile.getInitialProps = async(ctx )=> {
  const { store } = ctx;
  const clinic = await store.dispatch(fetchOneClinic(ctx.query.id))
  return { clinic };
};

export default connect((state) => state,{ fetchOneClinic })(ClinicPage);

