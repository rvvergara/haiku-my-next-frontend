import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';

export const ProfileEditPage = ({ token, currentUserData }) => (
  <Layout title={`Edit ${currentUserData.role} profile`}>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm token={token} /> : <ConnectedPatientForm token={token} />}
  </Layout>
);

ProfileEditPage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  const token = axios.defaults.headers.common.Authorization.split(' ')[1];
  return { token, currentUserData: data };
};

ProfileEditPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect((state) => state)(ProfileEditPage);
