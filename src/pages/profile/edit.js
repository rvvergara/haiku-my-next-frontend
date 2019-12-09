import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';

export const ProfileEditPage = ({ currentUserData }) => (
  <Layout title={`Edit ${currentUserData.role} profile`}>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm /> : <ConnectedPatientForm />}
  </Layout>
);

ProfileEditPage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

ProfileEditPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(ProfileEditPage);
