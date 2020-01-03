import Layout from '../../components/Layouts/Layout';
import PasswordUpdateForm from '../../components/Authenticated/UserAccount/PasswordUpdateForm';

const AccountEditPage = () => (
  <Layout title='Edit Account'>
    <div className='login-box'>
      <PasswordUpdateForm />
    </div>

  </Layout>
);

export default AccountEditPage;
