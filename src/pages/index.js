import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../components/Layouts/Layout';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VisitorContent from '../components/VisitorContent/VisitorContent';
import ConnectedDashboard from '../components/Authenticated/Dashboard';
import { withTranslation } from '../../i18n';

export const IndexPage = ({ currentUser, t }) => {
  if (currentUser.authenticated) {
    return (
      <Layout title={t('title')} userName={currentUser.data.firstName}>
        <ConnectedDashboard />
      </Layout>
    );
  }
    return (
      <VisitorLayout title={t('visitorTitle')}>
        <VisitorContent />
      </VisitorLayout>
    );
};

IndexPage.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

IndexPage.getInitialProps = (ctx) => {
  const { currentUser } = ctx.store.getState();
  return { currentUser, namespacesRequired: ['practitionerNavLink', 'index', 'visitorHeader', 'patientNavLink'] };
};

export default (connect((state) => state)(withTranslation('index')(IndexPage)));
