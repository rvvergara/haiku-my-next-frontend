import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

export const PractitionerProfile = ({ currentUserData }) => {
  const {
    firstName,
    lastName,
  } = currentUserData;

  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="profile">
      <ProfileInfoGroup infoKey="Name" val={fullName} />
      <ProfileInfoGroup infoKey="Clinic" val="Health Clinic" />
      <ProfileInfoGroup infoKey="Education" val="University, Veterinary Medicine, Clinical Psychology" />
      <ProfileInfoGroup infoKey="Specialization" val="Neurology, Orthopaedics" />
      <ProfileInfoGroup infoKey="Years of Experience" val="23" />
      <ProfileInfoGroup infoKey="Description" val="I am a cool doctor." />
    </div>
);
};

PractitionerProfile.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps)(PractitionerProfile);
