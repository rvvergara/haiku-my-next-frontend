import { connect } from 'react-redux';
import ClinicForm from '../../components/Authenticated/Clinic/ClinicForm';

const CreateClinic = ({ currentUserData, token }) => (
  <div>
    <h1>Create Clinic here</h1>
    <ClinicForm token={token} />
  </div>
);

CreateClinic.getInitialProps = (ctx) => {
  const { store } = ctx;
  const token = ctx.req.headers.cookie.split('=')[1];
  const { data } = store.getState().currentUser;
  return { currentUserData: data, token };
};

export default connect((state) => state)(CreateClinic);
