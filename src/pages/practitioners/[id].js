import { connect } from 'react-redux';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOnePractitioner } from '../../store/thunks/practitioner';
import { withTranslation } from '../../../i18n';

const DoctorProfile = ({ t }) => (
  <Layout title={t('Practitioner Profile')}>
    <PractitionerProfile />
  </Layout>
);

DoctorProfile.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  const { dispatch } = store;
  await dispatch(fetchOnePractitioner(query.id));
  return {
 namespacesRequired: [
    'bookings',
    'bookingForm',
    'bookingSelection',
    'practitionerPage',
    'patientNavLink',
    'practitionerCard',
  ],
};
};

export default connect((state) => state)(withTranslation('practitionerPage')(DoctorProfile));
