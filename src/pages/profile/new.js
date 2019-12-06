import axios from 'axios';
import PropTypes from 'prop-types';
import ConnectedPatientProfileForm from '../../components/Authenticated/Patient/PatientProfileForm';

const ProfileEditPage = ({ token }) => (
  <div>
    <h1>Please fill up your information first</h1>
    <ConnectedPatientProfileForm token={token} />
  </div>
);

ProfileEditPage.getInitialProps = () => {
  const token = axios.defaults.headers.common.Authorization.split(' ')[1];
  return { token };
};

ProfileEditPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ProfileEditPage;
