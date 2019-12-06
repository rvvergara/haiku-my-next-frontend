import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

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
      <ProfileInfoGroup infoKey="Name" val={fullName} />
      <ProfileInfoGroup infoKey="Clinic" val="Health Clinic" />
      <ProfileInfoGroup infoKey="Education" val={education.join(',')} />
      <ProfileInfoGroup infoKey="Specialization" val={specialties.join(',')} />
      <ProfileInfoGroup infoKey="Years of Experience" val={yearsExp.toString()} />
      <ProfileInfoGroup infoKey="Biograpy" val={biography} />
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
