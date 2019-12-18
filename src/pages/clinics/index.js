import Layout from '../../components/Layouts/Layout';
import ClinicList from '../../components/Authenticated/Clinic/ClinicList';
import { setAuthorizationToken } from '../../utils/api';

const ClinicsPage = () => {
  if (process.browser) {
    setAuthorizationToken(localStorage.token);
  }
  return (
    <Layout title="Clinics">
      <ClinicList />
    </Layout>
  );
};

export default ClinicsPage;
