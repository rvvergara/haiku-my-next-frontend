import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

export const PatientProfile = ({ currentUserData }) => {
  const {
    firstName,
    lastName,
  } = currentUserData;

  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="profile">
      <ProfileInfoGroup infoKey="Name" val={fullName} />
      <ProfileInfoGroup infoKey="ID/Passport" val="123456" />
      <ProfileInfoGroup infoKey="Contact Number" val="855-0772" />
      <ProfileInfoGroup infoKey="Address" val="25th High Street" />
      <ProfileInfoGroup infoKey="Remarks" val="I wanna be very healthy." />
    </div>
);
};

PatientProfile.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToPops = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToPops)(PatientProfile);
