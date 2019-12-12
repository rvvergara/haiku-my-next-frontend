import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  const { store, req } = ctx;
  // let token;
  // if (ctx.isServer) {
  //   token = req.headers.cookie.split('=')[1];
  // } else {
  //   token = store.getState().currentUser.data.token;
  // }
  // setAuthorizationToken(token);
  console.log('EDIT PAGE AUTH HEADER', axios.defaults.headers.common.Authorization);
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

ProfileEditPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(ProfileEditPage);
