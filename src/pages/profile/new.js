import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';
import { setAuthorizationToken } from '../../utils/api'

export const NewProfilePage = ({ currentUserData }) => (
  <Layout title={`New ${currentUserData.role} profile`}>
    <h1>Please fill up your information first</h1>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm  /> : <ConnectedPatientForm  />}
  </Layout>
);

NewProfilePage.getInitialProps = (ctx) => {
  const { store,req } = ctx;
  let token;
  if (ctx.isServer) {

    token = req.headers.cookie.split('=')[1];
    setAuthorizationToken(token);
  ;
  } else {
    token = store.getState().currentUser.data.token;
    setAuthorizationToken(token);
  }
  const { data } = store.getState().currentUser;
  console.log('From new.js',data)

  return { currentUserData: data };
};

NewProfilePage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(NewProfilePage);
