import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../components/Layouts/Layout';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VisitorContent from '../components/VisitorContent/VisitorContent';
import ConnectedDashboard from '../components/Authenticated/Dashboard';

export const IndexPage = ({ currentUser }) => {
  if (currentUser.authenticated) {
    return (
      <Layout title="Home">
        <ConnectedDashboard />
      </Layout>
    );
  }
    return (
      <VisitorLayout title="Health That Cares">
        <VisitorContent />
      </VisitorLayout>
    );
};

IndexPage.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
};

IndexPage.getInitialProps = (ctx) => {
  const { currentUser } = ctx.store.getState();
  return { currentUser };
};

export default connect((state) => state)(IndexPage);
