import { connect } from 'react-redux';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { setAuthorizationToken } from '../../utils/api';

const DoctorProfile = () => (
  <Layout title="Practitioner Profile">
    <h1>DoctorProfile Practitioner Profile here</h1>
    <PractitionerProfile />
  </Layout>
);

DoctorProfile.getInitialProps = async ctx => {
  const { store, req, query } = ctx;
  let token;
  if (ctx.isServer) {
    token = req.headers.cookie.split('=')[1];
  } else {
    token = store.getState().currentUser.data.token;
  }
  setAuthorizationToken(token);
  console.log('Our query', query);
  // store.dispatch(id)
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

export default connect(state => state)(DoctorProfile);
