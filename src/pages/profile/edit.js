import axios from 'axios';
import PropTypes from 'prop-types';
import ConnectedPatientProfileEdit from '../../components/Authenticated/Patient/PatientProfileEdit';

const ProfileEditPage = ({ token }) => (
  <div>
    <h1>Edit your profile first!</h1>
    <ConnectedPatientProfileEdit token={token} />
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
