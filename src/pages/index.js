import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../components/Layouts/Layout';
import VisitorContent from '../components/VisitorContent/VisitorContent';
import Dashboard from '../components/Authenticated/Dashboard';

export const IndexPage = ({ currentUser }) => {
  if (currentUser.authenticated) {
    return (
      <Layout title="Home">
        <Dashboard />
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

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(IndexPage);
