import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import { fetchClinics } from '../../store/thunks/clinic';
import { setAuthorizationToken } from '../../utils/api';

const ClinicsPage = ({ clinics }) => 
  // setAuthorizationToken(token);
   (
    <Layout title="Clinics">
      <Link href="/clinics/new">
        <a href="/clinics/new" className="nav-link">
          Add new clinic
        </a>
      </Link>

      {clinics.map((clinic) => (
        <div key={clinic.id}>{clinic.name}</div>
      ))}
    </Layout>
  )
;

ClinicsPage.propTypes = {
  clinics: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

ClinicsPage.getInitialProps = async (ctx) => {
  const { store, req } = ctx;
  // let token;
  // if (ctx.isServer) {
  //   token = req.headers.cookie.split('=')[1];
  // } else {
  //   token = store.getState().currentUser.data.token;
  // }
  // setAuthorizationToken(token);
  const { dispatch } = store;
  const clinics = await dispatch(fetchClinics());
  return { clinics };
};

export default connect((state) => state)(ClinicsPage);
