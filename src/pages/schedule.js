import ScheduleForm from '../components/Authenticated/Practitioner/ScheduleForm';
import SessionDuration from '../components/Authenticated/Practitioner/SessionDuration';
import Layout from '../components/Layouts/Layout';

const SchedulePage = () => (
  <Layout title="Schedule Availability">
    <h3>Choose an available day for your appointment</h3>
    <ScheduleForm />
    <div>
      <div>
        Availability 1 - Booked
      </div>
      <div>
        Availability 2
      </div>
    </div>
    <SessionDuration />
    <h3>Choose an available time for your appointment</h3>
    <button type="button" className="booking-availabilities">
      10:00AM
    </button>
    <button type="button" className="booking-availabilities">
      02:00PM
    </button>
    <div>
      <button
        type="button"
        className="clinic-button"
      >
        Submit
        {' '}
      </button>
    </div>

  </Layout>
);

export default SchedulePage;
