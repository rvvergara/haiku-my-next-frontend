import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';

export const NewClinicPage = ({ token, currentUserData }) => (
  <Layout title={`New ${currentUserData.role} profile`}>
    <h1>Please fill up your information first</h1>

  </Layout>
);

NewClinicPage.getInitialProps = ctx => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  const token = axios.defaults.headers.common.Authorization.split(' ')[1];
  return { token, currentUserData: data };
};

NewClinicPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(state => state)(NewClinicPage);
