import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';
import { withTranslation } from '../../../i18n';

export const ProfileEditPage = ({ currentUserData, t }) => {
  const role = currentUserData.role.toLowerCase();
  return (
    <Layout title={t('title', { role })}>
      {currentUserData.role === 'PRACTITIONER' ? <ConnectedPractitionerForm /> : <ConnectedPatientForm />}
    </Layout>
);
};

ProfileEditPage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  return {
    currentUserData: data,
    namespacesRequired: [
      'editProfile',
      'practitionerNavLink',
      'patientNavLink',
    ],
  };
};

ProfileEditPage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(withTranslation('editProfile')(ProfileEditPage));
