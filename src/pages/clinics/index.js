import { connect } from 'react-redux';
import { fetchClinics } from '../../store/thunks/clinic';
import Layout from '../../components/Layouts/Layout';

const ClinicsPage = ({ clinics }) => (
  <Layout title="Clinics">
    {
        clinics.map((clinic) => (
          <div key={clinic.id}>
            { clinic.name }
          </div>
        ))
      }
  </Layout>
  );

ClinicsPage.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { dispatch } = store;
  const clinics = await dispatch(fetchClinics());
  return { clinics };
};

export default connect((state) => state)(ClinicsPage);
