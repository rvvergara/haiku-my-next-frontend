import PasswordUpdateForm from '../../components/Authenticated/UserAccount/PasswordUpdateForm';
import Layout from '../../components/Layouts/Layout';

const AccountEditPage = () => (
  <Layout title="Edit Account">
    <div className="passwordUpdate-container">
      <PasswordUpdateForm />
    </div>
  </Layout>
);

export default AccountEditPage;
