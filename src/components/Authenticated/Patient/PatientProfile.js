import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

export const PatientProfile = ({ currentUserData }) => {
  const { firstName, lastName, profile } = currentUserData;

  let passport = 'No passport info yet';
  let contactNo = 'No contact number yet';
  let address = 'No address';

  if (profile) {
    passport = profile.passport;
    contactNo = profile.contactNo;
    address = profile.address;
  }

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="profile">
      <ProfileInfoGroup infoKey="Name" val={fullName} />
      <ProfileInfoGroup infoKey="ID/Passport" val={passport} />
      <ProfileInfoGroup infoKey="Contact Number" val={contactNo} />
      <ProfileInfoGroup infoKey="Address" val={address} />
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
