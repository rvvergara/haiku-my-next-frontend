import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import redirect from 'next-redirect';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';
import { withTranslation } from '../../../i18n';

export const NewProfilePage = ({ currentUserData, t }) => {
  const role = currentUserData.role.toLowerCase();
  return (
    <Layout title={t('title', { role })}>
      <h1>{t('please-fill-up')}</h1>
      {currentUserData.role === 'PRACTITIONER' ? <ConnectedPractitionerForm /> : <ConnectedPatientForm />}
    </Layout>
);
};

NewProfilePage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;

  if (data.patient || data.practitioner) {
    return redirect(ctx, '/');
  }

  return {
    currentUserData: data,
    namespacesRequired: ['newProfile'],
  };
};

NewProfilePage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => state)(withTranslation('newProfile')(NewProfilePage));
