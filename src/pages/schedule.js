import { connect } from 'react-redux';
import redirect from 'next-redirect';
import SchedulerComponent from '../components/Authenticated/Practitioner/SchedulerComponent';
import ScheduleList from '../components/Authenticated/Practitioner/ScheduleList';
import Layout from '../components/Layouts/Layout';
import { fetchPractitionerAvailabilities } from '../store/thunks/availability';

const SchedulePage = () => (
  <Layout title="Schedule Availability">
    <SchedulerComponent />
    <ScheduleList />
  </Layout>
);

SchedulePage.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  const { role, profile } = data;
  const practitionerId = profile.id;
  if (role !== 'PRACTITIONER') {
    return redirect(ctx, '/');
  }
  await store.dispatch(fetchPractitionerAvailabilities(practitionerId));
  return data;
};

export default connect((state) => state)(SchedulePage);
