import ReferralForm from '../components/Authenticated/ReferralForm';
import Rewards from '../components/Authenticated/Rewards';
import Layout from '../components/Layouts/Layout';

const rewards = () => (
  <Layout title="Bookings">
    <div className="rewards-container">
      <ReferralForm />
      <Rewards />
    </div>
  </Layout>
);
export default rewards;
