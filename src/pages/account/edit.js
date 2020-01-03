import Layout from '../../components/Layouts/Layout';
import PasswordUpdateForm from '../../components/Authenticated/UserAccount/PasswordUpdateForm';

const AccountEditPage = () => (
  <Layout title='Edit Account'>
    <PasswordUpdateForm />
  </Layout>
);

export default AccountEditPage;
