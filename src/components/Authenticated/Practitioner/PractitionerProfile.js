import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';
import PractitionerCard from './PractitionerCard';
import PractitionerDetailsCard from './PractitionerDetailsCard';
import Booking from '../Booking/Booking'


export const PractitionerProfile = ({ currentUserData }) => {
  const {
    firstName,
    lastName,
    profile,
  } = currentUserData;

  let education = ['No education info yet'];
  let specialties = ['No specialties info yet'];
  let yearsExp = 0;
  let biography = 'No biography information yet';

  if (profile) {
    education = profile.education;
    specialties = profile.specialities;
    yearsExp = profile.yearsExp;
    biography = profile.biography;
  }

  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="profile">
      {/* <ProfileInfoGroup infoKey="Name" val="Dr. Johny Walker" />
      <ProfileInfoGroup infoKey="Clinic" val="Health Clinic" />
      <ProfileInfoGroup infoKey="Education" val="Elementary, High School" />
      <ProfileInfoGroup infoKey="Specialization" val="Neurology, Cardiology" />
      <ProfileInfoGroup infoKey="Years of Experience" val="2" />
  <ProfileInfoGroup infoKey="Biograpy" val="Hello, my patients!" /> */}
  <div>
  <PractitionerCard />
      <PractitionerDetailsCard />
  </div>

      <Booking />
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
