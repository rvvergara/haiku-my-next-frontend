import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClinicProfile from '../../components/Authenticated/Clinic/ClinicProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOneClinic } from '../../store/thunks/clinic';
import { withTranslation } from '../../../i18n';

const ClinicPage = ({ clinic, t }) => {
  const { name } = clinic;
  return (
    <Layout title={t('title', { name })}>
      <ClinicProfile />
    </Layout>
  );
};

ClinicPage.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

ClinicPage.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const clinic = await store.dispatch(fetchOneClinic(ctx.query.id));
  return {
    clinic,
    namespacesRequired: [
      'clinicProfile',
      'practitionerNavLink',
      'patientNavLink',
    ],
  };
};

export default connect((state) => state, { fetchOneClinic })(withTranslation('clinicProfile')(ClinicPage));
