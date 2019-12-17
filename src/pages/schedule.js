import ScheduleForm from '../components/Authenticated/Practitioner/ScheduleForm';
import Layout from '../components/Layouts/Layout';

const SchedulePage = () => (
  <Layout title="Schedule Availability">
    <h3>Choose an available day for your appointment</h3>
    <ScheduleForm />
    <h3>Choose Duration</h3>
    <button type="button" className="booking-availabilities">
      30 minutes
    </button>
    <button type="button" className="booking-availabilities">
      60 minutes
    </button>
    <button type="button" className="booking-availabilities">
      120 minutes
    </button>
    <h3>Choose an available time for your appointment</h3>
    <button type="button" className="booking-availabilities">
      10:00AM
    </button>
    <button type="button" className="booking-availabilities">
      02:00PM
    </button>
    <button type="button">Submit</button>
  </Layout>
);

export default SchedulePage;
