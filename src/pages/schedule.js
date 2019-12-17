import ScheduleForm from '../components/Authenticated/Practitioner/ScheduleForm';
import Layout from '../components/Layouts/Layout';

const SchedulePage = () => (
  <Layout title="Schedule Availability">
    <h1>Doctor Schedule setting here</h1>
    <ScheduleForm />
  </Layout>
);

export default SchedulePage;
