import Link from 'next/link';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import { fetchClinics } from '../../store/thunks/clinic';
import { setAuthorizationToken } from '../../utils/api';

const ClinicsPage = ({ clinics, token }) => {
  setAuthorizationToken(token);
  return (
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
  );
};

ClinicsPage.getInitialProps = async (ctx) => {
  const { store, req } = ctx;
  let token;
  if (ctx.isServer) {
    token = req.headers.cookie.split('=')[1];
    setAuthorizationToken(token);
  } else {
    token = store.getState().currentUser.data.token;
    setAuthorizationToken(token);
  }
  const { data } = store.getState().currentUser;
  const { dispatch } = store;
  const clinics = await dispatch(fetchClinics());
  return { clinics, token };
};

export default connect((state) => state)(ClinicsPage);
