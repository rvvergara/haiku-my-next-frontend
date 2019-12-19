import { connect } from 'react-redux';
import redirect from 'next-redirect';
import SchedulerComponent from '../components/Authenticated/Practitioner/SchedulerComponent';
import ScheduleList from '../components/Authenticated/Practitioner/ScheduleList';
import Layout from '../components/Layouts/Layout';

const SchedulePage = () => (
  <Layout title="Schedule Availability">
    <SchedulerComponent />
    <ScheduleList />
  </Layout>
);

SchedulePage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  const { role } = data;
  if (role !== 'practitioner') {
    return redirect(ctx, '/');
  }
  return data;
};

export default connect((state) => state)(SchedulePage);
