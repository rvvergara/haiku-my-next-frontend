import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../components/Layouts/Layout';
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
      <VisitorContent />
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
