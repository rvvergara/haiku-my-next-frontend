import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerProfile from '../../components/Authenticated/Practitioner/PractitionerProfile';
import Layout from '../../components/Layouts/Layout';
import { fetchOnePractitioner } from '../../store/thunks/practitioner';
import { setPractitioner } from '../../store/actions/practitioners';

const DoctorProfile = ({ dispatch }) => {
  useEffect(() => () => dispatch(setPractitioner({})), []);
  return (
    <Layout title="Practitioner Profile">
      <PractitionerProfile />
    </Layout>
);
};

DoctorProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

DoctorProfile.getInitialProps = async (ctx) => {
  const { store, query } = ctx;
  const { dispatch } = store;
  await dispatch(fetchOnePractitioner(query.id));
  return { dispatch };
};

export default connect((state) => state)(DoctorProfile);
