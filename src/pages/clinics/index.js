import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import { fetchClinics } from '../../store/thunks/clinic';
import ClinicList from '../../components/Authenticated/Clinic/ClinicList';
import { setAuthorizationToken } from '../../utils/api';

const ClinicsPage = ({ clinics, currentUserData }) => {
  if (process.browser) {
    setAuthorizationToken(localStorage.token);
  }
  return (
    <Layout title="Clinics">
      <ClinicList />
    </Layout>
);
};

ClinicsPage.propTypes = {
  clinics: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

ClinicsPage.getInitialProps = async (ctx) => {
  const { store, req } = ctx;
  const { dispatch, getState } = store;
  const clinics = await dispatch(fetchClinics());
  const currentUserData = getState().currentUser.data;
  return { clinics, currentUserData };
};

export default connect((state) => state)(ClinicsPage);
