import { connect } from 'react-redux';
import redirect from 'next-redirect';
import PropTypes from 'prop-types';
import ConnectedClinicForm from '../../../components/Authenticated/Clinic/ClinicForm';
import Layout from '../../../components/Layouts/Layout';
import { fetchOneClinic } from '../../../store/thunks/clinic';

const ClinicUpdatePage = ({ clinic }) => (
  <Layout title={`Edit ${clinic.name}`}>
    <ConnectedClinicForm />
  </Layout>
);

ClinicUpdatePage.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
};

ClinicUpdatePage.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  const { dispatch, getState } = store;
  const { data } = getState().currentUser;
  if (data.role !== 'PRACTITIONER') {
    return redirect(ctx, '/');
  }
  const clinic = await dispatch(fetchOneClinic(query.id));
  return { clinic };
};

export default connect((state) => state)(ClinicUpdatePage);
