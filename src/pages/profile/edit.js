import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';
import { setAuthorizationToken } from '../../utils/api';

export const ProfileEditPage = ({ currentUserData }) => (
  <Layout title={`Edit ${currentUserData.role} profile`}>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm /> : <ConnectedPatientForm />}
  </Layout>
);

ProfileEditPage.getInitialProps = (ctx) => {
  const { store,req } = ctx;
  let token;
  if (ctx.isServer) {
    token = req.headers.cookie.split('=')[1];
    setAuthorizationToken(token);
  } else {
    token = store.getState().currentUser.data.token;
    setAuthorizationToken(token);
  }
  const { data } = store.getState().currentUser;
  console.log('From edit.js',data);
  return { currentUserData: data };
};

ProfileEditPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(ProfileEditPage);
