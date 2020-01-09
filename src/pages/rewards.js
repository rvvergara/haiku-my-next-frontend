import Layout from '../components/Layouts/Layout';
import ReferralForm from '../components/Authenticated/ReferralForm';

const rewards = () => (
  <Layout title="Bookings">
    <div>
      <h1>Earn Rewards by Inviting your friends</h1>
      <ReferralForm />
    </div>
  </Layout>
);
export default rewards;
