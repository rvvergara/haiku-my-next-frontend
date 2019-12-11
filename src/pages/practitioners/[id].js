import { connect } from 'react-redux';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { setAuthorizationToken } from '../../utils/api';
import { fetchOnePractitioner } from '../../store/thunks/practitioner';

const DoctorProfile = () => (
  <Layout title="Practitioner Profile">
    <PractitionerProfile />
  </Layout>
);

DoctorProfile.getInitialProps = async (ctx) => {
  const { store, req, query } = ctx;
  let token;
  if (ctx.isServer) {
    token = req.headers.cookie.split('=')[1];
  } else {
    token = store.getState().currentUser.data.token;
  }
  setAuthorizationToken(token);
  store.dispatch(fetchOnePractitioner(query.id));
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

export default connect((state) => state)(DoctorProfile);
