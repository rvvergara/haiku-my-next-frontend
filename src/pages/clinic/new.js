import { connect } from 'react-redux';
import ClinicForm from '../../components/Authenticated/Clinic/ClinicForm';

const CreateClinic = () => (
  <div>
    <h1>Create Clinic here</h1>
    <ClinicForm />
  </div>
);

CreateClinic.getInitialProps = ctx => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  return { currentUserData: data };
};

export default connect((state) => state)(CreateClinic);
