import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ClinicList from '../../components/Authenticated/Clinic/ClinicList';
import { setAuthorizationToken } from '../../utils/api';
import { withTranslation } from '../../../i18n';

const ClinicsPage = ({ t }) => {
  if (process.browser) {
    setAuthorizationToken(localStorage.token);
  }
  return (
    <Layout title={t('title')}>
      <ClinicList />
    </Layout>
  );
};

ClinicsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

ClinicsPage.getInitialProps = () => ({
  namespacesRequired: [
    'clinics',
    'clinicList',
    'practitionerNavLink',
    'patientNavLink',
  ],
});

export default withTranslation('clinics')(ClinicsPage);
