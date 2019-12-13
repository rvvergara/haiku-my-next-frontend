import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';

export const NewProfilePage = ({ currentUserData }) => (
  <Layout title={`New ${currentUserData.role} profile`}>
    <h1>Please fill up your information first</h1>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm /> : <ConnectedPatientForm />}
  </Layout>
);

NewProfilePage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;

  return { currentUserData: data };
};

NewProfilePage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(NewProfilePage);
